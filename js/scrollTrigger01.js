


// Horizontal scroll
let tlMain = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section-height",
      start: "top top",
      end: "98% bottom",
      scrub: 1,
      delay:3
    }
  })
  .to(".track", {
    xPercent: -100,
    ease: "none"
  })
  
  
  tlMain.to('.hero',{
    y:'-30vh',
    duration:3,
    ease: "power1.out",
    scrollTrigger:{
        trigger:'.is-hero',
        scrub:2,
        //containerAnimation: tlMain,
        start:'top top',
        end:'bottom 50%',
        //markers:true
    }
})
  


/*
tlMain.to('.is-hero',{
    yPercent: -70,
    // duration: 1.8,
    ease: "power1.in"
})
gsap.timeline({
    scrollTrigger:{
        trigger:'.hero',
        containerAnimation: tlMain,
        start:"left left",
        end:"right left",
        scrub:true,
        markers: true
    }
}).to('.is-hero',{
    yPercent: -70,
    //duration:1.8
})*/


gsap.timeline({
    scrollTrigger:{
        trigger:'.hero-panel',
        containerAnimation: tlMain,
        start:"left left",
        end:"right left",
        scrub:true,
    }
}).to('.hero-panel_img',{
   // scale:1,
    width:'75%',
    //duration:5
})

gsap.timeline({
    scrollTrigger:{
        trigger:'.note-panel',
        containerAnimation: tlMain,
        start:'left right',
        end:'left left',
        scrub:true,
        
    }
}).from('.note-panel_contain',{
    rotate: 45
},'<')
.to('.note-panel_contain',{
    xPercent: -150,
},'<')

gsap.timeline({
    scrollTrigger:{
        trigger:'.thanks-panel_wrap',
        containerAnimation: tlMain,
        start:'left left',
        end:'right right',
        scrub:true,
        
    }
}).to(".thanks-panel",{
    xPercent:100, ease:'none'
}).fromTo(
    ".thanks-panel_contain.is-2",
    {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
    },
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" },0)
    .to('.thanks-panel_photo',{
        scale:1
    },0)


    
gsap.timeline({
    scrollTrigger:{
        scrub:true,
        containerAnimation: tlMain,
        trigger:'.stagger-panel',
        start:'left right',
        end:'right left'
    }
}).from('.stagger-panel_img',{
   x:"100vw", stagger: { each: 0.05 } 
}).to('.stagger-panel_img',{
    scale: 0.5, stagger: { each: 0.05 }
})  


gsap.timeline({
    scrollTrigger:{
        scrub:true,
        containerAnimation: tlMain,
        trigger:'.wide-panel',
        start:'left 50%',
        end:'right 40%',
        //markers: true
    }
}).to('.wide-panel_img',{
    scale:.7
}).to('.wide-panel_img',{
    yPercent:-30
})


