// src/components/Loader.tsx

import React from "react";
import styles from "./loader.module.css"; // Import the CSS Module

interface UiverseLoaderProps {
  text?: string;
}

/**
 * A dynamic loader component featuring a wave clip-path animation.
 * Uses Tailwind for standard styles and a CSS Module for custom animations.
 */
const UniverseLoader: React.FC<UiverseLoaderProps> = ({ text = "LOADING" }) => {
  return (
    <div className="flex items-center justify-center min-h-24">
      {/* Container matching the original .loader definition */}
      <div className={`${styles.loader} relative`}>
        {/* Base Text (Hollow Stroke) */}
        <span
          className={`absolute 
            text-4xl 
            font-bold 
            tracking-wider 
            whitespace-nowrap 
            -translate-x-1/2 -translate-y-1/2
            ${styles.strokeText}`}
          style={{
            left: "50%",
            top: "50%",
            // Important: Use webkit styles from the CSS module
            WebkitTextStroke: "0.3px rgb(0, 57, 244)",
            color: "transparent",
          }}
        >
          {text}
        </span>

        {/* Animated Text (Filled Wave) */}
        <span
          className={`absolute 
            text-4xl 
            font-bold 
            tracking-wider 
            whitespace-nowrap 
            text-blue-600 
            -translate-x-1/2 -translate-y-1/2 
            ${styles.clipPathAnimation}`}
          style={{
            left: "50%",
            top: "50%",
            // Important: Use webkit styles from the CSS module
            WebkitTextStroke: "1px rgb(17, 0, 255)",
            color: "rgb(0, 4, 255)",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default UniverseLoader;
