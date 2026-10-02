"use client";

import { useEffect, useRef, useState } from "react";

export function InvitationEffects() {
  const host = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".invitation");
    const canvasHost = host.current;
    if (!root || !canvasHost || enabled === null) return;
    root.dataset.motion = enabled ? "animated" : "still";
    if (!enabled) return;

    let cancelled = false;
    let disposeAnimations: (() => void) | undefined;
    let disposeScene: (() => void) | undefined;

    async function start() {
      // Keep Three.js and animation libraries out of the initial server render.
      const [{ gsap }, { ScrollTrigger }, { createCelebrationScene }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"), import("./celebration-scene"),
      ]);
      if (cancelled || !root || !canvasHost) return;
      gsap.registerPlugin(ScrollTrigger);
      const listeners: (() => void)[] = [];
      const floating: ReturnType<typeof gsap.to>[] = [];
      const pausedWhileHidden = new Set<ReturnType<typeof gsap.to>>();
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro.from(".cover-graphic", { opacity: 0, y: 24, duration: 1.3 })
          .from(".cover-script", { clipPath: "inset(0 100% 0 0)", duration: 1.35, ease: "power2.inOut" }, 0.25)
          .from(".cover-name", { opacity: 0, y: 15, duration: 1 }, 0.85);

        gsap.utils.toArray<HTMLElement>(".section-title, .hello-title, .age-block, .date-day, .goodbye-title").forEach(element => {
          gsap.from(element, { opacity: 0, y: 32, scale: element.classList.contains("age-block") ? 0.88 : 0.97, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 91%", once: true } });
        });
        gsap.utils.toArray<HTMLElement>(".body-copy, .personal-note, .signature, .venue-name, .rsvp-pending, .qr-frame, .album-note, .packing-note, .gift-list").forEach(element => {
          gsap.from(element, { opacity: 0, y: 18, duration: 0.85, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 94%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>(".collage").forEach(collage => {
          const section = collage.closest("section")!;
          const photos = collage.querySelectorAll<HTMLElement>(".photo");
          photos.forEach((photo, index) => {
            gsap.from(photo, { opacity: 0, y: 42, rotation: "-=5", scale: 0.93, duration: 1.2, delay: index * 0.1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 87%", once: true } });
          });
          gsap.fromTo(collage, { y: 12 }, { y: -12, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.8 } });
        });
        gsap.utils.toArray<HTMLElement>(".photo-stack .photo, .final-polaroid .photo, .editorial-photo .photo").forEach(photo => {
          gsap.from(photo, { opacity: 0, y: 26, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: photo, start: "top 93%", once: true } });
          const image = photo.querySelector("img");
          if (image) gsap.fromTo(image, { yPercent: -3, scale: 1.1 }, { yPercent: 3, scale: 1.1, ease: "none", scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: 0.7 } });
          const imageFrame = photo.querySelector(".photo-image");
          if (imageFrame) gsap.fromTo(imageFrame, { "--glint": "-160%" }, { "--glint": "240%", duration: 1.9, ease: "power1.inOut", scrollTrigger: { trigger: photo, start: "top 75%", once: true } });
        });

        gsap.utils.toArray<SVGElement>(".bow-art, .glass-art, .toast-art").forEach((element, index) => {
          const region = element.closest("section, header")!;
          const tween = gsap.to(element, { y: "+=6", rotation: "+=2", transformOrigin: "50% 55%", duration: 2.9 + (index % 3) * 0.5, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true });
          floating.push(tween);
          ScrollTrigger.create({ trigger: region, start: "top bottom", end: "bottom top", onToggle: self => { tween.paused(!self.isActive || document.hidden); } });
          tween.paused(!ScrollTrigger.isInViewport(region) || document.hidden);
        });
        gsap.utils.toArray<HTMLElement>(".sparkles").forEach(stars => {
          const tween = gsap.to(stars.querySelectorAll("i"), { y: 5, scale: 1.2, duration: 2.4, repeat: -1, yoyo: true, stagger: 0.17, ease: "sine.inOut", paused: true });
          floating.push(tween);
          ScrollTrigger.create({ trigger: stars.closest("section, header")!, start: "top bottom", end: "bottom top", onToggle: self => { tween.paused(!self.isActive || document.hidden); } });
          tween.paused(!ScrollTrigger.isInViewport(stars) || document.hidden);
        });
      }, root);

      // Hover is limited to mouse/trackpad. Preserve each print's designed angle.
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        root.querySelectorAll<HTMLElement>(".photo").forEach(photo => {
          // Original CSS rotation can differ from the current entrance animation.
          const rotation = photo.closest(".collage-memories") ? -17 : photo.closest(".final-polaroid") ? 9 : 0;
          const enter = () => context.add(() => { gsap.to(photo, { rotation: rotation + 1.5, scale: 1.018, duration: 0.55, overwrite: "auto", ease: "power2.out" }); });
          const leave = () => context.add(() => { gsap.to(photo, { rotation, scale: 1, duration: 0.65, overwrite: "auto", ease: "power2.out" }); });
          photo.addEventListener("pointerenter", enter);
          photo.addEventListener("pointerleave", leave);
          listeners.push(() => { photo.removeEventListener("pointerenter", enter); photo.removeEventListener("pointerleave", leave); });
        });
      }

      const refresh = () => { if (!cancelled) ScrollTrigger.refresh(); };
      const onVisibility = () => {
        if (document.hidden) floating.forEach(tween => { if (!tween.paused()) { pausedWhileHidden.add(tween); tween.pause(); } });
        else { pausedWhileHidden.forEach(tween => tween.resume()); pausedWhileHidden.clear(); }
      };
      document.addEventListener("visibilitychange", onVisibility);
      root.querySelectorAll("img").forEach(image => { image.addEventListener("load", refresh); listeners.push(() => image.removeEventListener("load", refresh)); });
      void document.fonts.ready.then(refresh);
      disposeAnimations = () => {
        document.removeEventListener("visibilitychange", onVisibility);
        listeners.forEach(remove => remove());
        context.revert();
        delete root.dataset.gsap;
      };
      root.dataset.gsap = "ready";
      refresh();
      disposeScene = createCelebrationScene(canvasHost);
    }

    void start().catch(() => {
      if (cancelled) return;
      disposeAnimations?.();
      disposeScene?.();
      // Any graphics failure must leave the complete invitation readable.
      root.dataset.motion = "still";
      setEnabled(false);
    });
    return () => { cancelled = true; disposeAnimations?.(); disposeScene?.(); };
  }, [enabled]);

  return <>
    <div className="celebration-canvas" ref={host} aria-hidden="true" />
    {enabled !== null ? <button type="button" className="motion-toggle" aria-label={enabled ? "Pausar animaciones" : "Activar animaciones"} aria-pressed={enabled} title={enabled ? "Pausar animaciones" : "Activar animaciones"} onClick={() => setEnabled(value => !value)}>
      <svg aria-hidden="true" viewBox="0 0 24 24">{enabled ? <path d="M8 6H10V18H8ZM14 6H16V18H14Z"/> : <path d="M9 6L18 12L9 18Z"/>}</svg>
    </button> : null}
  </>;
}

