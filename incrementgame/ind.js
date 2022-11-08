let count=0
let dos=document.getElementById("count-el");
let saveEl=document.getElementById("save-el");

console.log(dos)
function increment(){
    count+=1;
    dos.textContent=count;
}
function save(){
    // let finc=count+"-"
saveEl.textContent+=count+"-"
count=0
dos.textContent=count
}


