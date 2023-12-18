import map from "./map.js";


const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
    lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)

//메인
const main_texts = document.querySelectorAll('.ani_text_svg');
gsap.from(main_texts,{
    y:function(i,target){
        return target.dataset.transformy+'%'
    },
    duration:1.5,
    ease: "power2.out",
    stagger:.5
})

/*nav_btn*/
const nav_tl = gsap.timeline({
    paused:true,
})
nav_tl.to('.menu_wrap',{
    height:'100vh',
    duration:.8,
    top:0,
    ease: "power2.out",
},'a')
/*nav_tl.to('.menu_wrap',{ 
    borderRadius:0,
    duration:1,
},'a-=.5')*/
nav_tl.fromTo('.menu_list',
    { opacity: 0, y:'100%'}, 
    { opacity: 1, stagger:.5, y:0}
,'a+=.7')
document.querySelector('.nav_btn').addEventListener('click',()=>{
    nav_tl.timeScale(1);
    nav_tl.restart();
})
document.querySelector('.nav_close_btn').addEventListener('click',()=>{

    nav_tl.timeScale(2);
    nav_tl.reverse();
})


/*intro*/
const intro_text = document.querySelector('.intro_text');
const toText = intro_text.innerText;
let newText = '';
toText.split('.').forEach(el=>{
    newText += `<div class="span_text" aria-hidden='true'><span>${el+'.'}</span></div>`;
    intro_text.innerHTML = `<div class="span_wrap">${newText}</div>`;
})
const tablet_event1 = gsap.matchMedia();
tablet_event1.add("(min-width:1023px)",()=>{
    const intro_tl_pc = gsap.timeline({
        scrollTrigger: {
            trigger:'.sc_intro',
            start:'10% top',
            //end:'bottom top',
            end:'+=2000',
            //pin:true,
            //pinSpacing:true,
            scrub:1,
            //markers:true
            //toggleActions: "restart pause reverse pause"// 진입, 떠났을때, 다시돌아와서엔터에 들어왔을때, 떠났을때
        }
    })
    
    intro_tl_pc.to('.intro_text',{
        x:'0%',
        duration:3,
        ease:'power1.in'
    },'a')
    intro_tl_pc.to('.height_img_wrap',{
        x:'0%',
        duration:3,
        ease:"power1.in",
    },'a')
    intro_tl_pc.to('.intro_wrap .tit',{
        scale:.5,
        duration:3,
        ease:"power1.out",
    },'a')
    intro_tl_pc.to('.loreal_leader_img',{
        y:'0%',
        duration:3,
        ease: "power1.in",
      
    },'b')

    intro_tl_pc.to('.span_wrap span',{
        opacity:1,
        y:'0%',
        stagger:1,
        ease: "slow(0.7,0.7,false)",
        //width:'100%',
        //transformOrigin: "0% 50% -50",
        duration:1.5,
        onComplete:()=>{
            document.querySelector('.blackout').style.position = 'absolute';
    
        }
    },'b+=.5')
    intro_tl_pc.to('.sc_intro',{
        y:'-100%',
        duration:3,
        delay:.3
    },'c')
    intro_tl_pc.to('.blackout',{
        opacity:0,
        duration:3,
      
    },'c')
})
tablet_event1.add("(min-width:768px) and (max-width:1023px)",()=>{
    gsap.to('.span_text span',{
        y:'0%',
        stagger:.5,
        duration:1,
        scrollTrigger:{
            trigger:'.intro_wrap',
            toggleActions: "play none play none",
            //scrub:1
        }
    })
})
/*
intro_tl.to('.sc_intro',{
    y:'-100%'
},'b')
intro_tl.to('.blackout',{
    opacity:'0'
},'b')
*/
/*
1207

*/

/*
1207*/


