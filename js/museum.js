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