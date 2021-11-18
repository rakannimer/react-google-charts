import { useEffect } from "react";

/**
 * Hook to load external script.
 * @param src - Source url to load.
 * @param onLoad - Success callback.
 * @param onError - Error callback.
 */
export function useLoadScript(
  src: string,
  onLoad?: () => void,
  onError?: () => void
) {
  useEffect(() => {
    if (!document) {
      return;
    }

    // Find script tag with same src in DOM.
    const foundScript = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`
    );

    // Call onLoad if script marked as loaded.
    if (foundScript?.dataset.loaded) {
      onLoad?.();
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
      onLoad?.();
    };

    script.addEventListener("load", onLoadWithMarker);

    if (onError) {
      script.addEventListener("error", onError);
    }

    // Add to DOM if not yet added.
    if (!foundScript) {
      document.head.append(script);
    }

    return () => {
      script.removeEventListener("load", onLoadWithMarker);

      if (onError) {
        script.removeEventListener("error", onError);
      }
    };
  }, []);
}
