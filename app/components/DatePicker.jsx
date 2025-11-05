'use client';

import { useState, useRef, useEffect } from 'react';

export default function DatePicker({ value, onChange, required = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
    const pickerRef = useRef(null);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({ day: prevMonthLastDay - i, isCurrentMonth: false });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, isCurrentMonth: true });
        }

        // Next month days
        const remainingDays = 42 - days.length; // 6 rows * 7 days
        for (let i = 1; i <= remainingDays; i++) {
            days.push({ day: i, isCurrentMonth: false });
        }

        return days;
    };

    const handleDateClick = (day) => {
        if (!day.isCurrentMonth) return;

        // Create date at noon to avoid timezone issues
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day, 12, 0, 0);
        setSelectedDate(newDate);

        // Format date as YYYY-MM-DD using local date components
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(newDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${dayStr}`;
        
        onChange({ target: { value: formattedDate } });

        // Auto-hide after selection
        setTimeout(() => setIsOpen(false), 200);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const formatDisplayDate = (date) => {
        if (!date) return '';
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const isToday = (day) => {
        if (!day.isCurrentMonth) return false;
        const today = new Date();
        return day.day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear();
    };

    const isSelected = (day) => {
        if (!day.isCurrentMonth || !selectedDate) return false;
        return day.day === selectedDate.getDate() &&
            currentMonth.getMonth() === selectedDate.getMonth() &&
            currentMonth.getFullYear() === selectedDate.getFullYear();
    };

    const days = getDaysInMonth(currentMonth);

    return (
        <div className="relative" ref={pickerRef}>
            <div className="relative">
                <input
                    type="text"
                    required={required}
                    value={formatDisplayDate(selectedDate)}
                    onClick={() => setIsOpen(!isOpen)}
                    readOnly
                    className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition-all cursor-pointer bg-white"
                    placeholder="dd/mm/yyyy"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-teal-700 to-teal-600">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="text-white font-semibold text-lg">
                            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </div>
                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-4 bg-white">
                        {/* Days of week */}
                        <div className="grid grid-cols-7 gap-2 mb-2">
                            {daysOfWeek.map((day) => (
                                <div key={day} className="text-center text-gray-600 text-sm font-semibold py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days */}
                        <div className="grid grid-cols-7 gap-2">
                            {days.map((day, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleDateClick(day)}
                                    disabled={!day.isCurrentMonth}
                                    className={`
                    h-10 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105
                    ${!day.isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : 'text-gray-800 hover:bg-teal-50 hover:text-teal-700'}
                    ${isSelected(day) ? 'bg-teal-700 text-white hover:bg-teal-800 shadow-md' : ''}
                    ${isToday(day) && !isSelected(day) ? 'bg-amber-100 text-amber-800 font-bold' : ''}
                  `}
                                >
                                    {day.day}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
