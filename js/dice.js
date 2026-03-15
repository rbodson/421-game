
function rand(){
return Math.floor(Math.random()*6)+1
}

function roll(n){
let r=[]
for(let i=0;i<n;i++) r.push(rand())
return r
}

function sortDice(d){
return [...d].sort((a,b)=>b-a)
}

function animateDice(callback){
let n=10
let i=0
let t=setInterval(()=>{
d1.textContent=rand()
d2.textContent=rand()
d3.textContent=rand()
i++
if(i>=n){
clearInterval(t)
callback()
}
},80)
}
