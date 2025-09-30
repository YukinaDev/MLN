import { useEffect, useRef } from "react";
        import anime from "animejs/lib/anime.es.js";

// Trigger anime.js animation when the element enters viewport
export default function useAnimeOnInView({
    targetsSelector,
    animation = {},
    rootMargin = "-10% 0px -10% 0px",
    threshold = 0.1,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const play = () => {
            anime({
                targets: targetsSelector ? el.querySelectorAll(targetsSelector) : el,
                ...animation,
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        play();
                        observer.disconnect();
                    }
                });
            },
            { rootMargin, threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [animation, rootMargin, targetsSelector, threshold]);

    return containerRef;
}


