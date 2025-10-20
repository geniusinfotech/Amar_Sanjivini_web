"use client";

/**
 * Defines the supported language codes for the translation API.
 * Extend this union type as you add more supported languages (e.g., 'hi' for Hindi).
 */
export type SupportedLang = "en" | "gu";

// Define the expected structure of the successful JSON response from /api/translate
interface TranslationResponse {
  // Assuming the API returns a string if a single translation is requested
  // or an array of strings if 'q' contained an array of strings.
  translations: string | string[];
}

/**
 * Custom hook for interacting with the backend translation API.
 */
export function useTranslate() {
  /**
   * Translates a given text string to the target language.
   * * @param text The string to translate.
   * @param target The target language code (e.g., 'gu' for Gujarati).
   * @returns The translated string.
   */
  async function translateText(
    text: string,
    target: SupportedLang
  ): Promise<string> {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, target }),
    });

    if (!res.ok) {
      // It's helpful to log or expose the status/error message from the server
      const errorText = await res.text();
      console.error(
        `Translation API failed with status ${res.status}: ${errorText}`
      );
      throw new Error(`Translate failed with status: ${res.status}`);
    }

    // Cast the response data to the expected type
    const data: TranslationResponse = await res.json();

    // Handle both array and single string return values from the API
    if (Array.isArray(data.translations)) {
      // Assuming you only pass a single string 'q' in the body,
      // the first element of the array should be the translation.
      return data.translations[0] || text;
    }

    // If the API returns a single string, return it
    return data.translations || text;
  }

  return { translateText };
}
