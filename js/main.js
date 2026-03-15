
function startGame(){

let h=parseInt(humanCount.value)
let ai=parseInt(aiCount.value)

players=[]

for(let i=0;i<h;i++){
let name=prompt("Pseudo joueur "+(i+1))
players.push(new Player(name,false))
}

for(let i=0;i<ai;i++){
players.push(new Player("IA_"+(i+1),true))
}

setup.style.display="none"
game.style.display="block"

updateUI()

}

function updateUI(){

phase.textContent="Phase : "+phase
turn.textContent="Tour : "+players[currentPlayer].name

let txt=""

players.forEach(p=>{
txt+=p.name+" : "+p.score+"<br>"
})

scores.innerHTML=txt

}

function log(t){

let logDiv=document.getElementById("log")
logDiv.innerHTML+=t+"<br>"
logDiv.scrollTop=logDiv.scrollHeight

}
