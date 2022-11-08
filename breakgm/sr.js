const grid=document.querySelector('#grid')
const score=document.querySelector('#score')
const blockwidth=100;
const blockheight=20;
const boardwidth=560
const boardhight=300;
const balldiam=20;
let xdirection=2
let ydirection=2
const userStart=[230,10]
let current=userStart
const ballstart=[270,40]
let ballcurrent=ballstart
let timer
let sco=0
//create a block class
class block{
    constructor(xAxis,yAxis){
    this.bottomLeft=[xAxis,yAxis]
    this.bottomRight=[xAxis+blockwidth,yAxis]
    this.topLeft=[xAxis,yAxis+blockheight]
    this.topRight=[xAxis+blockwidth,yAxis+blockheight]
    }
}
const blocks=[
    new block(10,270),
    new block(120,270),
    new block(230,270),
    new block(340,270),
    new block(450,270),
    new block(10,240),
    new block(120,240),
    new block(230,240),
    new block(340,240),
    new block(450,240),
    new block(10,210),
    new block(120,210),
    new block(230,210),
    new block(340,210),
    new block(450,210)
    // new block(10,270),new block(10,270),new block(10,270),new block(10,270),
]

//draw block 
function addblock(){
    for(let i=0;i<blocks.length;i++){
        const block=document.createElement('div')
    block.classList.add('block')
    block.style.left=blocks[i].bottomLeft[0]+'px'
    block.style.bottom=blocks[i].bottomLeft[1]+'px'
    block.innerHTML="+1"
    grid.appendChild(block)
    }
}
addblock()
//adding user
const user=document.createElement('div')
user.innerHTML="GAME⏳"
user.classList.add('user')

drawuser()
grid.appendChild(user)
//draw user
function drawuser(){
    user.style.left=current[0]+'px'
    user.style.bottom=current[1]+'px'
}
//draw ball
function darwball(){
    ball.style.left=ballcurrent[0]+'px'
    ball.style.bottom=ballcurrent[1]+'px'
}
//move user
function moveuser(e){
switch(e.key){
    case 'ArrowLeft':
        if(current[0]>0){
            current[0]-=5
            drawuser()
        }
        break;
        case 'ArrowRight':
        if(current[0]<boardwidth-blockwidth){
            current[0]+=5
            drawuser()
        }
        break;
         
}
}
document.addEventListener('keydown',moveuser)
//add a ball
const ball=document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
darwball()

//moving the ball
function moveball(){
    ballcurrent[0]+=xdirection
    ballcurrent[1]+=ydirection
   darwball()
   collision()
}
timer=setInterval(moveball,20)
//check for collision
function collision(){
    //check for block collision
    for(let i=0;i<blocks.length;i++){
        if(
            (ballcurrent[0]>blocks[i].bottomLeft[0]&&ballcurrent[0]<blocks[i].bottomRight[0])&&
            (ballcurrent[1]+balldiam>blocks[i].bottomLeft[1]&&ballcurrent[1]<blocks[i].topLeft[1])
            ){
             const allbl=Array.from(document.querySelectorAll('.block'))
             console.log(allbl)
             allbl[i].classList.remove("block")
             allbl[i].innerHTML=""
             blocks.splice(i,1)
             changeDirection()
             sco++
             score.innerHTML=sco
             if(blocks.length===0){
                score.innerHTMl="you won"
                clearInterval(timer)
                document.removeEventListener('keydown',moveuser)
             }
            }
    }
if(ballcurrent[0]>=(boardwidth-balldiam)||ballcurrent[1]>=(boardhight-balldiam)||ballcurrent[0]<=0){
    changeDirection()
}
//check for user collision
if((ballcurrent[0]>current[0] && ballcurrent[0]<current[0]+blockwidth)&&
   (ballcurrent[1]>current[1] && ballcurrent[1]<current[1]+blockheight)
){
    changeDirection()
}

//check for game ending
if(ballcurrent[1]<=0){
    clearInterval(timer)
    score.innerHTML='you lose'
    document.removeEventListener('keydown',moveuser)
}
}

function changeDirection(){
if(xdirection===2 && ydirection===2){
    ydirection= -2
    return
}
if(xdirection===2&&ydirection===-2){
    xdirection=-2
    return
}
if(xdirection===-2&&ydirection===-2){
ydirection=2
return
}
if(xdirection===-2&&ydirection===2){
    xdirection=2
    return
}
}