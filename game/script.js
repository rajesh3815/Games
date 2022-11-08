const squares=document.querySelectorAll(".square")
const mole=document.querySelector(".mole")
const time=document.getElementById("time-left")
const socre=document.getElementById("score")
let result=0;
let hitpostion
let ctime=60
function randomsquare(){
    squares.forEach(s=>{
        s.classList.remove('mole')
    })
    let rand=squares[Math.floor(Math.random()*9)]
    rand.classList.add('mole')
    hitpostion=rand.id
}
squares.forEach(sq=>{
    sq.addEventListener("mousedown",()=>{
       if(sq.id==hitpostion){
        result++
        socre.textContent=result
        hitpostion=null
       }
    })
})
function movemole(){
    let timerId=null;
    timerId=setInterval(randomsquare,1000)
}
movemole()
function countdown(){
ctime--
time.textContent=ctime
if(ctime==0){
    clearInterval(ct)
    clearInterval(timerId)
    alert("GameOver! Final Score is "+result)
}
}
let ct=setInterval(countdown,1000)
