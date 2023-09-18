// Horizontal scroll
let tlMain = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section-height",
      start: "top top",
      end: "98% bottom",
      scrub: 1
    }
  })
  .to('.is-hero',{
    yPercent:-50,
    ease:"power.in"
  },0)
  .to(".track", {
    xPercent: -100,
    ease: "none",
   // delay:.5
  },0.1);

// hero photo
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hero-panel",
      containerAnimation: tlMain,
      start: "left left",
      end: "right left",
      scrub: true
    }
  })
  .from(".hero-panel_img", {duration:2, scale: 1.6 },1);

// note
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".note-panel",
      containerAnimation: tlMain,
      start: "left right",
      end: "left left",
      scrub: true
    }
  })
  .from(".note-panel_contain", { rotate: 45, scale: 0.3},1)
  .to(".note-panel_contain",{ xPercent:-150 },1)

// thanks
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".thanks-panel_wrap",
      containerAnimation: tlMain,
      start: "left left",
      end: "right right",
      scrub: true,
      markers:true
    }
  })
  .to(".thanks-panel", { xPercent: 100, ease: "none", duration:2 })
  .to(".thanks-panel_photo", { scale: 1,duration:2 }, 0)
  .fromTo(
    ".thanks-panel_contain.is-2",
    {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
    },
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none",duration:2 },
    0
  );

// stagger photos
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".stagger-panel",
      containerAnimation: tlMain,
      start: "left right",
      end: "right left",
      scrub: true
    }
  })
  .from(".stagger-panel_img", { x: "100vw", stagger: { each: 0.05 } })
  .to(".stagger-panel_img", { scale: 0.5, stagger: { each: 0.05 } });
