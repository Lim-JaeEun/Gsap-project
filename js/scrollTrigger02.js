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
        start:'-120% top',
        end:'30% top',
        scrub:1,
        //markers:true,
      }
    })
}) 
/**/
const tl01 = gsap.timeline({
  scrollTrigger:{
    trigger:'.sticky-circle_wrap',
    start:'top top',
    end:'bottom bottom',
    scrub:1,
    //markers:true
  }
})

tl01.fromTo('.sticky-circle_element',{
  
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
tl01.fromTo('body, .section.is--nav',{
  backgroundColor:'#2e2a27',
  color:'#e8e2da',
  duration:1
},{
  backgroundColor:'#e8e2da',
  color:'#2e2a27',
  duration:1
})

//grid_title_change
const bottomTXT = document.querySelectorAll('.grid_text-item');
gsap.utils.toArray('.grid_wrapper').forEach((el,idx)=>{
  const eachText = bottomTXT[idx];
  gsap.to(eachText,{
    duration:1,
    scrollTrigger:{
      trigger:el,
      start:'top bottom',
      end:'bottom bottom',
      onEnter:()=>{
        bottomTXT.forEach(el=>el.classList.remove('is--active'))
        eachText.classList.add('is--active');

      },
      onEnterBack:()=>{
        bottomTXT.forEach(el=>el.classList.remove('is--active'))
        eachText.classList.add('is--active');
      },
    }
  })
})
const backgroundColorOdd = document.querySelectorAll(".grid_wrapper:nth-child(odd)");
backgroundColorOdd.forEach(el=>{
  const tl03 = gsap.timeline({
    scrollTrigger:{
      trigger:el,
      scrub:1,
      start:'top top',
      end:'bottom bottom',
    }
  }) 
  
  tl03.fromTo('body, .section.is--nav',{
    backgroundColor:'#e8e2da',
    color:'#2e2a27',
    duration:1
  },{
    backgroundColor:'#2e2a27',
    color:'#e8e2da',
    duration:1
  })
  
})

const backgroundColorEven = document.querySelectorAll(".grid_wrapper:nth-child(even)");
backgroundColorEven.forEach(el=>{
  const tl02 = gsap.timeline({
    scrollTrigger:{
      trigger:el,
      scrub:1,
      start:'top top',
      end:'bottom bottom',
    }
  }) 
  
  tl02.fromTo('body, .section.is--nav',{
    backgroundColor:'#2e2a27',
    color:'#e8e2da',
    duration:1
  },{
    backgroundColor:'#e8e2da',
    color:'#2e2a27',
    duration:1
  })
})

const image_move01 = document.querySelectorAll('.grid_item:nth-child(3n+1)');
image_move01.forEach(el=>{
  gsap.to(el,{
    y:'-30%',
    duration:1,
    scrollTrigger:{
      trigger:el,
      scrub:1.5,
      start:'top bottom',
      end:'bottom top',
      //markers:true
    }
  })
})


const image_move02 = document.querySelectorAll('.grid_item:nth-child(3n+2)');
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


const image_move03 = document.querySelectorAll('.grid_item:nth-child(3n+3)');
image_move03.forEach(el=>{
  gsap.to(el,{
    y:'-70%',
    duration:1,
    scrollTrigger:{
      trigger:el,
      scrub:2.5,
      start:'top bottom',
      end:'bottom top',
    }
  })
})



/*텍스트 쪼개기*/
let ori_Text = document.querySelector('.spText_warpper');
let newText = '';
const ori_text_split = ori_Text  .innerText.split('');
for(let i =0; i<ori_text_split.length; i++){
  ori_text_split[i] === ' ' ? newText+='&nbsp' : newText+=`<span>${ori_text_split[i]}</span>` 
}
ori_Text.innerHTML = newText;
ori_Text.setAttribute("aira-label",ori_Text.innerText);


const height = document.querySelector('.spreadText').clientHeight;
const interview_section = document.querySelector('.interview_section').clientHeight;
console.log(height, interview_section);

const spread_text = document.querySelectorAll('.spText_warpper span');
const tl03 = gsap.timeline({
  scrollTrigger:{
    trigger:'.spreadText',
    start:'top 20%',
    end:'bottom top',
    scrub:1,
    pin:true,
    aniticipatePin:1,
    markers:true
  }
})
spread_text.forEach((el,idx)=>{
  tl03.to(el,{
    y:idx%2 === 0? Math.random() * -500 : Math.random() * 500,
    x:idx%3 === 0? Math.random() * -500 : Math.random() * 500,
    opacity:0.1,
    duration:2
  },'text')
})
const interview_Items_hg = document.querySelector('.interview_items').clientHeight;
tl03.from('.interview_section',{
  height:0,
  //height:'calc(100vh + 80px)',
  duration:2
},'>-.5')