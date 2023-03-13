import { useState, useEffect } from "react";

export function useHasLightClass(): boolean {
  const [hasLightClass, setHasLightClass] = useState(
    document.body.classList.contains("lightClass")
  );

  useEffect(() => {
    const handleBodyClassChange = () => {
      setHasLightClass(document.body.classList.contains("lightClass"));
    };

    document.body.addEventListener("DOMSubtreeModified", handleBodyClassChange);

    return () => {
      document.body.removeEventListener("DOMSubtreeModified", handleBodyClassChange);
    };
  }, []);

  return hasLightClass;
}
