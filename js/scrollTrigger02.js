//Logo Text 
gsap.from('.nav_logo',{
  y:'-90%',
  fontSize:'3.8em',
  duration:1,
  scrollTrigger:{
    trigger:'.section.is--hero',
    scrub:1,
    start:'top top',
    end:'bottom top',
    //markers:true,
  }
})

// Header Text Hide
gsap.utils.toArray('.header_text-move').forEach(el => {
  /*
  타임라인으로 적용.
  let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "-100% top",
        end: "30% top",
        scrub: 0.8,
       // markers:true
      }

      tl.to(el, {
      y: "100%",
      duration: 1
    });
    })*/

    gsap.to(el,{
      y: "100%",
      duration:1,
      scrollTrigger:{
        trigger:el,
        start:'-100% top',
        end:'30% top',
        scrub:1,
        //markers:true,
      }
    })
}) 
/**/
const tl = gsap.timeline({
  scrollTrigger:{
    trigger:'.sticky-circle_wrap',
    start:'top top',
    end:'bottom bottom',
    scrub:1,
    markers:true
  }
})

tl.fromTo('.sticky-circle_element',{
  
    width:'35em',
    height:'35em',
    borderRadius:'35em',
    duration:1
  },{
    width:'100vw',
    height:'100vh',
    borderRadius:0,
    duration:1
  }
)
tl.fromTo('body, .section.is--nav',{
  backgroundColor:'#2e2a27',
  color:'#e8e2da',
  duration:1
},{
  backgroundColor:'#e8e2da',
  color:'#2e2a27',
  duration:1
})
