const canvas =document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let canvasParents = canvas.parentNode;
let canvasWidth, canvasHeight;

let imageSrc = './images/temburins_main_03.jpg';
let currentIdx = 0;

let isMouseDown = false;
let prevPos = {x:0, y:0};

let percent = 0;

function resize(){
    canvasWidth = canvasParents.clientWidth;
    canvasHeight = canvasParents.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = canvasWidth+'px';
    canvas.style.height = canvasHeight+'px';

    drawImage();
    circle_infinite();

}

function drawImage(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight)
    const image = new Image();
    image.src = imageSrc;
    image.onload=()=>{
        ctx.drawImage(image,0,0,canvasWidth,canvasHeight)
    }
}
function getDistance(p1,p2){
    const dx = p2.x - p1.x;
    const dy = p2.y - p2.y;
    //두 점 사이의 거리 
    return Math.sqrt(dx * dx + dy + dy)
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
                    const image = new Image();
                    image.src = imageSrc;
                    image.onload=()=>{
                        ctx.drawImage(image,0,0,canvasWidth,canvasHeight)
                    }
                }
            })
            gsap.to('.arrow',{
                opacity:1,
                duration:1,
                top:'70%',
                ease:'power2.out'
            },'>+=.1')
        }
    },500)
    
}
let circle = document.querySelector('.arrow');
circle.innerHTML = circle.innerText.split("")
.map((char,i)=> `<span style="transform:rotate(${i * 2}deg)">${char}</span>`)
.join("");
function circle_infinite(){
    const circle_inner_span = document.querySelectorAll('.arrow span');

    circle_inner_span.forEach((el)=>{
        el.style.transformOrigin = `0 ${circle.clientWidth/2}px`
    })


    
}

function onMouseDown(e){
    if(isMouseDown) return;
    isMouseDown = true;
    prevPos = {x:e.offsetX, y:e.offsetY}
}
function onMouseUp(){
    isMouseDown = false;

}
function onMouseMove(e){
    if(!isMouseDown) return;
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
        each:.2,
        from:"start"
    },
},'>')


document.querySelector('.hamburger-lines').addEventListener('click',()=>{
    timeline01.restart();
})
window.addEventListener('scroll',()=>{
    timeline01.timeScale(1.5);
    timeline01.reverse();
})