const hori_slide = document.querySelectorAll('.pos_absolute');
//const progress = document.querySelectorAll('.progress')
const tablet_event2 = gsap.matchMedia();
tablet_event2.add("(min-width:1023px)",()=>{ 
    console.log('pc')
    const hori_slide_tl = gsap.timeline({
        scrollTrigger:{
            trigger:'.sc_story',
            start:'top top',
            end:'+=500%',
            pin:true,
            scrub:2,
            //markers:true,
        },
    })
    hori_slide_tl.to({},{duration:0.15, delay:1.5})
    hori_slide.forEach((el,i)=>{
        hori_slide_tl.from(el,{
            xPercent:100,
            duration:1,
            stagger:1.15,
            ease:'power1.in'
            /*onUpdate: function() {
                progress[i].style.height = `${Math.round(this.progress()*100)}%`;
                //document.querySelector('.test').style.width = `${Math.round(this.progress()*100)}%`;
              }*/
        })
    
    })
    
})
tablet_event2.add("(min-width:768px) and (max-width:1023px)",()=>{
    console.log('mobile')
    const hori_slide_tl_tablet = gsap.timeline({
        scrollTrigger:{
            trigger:'.sc_story',
            start:'top top',
            end:'+=500%',
            pin:true,
            scrub:2,
            //markers:true,
        },
    })
    hori_slide_tl_tablet.to({},{duration:0.15})
    hori_slide.forEach((el,i)=>{
        hori_slide_tl_tablet.from(el,{
            autoAlpha:0,
            duration:1,
            stagger:1.15,
            ease:'power1.in'
        })
        
        hori_slide_tl_tablet.from(el.children[0],{
            yPercent:20,
            autoAlpha:0,
            duration:1,
            stagger:1.15
        })
                
        hori_slide_tl_tablet.from(el.children[1],{
            yPercent:20,
            autoAlpha:0,
            duration:0.5,
            stagger:1.15
        })
    
    })
 })
/*
hori_slide_tl.from(serviceslide,{
    xPercent:100,
    duration:.5,
    stagger:1.15,
    

})*/

/* 글로벌 포트폴리오 배너 */
/*
const banner_tl = gsap.timeline({
    scrollTrigger:{
        trigger:'.sc_banner',
        scrub:2,
        start:'top bottom',
        end:'bottom top',
      }
})
banner_tl.to('.listItem:nth-child(2n+1)',{
    y:'-30%',
    duration:1,
},0)
banner_tl.to('.listItem:nth-child(2n)',{
    y:'-50%',
    duration:1,
},1)
*/
const image_move01 = document.querySelectorAll('.listItem:nth-child(2n+1)');
const image_move02 = document.querySelectorAll('.listItem:nth-child(2n)');
const tablet_event3 = gsap.matchMedia();
tablet_event3.add("(min-width:1023px)",()=>{ 
    image_move01.forEach(el=>{
        gsap.to(el,{
          y:'-30%',
          duration:1,
          scrollTrigger:{
            trigger:el,
            scrub:2,
            start:'top bottom',
            end:'bottom top',
          }
        })
      })
      
      image_move02.forEach(el=>{
        gsap.to(el,{
          y:'-50%', 
          duration:1,
          scrollTrigger:{
            trigger:el,
            scrub:2,
            start:'top bottom',
            end:'bottom top',
          }
        })
      })
})




const video_tl = gsap.timeline({
    scrollTrigger:{
      trigger:'.sc_video',
      start:'-15% top',
      end:'bottom bottom',
      scrub:1,
    }
  })
  
  video_tl.to('.sticky-rect_element',{
      width:'100vw',
      height:'100vh',
      borderRadius:'0px',
    }
  )
document.querySelector('.sc_chart').addEventListener('load',()=>{
    map
})
/*지도 안에서 스크롤 할때 lenis scroll 컨트롤*/
document.querySelector('#d3_chart').addEventListener('mousewheel',(e)=>{
    window.addEventListener('mousewheel', lenis.stop());
})
document.querySelector('#d3_chart').addEventListener('mouseout',(e)=>{
    window.addEventListener('mousewheel', lenis.start());
})

document.querySelector('footer').addEventListener('mouseover',(e)=>{
    const footer_tl = gsap.timeline({
        scrollTrigger:{
            trigger:'footer',
            start:'top top',
            end:'bottom top'
        }
    })

    footer_tl.to('.verticla_line',{
        height:'100%',
        duration:1.5
    },'t').to('.horizontal_line',{
        width:`100%`,
        duration:2
    },'t').to('.footer_bottom',{
        backgroundColor:'#fff',
        duration:2,
        ease: "power1.in",
    },'t')
})


const svg_wave = gsap.timeline()

svg_wave.to('#wave',{
    yoyo: true,
    ease: "EaseInOut",
    repeat:-1,
    attr: { d: 'M 0 0 C -1 1 -2 3 -1 4 C 0 5 0 8 3 7 C 5 6 5 9 7 7 C 10 6 11 3 8 1 C 6 0 5 0 4 0 C 3 0 1 -1 0 0'},
    duration:3
})