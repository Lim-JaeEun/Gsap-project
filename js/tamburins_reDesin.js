const canvas =document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let canvasParents = canvas.parentNode;
let canvasWidth, canvasHeight;

function resize(){
    canvasWidth = canvasParents.clientWidth;
    canvasHeight = canvasParents.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = canvasWidth+'px';
    canvas.style.height = canvasHeight+'px';
}
resize();