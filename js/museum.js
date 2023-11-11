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
})
nav_tl.to('.menu_wrap',{ 
    borderRadius:0,
    duration:1,
},'a-=.5')
nav_tl.fromTo('.menu_list',
    { opacity: 0, y:'100%'}, 
    { opacity: 1, stagger:.5, y:0}
,'a')
document.querySelector('.nav_btn').addEventListener('click',()=>{
    nav_tl.timeScale(1);
    nav_tl.restart();
})
document.querySelector('.nav_close_btn').addEventListener('click',()=>{

    nav_tl.timeScale(2.5);
    nav_tl.reverse();
})