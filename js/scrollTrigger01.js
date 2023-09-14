let tlMain = gsap.timeline({
    scrollTrigger:{
        trigger:'.section-height',
        start:'top top',
        end:'98% bottom',
        scrub:3,
        
    }
}).to(".track",{
    xPercent:-100,
    ease:'none'
})

gsap.timeline({
    scrollTrigger:{
        trigger:'.hero-panel',
        containerAnimation: tlMain,
        start:"left left",
        end:"right left",
        scrub:3,
       // markers:true
    }
}).to('.hero-panel_img',{
   // scale:1,
    width:'75%',
    duration:5
})

gsap.timeline({
    scrollTrigger:{
        trigger:'.note-panel',
        containerAnimation: tlMain,
        start:'left right',
        end:'left 50%',
        scrub:true,
        
    }
}).from('.note-panel_contain',{
    rotate: 45
},0)
.to('.note-panel_contain',{
    xPercent: -150,
    

},0)

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
}).to('.thanks-panel_photo',{
    scale:1
},0).fromTo(
    ".thanks-panel_contain.is-2",
    {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
    },
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" },
    0
  );

gsap.timeline({
    scrollTrigger:{
        markers:true,
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
