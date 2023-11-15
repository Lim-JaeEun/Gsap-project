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


/*loreal_leader_img*/

const intro_tl = gsap.timeline({
    scrollTrigger: {
        trigger:'.sc_intro',
        start:'top top',
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
    newText += `<span aria-hidden='true'>${el+'.'}</span>`; el+'.';
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

let serviceslide = document.querySelectorAll('.pos_absolute');
gsap.to('.sc_story',{
    scrollTrigger: {
        trigger:'.sc_story',
        start:'top top',
        end:'500%',
        pin:true,
        //pinSpacing:true,
        scrub:2,
        markers:true,
    },
})

