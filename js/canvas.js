document.querySelector('.new_product').style.display = 'none';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const canvasParents = canvas.parentNode;
let canvasWidth, canvasHeight;

const img = './images/temburins_main_img.jpg';

let isMouseDown = false;
let prevPos = {x:0, y:0}

function resize(){
    canvasWidth = canvasParents.clientWidth;
    canvasHeight = canvasParents.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';

    drawImage()
}
resize()

function drawImage(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    const image = new Image();
    image.src = img;
    image.onload=()=>{
    let sx, sy, sw, sh;

    let cw = canvas.width;
    let ch = canvas.height;

    let iw = image.width;
    let ih = image.height;

    let ir = ih / iw;
    let cr = ch / cw;



    if(ir >= cr) {
        sw = iw; 
        sh = sw*(ch/cw);
    }else {
        sh = ih;
        sw = sh*(cw/ch)
    }


    sx = (iw / 2) - (sw / 2)
    sy = (ih / 2) - (sh / 2);

    ctx.drawImage(image,sx,sy,sw,sh,0,0,cw,ch);
    }
}
function getDistance(p1,p2){
    const new_x = p2.x-p1.x;
    const new_y = p2.y-p1.y;
    return Math.sqrt(new_x*new_x + new_y*new_y);
    
}
function getAngle(p1,p2){
    const new_x = p2.x-p1.x;
    const new_y = p2.y-p1.y;
    //두점사이의 절대적인 각도
    return Math.atan2(new_y,new_x);
}
function draw_eraser(e){
    let nextPos = {x:e.offsetX, y:e.offsetY};
    let distance = getDistance(prevPos,nextPos);
    let angle = getAngle(prevPos,nextPos)
    for(let i=0; i<distance; i++){
        let x = prevPos.x + Math.cos(angle) * i;
        let y = prevPos.y + Math.sin(angle) * i;
        ctx.beginPath();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.arc(x,y,canvasWidth/18,0,Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    prevPos = nextPos;
    get_percent();
}
function get_percent(){
    const canvas_pixel = ctx.getImageData(0,0,canvasWidth,canvasHeight);
    const totalLength = canvas_pixel.data.length / 32;
    let count = 0;
    let percent;
    for(let i=0; i<canvas_pixel.data.length-3; i+=32){
        if(canvas_pixel.data[i] == 0) count++;
    }
    percent = Math.round(count/totalLength * 100);

    if(percent > 50) {
        gsap.to(canvas,{
            opacity:0,
            duration:.7,
            onComplete:()=>{
                canvas.style.opacity = 1;
                drawImage();
            }
        })
    }
    
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
    draw_eraser(e);
}


canvas.addEventListener('mousedown',onMouseDown)
canvas.addEventListener('mouseup',onMouseUp)
canvas.addEventListener('mousemove',onMouseMove)