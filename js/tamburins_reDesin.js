const canvas =document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let canvasParents = canvas.parentNode;
let canvasWidth, canvasHeight;

let imageSrc = './images/temburins_main_03.jpg';
let currentIdx = 0;

let isMouseDown = false;
let prevPos = {x:0, y:0};

let percent = 0;

let isEnd = false;
let circle_wrap_width = document.querySelector('canvas').clientHeight;
let mainChk = document.querySelector('body').classList.contains('main_complete');
window.onload=()=>{
    
    if(!document.querySelector('body').classList.contains('main_complete')) {
        setTimeout(()=>{
            window.scrollTo({
                top:0,
                left:0,
                behavior:'smooth'
            })
        },500)

    }
}
function resize(){
    canvasWidth = canvasParents.clientWidth;
    canvasHeight = canvasParents.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = canvasWidth+'px';
    canvas.style.height = canvasHeight+'px';
    
    //mainChk == true ? canvas.removeEventListener('mousemove',onMouseMove) : drawImage();
   /* gsap.to('.arrow',{
        opacity:0,
        duration:1,
        top:'100%',
        ease:'power2.out'
    },0)*/
    
    
    circle_infinite();
    if(isEnd) return;
    drawImage();

}

function drawImage(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight)
    const image = new Image();
    image.src = imageSrc;
    image.onload=()=>{
        let sw, sh;
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = image.width;
        const ih = image.height;
        
        const cr = ch / cw;
        const ir = ih / iw;
       
        if(ir>=cr) {
           sw = iw;
           sh = sw * (ch/cw);
            
        }else {
            sh = ih;
            sw = sh * (cw/ch);
        }

        let sx = (iw/2) - (sw/2);
        let sy = (ih/2) - (sh/2);
        ctx.drawImage(image,sx,sy,sw,sh,0,0,cw,ch);
    }
}
function getDistance(p1,p2){
    const dx = p2.x - p1.x;
    const dy = p2.y - p2.y;
    //두 점 사이의 거리 
    return Math.sqrt(dx * dx + dy * dy)
}
function getAngle(p1,p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.atan2(dy,dx);
}
function drawCircles(e){
    let nextPos = {x:e.offsetX, y:e.offsetY};
    const dist = getDistance(prevPos, nextPos);
    const angle = getAngle(prevPos, nextPos);

    for(let i=0; i<dist; i++){
        let x = prevPos.x + Math.cos(angle) * i;
        let y = prevPos.y + Math.sin(angle) * i;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x,y,canvasWidth/15,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
    prevPos = nextPos;
    remove_Percent();
}    
// Throttle
let timer;
function throttle(callbackFn, timeout) {
    if(!timer) {
        timer = setTimeout(() => {
            timer = null;
            callbackFn();
        }, timeout);
    }
} 
function remove_Percent(){
    throttle(()=>{
        const pixels = ctx.getImageData(0,0,canvasWidth,canvasHeight);
        const gap = 32;
        const totalLength = pixels.data.length / gap;

        let count = 0;
        for(let i=0; i<pixels.data.length - 3; i+=gap) {
            if(pixels.data[i+3] == 0) count ++;
        }
        percent = Math.round(count/totalLength * 100);
        if(percent > 60) {
            gsap.to(canvas,{
                opacity:0, 
                duration:.8, 
                onComplete:()=>{
                    canvas.style.opacity = 1;
                    drawImage();
                }
            })
            gsap.to('.arrow_bottom',{
                //position:'absolute',
                opacity:1,
                duration:1,
                top:'-25%',
                ease:'power2.out',
                onComplete:()=>{
                    document.querySelector('body').classList.add('main_complete');
                    
                    isEnd = true
                }
            })
        }
    },500)
    
}

const circle = document.querySelector('.arrow_bottom');
const circle_innerText = document.querySelector('.circle_text');

circle_innerText.innerHTML = circle_innerText.innerText.split("")
.map((char,i)=> `<span style="transform:rotate(${i * 2}deg)">${char}</span>`)
.join("");
function circle_infinite(){
    const circle_inner_span = document.querySelectorAll('.circle_text span');
    circle_inner_span.forEach((el)=>{
        el.style.transformOrigin = `0 ${circle.clientWidth/2}px`
    })
}
const next_section_Btn = document.querySelector(".next_section_btn > a");

const elem = document.querySelector(next_section_Btn.getAttribute("href"));
//let circle_wrap_width = '80%';

const regex = /[^0-9]/g;
//const vw_to_px = parseInt(circle_wrap_width.replace(regex,''));
//let circle_innerTxt_width = vw_to_px*(canvasParents.clientWidth/100);
const linkST = ScrollTrigger.create({
    trigger:elem,
    start:'top top'
})
ScrollTrigger.create({
    trigger:elem,
    start:'top top',
    end: 'bottom center'
})
circle.addEventListener('click',(e)=>{
    e.preventDefault();
    gsap.to(window,{
        duration:1,
        scrollTo:linkST.start,
        overwrite:"auto"
    })  
    gsap.to('.arrow_bottom',{
       // position:'sticky',
        top:'0%',
        left:'0%',
        width:circle_wrap_width,
        height:circle_wrap_width,
        zIndex:1,
        duration:.8,
        ease:'power1.out',
    })
    document.querySelectorAll('.circle_text span').forEach(el=>{
        gsap.to(el,{
            duration:.8,
            ease:'power1.out',
            transformOrigin : `0 ${circle_wrap_width/2}px`
        })
    })
    gsap.to('.next_section_btn',{
        opacity:0,
        display:'none'
    })



})


function onMouseDown(e){
    if(isMouseDown) return;
    isMouseDown = true;
    prevPos = {x:e.offsetX, y:e.offsetY}
}
function onMouseUp(){
    isMouseDown = false;

}
function onMouseMove(e){
    if(!isMouseDown || isEnd) return;
    drawCircles(e);
}


canvas.addEventListener('mousedown',onMouseDown)
canvas.addEventListener('mouseup',onMouseUp)
canvas.addEventListener('mousemove',onMouseMove)
resize();
window.addEventListener('resize',resize)



/*nav_Btn click*/
const timeline01 = gsap.timeline({
    paused:true
});
timeline01.to('.line',{
    opacity:0,
    duration:.3
},0)
timeline01.to('.hamburger-lines',{
    width:'379px',
    ease:'power1.out',
    duration:.5,
    //opacity:1,
})
timeline01.to('.left_menu',{
    opacity:1,
    zIndex:5,
    duration:.3,

},'>')
timeline01.to('.left_menu .menu_item',{
    opacity:1,
    ease:'power1.out',
    y:0,
    stagger:{
        each:.15,
        from:"start"
    },
},'>')


const perfumeTL = gsap.timeline({
    scrollTrigger:{
        trigger:'.new_item_wrap',
        start:'top top',
        end:'+=2000',
        scrub:true,
        pin:true,
        anticipatePin:1, 
        //markers:true
    }

})

perfumeTL.to('.item_txt',{
    display:'block',
    stagger:1,
},0)
perfumeTL.to('.item_img',{
    display:'block',
    stagger:1,
   //onEnter:()=>{console.log("onEnter");}
},0)






document.querySelector('.hamburger-lines').addEventListener('click',()=>{
    timeline01.restart();
})
window.addEventListener('scroll',()=>{
    timeline01.timeScale(1.5);
    timeline01.reverse();
})

