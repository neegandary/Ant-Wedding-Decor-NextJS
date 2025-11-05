'use client';

// CountUpNumber.jsx
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView, animate } from "framer-motion";

export const CountUpNumber = ({ target = 100, duration = 1.2, suffix = "" }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          setDisplayValue(Math.floor(value));
        },
      });
      return controls.stop;
    }
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
};
