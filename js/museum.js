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
const intro_tl = gsap.timeline({
    scrollTrigger: {
        trigger:'.sc_intro',
        start:'top 60%',
        end:'bottom top',
        //pin:true,
        //pinSpacing:true,
        scrub:2,
        //markers:true,
        //toggleActions: "restart pause reverse pause"// 진입, 떠났을때, 다시돌아와서엔터에 들어왔을때, 떠났을때
    },
})
/*
intro_tl.to('.sc_intro',{
    y:'-100%'
},'b')
intro_tl.to('.blackout',{
    opacity:'0'
},'b')
*/

intro_tl.to('.loreal_leader_img',{
    y:'0%',
    duration:3,
    ease: "power1.in",
},'b')

const intro_text = document.querySelector('.intro_text');
const toText = intro_text.innerText;
let newText = '';
toText.split('.').forEach(el=>{
    newText += `<span aria-hidden='true'>${el+'.'}</span>`;
    intro_text.innerHTML = newText;
})

intro_tl.to('.intro_text span',{
    opacity:1,
    y:'25px',
    stagger:1,
    ease: "power1.out",
    //duration:1.5
    onComplete:()=>{
        document.querySelector('.blackout').style.position = 'absolute';

    }
},'b+=.5')
intro_tl.to('.sc_intro',{
    y:'-100%',
    duration:5,
    delay:1
},'c')
intro_tl.to('.blackout',{
    opacity:0,
    duration:5,
    delay:1
},'c')

const hori_slide = document.querySelectorAll('.pos_absolute');
//const progress = document.querySelectorAll('.progress')

const hori_slide_tl = gsap.timeline({
    scrollTrigger:{
        trigger:'.sc_story',
        start:'top top',
        end:'+=500%',
        pin:true,
        scrub:1,
    },


})

hori_slide_tl.to({},{duration:0.15, delay:.5})
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
const image_move02 = document.querySelectorAll('.listItem:nth-child(2n)');
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



const tl01 = gsap.timeline({
    scrollTrigger:{
      trigger:'.sc_video',
      start:'-15% top',
      end:'bottom bottom',
      scrub:1,
      markers:true
    }
  })
  
  tl01.to('.sticky-rect_element',{
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



