"use client";

import React, { useEffect } from "react";

// Define global types for the Google Translate script
declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

interface GoogleTranslateProps {
  pageLanguage?: string;
  customLogoAlt?: string;
}

const GoogleTranslate: React.FC<GoogleTranslateProps> = ({
  pageLanguage = "gu",
}) => {
  useEffect(() => {
    // Check if Google Translate script already exists
    if (!window.google) {
      // Define callback for Google script
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage,
              includedLanguages: "en,hi,gu",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };

      // Create script tag for Google Translate
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      // Cleanup when component unmounts
      return () => {
        const widget = document.getElementById("google_translate_element");
        if (widget) widget.innerHTML = "";
        script.remove();
      };
    } else if (window.google?.translate?.TranslateElement) {
      // If script is already loaded, reinitialize
      new window.google.translate.TranslateElement(
        {
          pageLanguage,
          includedLanguages: "en,hi,gu",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    }
  }, [pageLanguage]);

  useEffect(() => {
    const closeGoogleBanner = () => {
      const iframe = document.querySelector<HTMLIFrameElement>(
        "iframe.goog-te-banner-frame"
      );
      if (!iframe) return;

      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      const closeBtn = iframeDoc.querySelector<HTMLElement>("button");

      if (closeBtn) {
        closeBtn.click();
      }
    };

    const timeoutId = setTimeout(closeGoogleBanner, 5000);

    const observer = new MutationObserver(() => {
      const iframe = document.querySelector("iframe.goog-te-banner-frame");
      if (iframe) {
        setTimeout(closeGoogleBanner, 5000);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="google-translate-wrapper">
        <div className="google-translate-custom-container">
          <div
            id="google_translate_element"
            className="google-translate-container"
          ></div>
        </div>
      </div>

      <style jsx global>{`
        /* Hide Google Translate banner */
        .goog-te-banner-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

        /* Main wrapper styling */
        .google-translate-wrapper {
          display: inline-block;
          position: relative;
          z-index: 99999999999;
        }

        /* Custom container with logo and dropdown */
        .google-translate-custom-container {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 99999999999;
        }

        /* Logo styling */
        .translate-icon {
          width: 20px !important;
          height: 20px !important;
          object-fit: contain;
          flex-shrink: 0;
        }

        .google-translate-container {
          position: relative;
          z-index: 99999999999;
        }

        /* Hide the Google Translate branding and powered by text */
        .goog-te-gadget {
          font-family: inherit !important;
          font-size: 0 !important;
        }

        .goog-te-gadget span {
          display: none !important;
        }

        /* Style the select dropdown */
        .goog-te-combo {
          padding: 10px 40px 10px 16px !important;
          border: 2px solid #e2e8f0 !important;
          border-radius: 8px !important;
          background-color: white !important;
          font-size: 15px !important;
          font-weight: 500 !important;
          color: #334155 !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          outline: none !important;
          min-width: 180px !important;
          font-family: inherit !important;
          position: relative !important;
          z-index: 99999999999 !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 12px center !important;
          background-size: 16px !important;
        }

        /* Hover effect */
        .goog-te-combo:hover {
          border-color: #3b82f6 !important;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1) !important;
        }

        /* Focus effect */
        .goog-te-combo:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .goog-te-combo {
            background-color: #1e293b !important;
            color: #f1f5f9 !important;
            border-color: #475569 !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23f1f5f9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") !important;
          }

          .goog-te-combo:hover {
            border-color: #60a5fa !important;
            box-shadow: 0 2px 8px rgba(96, 165, 250, 0.2) !important;
          }

          .goog-te-combo:focus {
            border-color: #60a5fa !important;
            box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2) !important;
          }
        }

        /* Remove extra padding/margin from parent divs */
        .goog-te-gadget > div {
          display: inline-block !important;
        }

        /* Style the dropdown options */
        .goog-te-combo option {
          padding: 8px !important;
          background-color: white !important;
          color: #334155 !important;
        }

        @media (prefers-color-scheme: dark) {
          .goog-te-combo option {
            background-color: #1e293b !important;
            color: #f1f5f9 !important;
          }
        }

        /* Hide the message popup */
        .goog-te-balloon-frame {
          display: none !important;
        }

        /* Ensure dropdown menu is visible */
        .goog-te-menu-frame {
          z-index: 99999999999 !important;
        }

        .goog-te-menu2 {
          z-index: 99999999999 !important;
        }

        /* Remove underline from links */
        .goog-te-gadget a {
          text-decoration: none !important;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .google-translate-custom-container {
            gap: 6px;
          }

          .translate-icon {
            width: 18px !important;
            height: 18px !important;
          }

          .goog-te-combo {
            min-width: 150px !important;
            font-size: 14px !important;
            padding: 8px 35px 8px 12px !important;
          }
        }
      `}</style>
    </>
  );
};

export default GoogleTranslate;
