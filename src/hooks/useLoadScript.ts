import { useEffect, useState } from "react";

/**
 * Hook to load external script.
 * @param src - Source url to load.
 * @param onLoad - Success callback.
 * @param onError - Error callback.
 */
export function useLoadScript(src: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const onLoad = () => {
    setIsLoading(false);
    setIsSuccess(true);
  };
  useEffect(() => {
    if (!document) {
      const error = new Error(
        `[ScriptLoadingError] document not defined when attempting to load ${src}`
      );
      setError(error);
      return;
    }

    // Find script tag with same src in DOM.
    const foundScript = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`
    );

    // Call onLoad if script marked as loaded.
    if (foundScript?.dataset.loaded) {
      onLoad();
      return;
    }

    // Create or get existed tag.
    const script = foundScript || document.createElement("script");

    // Set src if no script was found.
    if (!foundScript) {
      script.src = src;
    }

    // Mark script as loaded on load event.
    const onLoadWithMarker = () => {
      script.dataset.loaded = "1";
      onLoad();
    };

    script.addEventListener("load", onLoadWithMarker);

    script.addEventListener("error", (err) => {
      console.error("Failed to load script:", src, err);
      const error = new Error(
        `[ScriptLoadingError] Failed to load script: ${src}`
      );
      setError(error);
    });

    // Add to DOM if not yet added.
    if (!foundScript) {
      document.head.append(script);
    }
  }, []);
  return {
    isLoading,
    error,
    isSuccess,
  };
}
