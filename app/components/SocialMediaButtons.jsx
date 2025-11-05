const SocialMediaButtons = () => {
    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
            {/* Zalo */}
            <div className="relative h-10 flex justify-end">
                <a
                    href="https://zalo.me/YOUR_ZALO_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-0 w-10 h-10 flex items-center justify-end bg-[#0068FF] hover:w-28 transition-all duration-300 group overflow-hidden"
                    aria-label="Contact via Zalo"
                >
                    <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1.5 whitespace-nowrap">
                        Zalo
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                        <img src="/zalo.svg" alt="Zalo" className="w-5 h-5" />
                    </div>
                </a>
            </div>

            {/* Messenger */}
            <div className="relative h-10 flex justify-end">
                <a
                    href="https://www.facebook.com/antweddingteam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-0 w-10 h-10 flex items-center justify-end bg-linear-to-br from-[#00B2FF] via-[#A033FF] to-[#FF00FF] hover:w-28 transition-all duration-300 group overflow-hidden"
                    aria-label="Contact via Messenger"
                >
                    <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1.5 whitespace-nowrap">
                        Messenger
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                        <img src="/messenger.svg" alt="Messenger" className="w-5 h-5" />
                    </div>
                </a>
            </div>

            {/* WhatsApp */}
            <div className="relative h-10 flex justify-end">
                <a
                    href="https://wa.me/YOUR_PHONE_NUMBER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-0 w-10 h-10 flex items-center justify-end bg-[#25D366] hover:w-28 transition-all duration-300 group overflow-hidden"
                    aria-label="Contact via WhatsApp"
                >
                    <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1.5 whitespace-nowrap">
                        WhatsApp
                    </span>
                    <div className="w-10 h-10 flex items-center justify-center shrink-0">
                        <img src="/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default SocialMediaButtons;
