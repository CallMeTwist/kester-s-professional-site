import { useState, useEffect } from "react";

/**
 * useActiveSection
 * Tracks which section ID is currently in the viewport
 * so nav links can be highlighted.
 *
 * Usage:
 *   const active = useActiveSection(["about", "experience", "certifications", "skills", "contact"]);
 */
export const useActiveSection = (sectionIds: string[], offset = 100): string => {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return active;
};

export default useActiveSection;
