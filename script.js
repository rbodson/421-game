let players=[]
let currentPlayer=0

function createGame(){

let human=parseInt(document.getElementById("humanPlayers").value)
let ai=parseInt(document.getElementById("aiPlayers").value)

players=[]

let config=document.getElementById("playersConfig")
config.innerHTML=""

for(let i=0;i<human;i++){

config.innerHTML+=
"Pseudo joueur "+(i+1)+
"<input id='p"+i+"' value='Joueur"+(i+1)+"'><br>"

}

for(let i=0;i<ai;i++){

players.push({
name:"IA_"+(i+1),
type:"ai",
score:0
})

}

setTimeout(startGame,200)

}

function startGame(){

let human=parseInt(document.getElementById("humanPlayers").value)

for(let i=0;i<human;i++){

let name=document.getElementById("p"+i).value

players.push({
name:name,
type:"human",
score:0
})

}

document.getElementById("menu").style.display="none"
document.getElementById("gameArea").style.display="block"

drawBoard()

}

function drawBoard(){

let board=document.getElementById("playersBoard")

board.innerHTML=""

players.forEach((p,i)=>{

board.innerHTML+=
"<div class='playerCard'>"+
"<h3>"+p.name+"</h3>"+
"<div id='dice"+i+"'>🎲 🎲 🎲</div>"+
"<p>Score : "+p.score+"</p>"+
"</div>"

})

}

function rollDice(){

let p=players[currentPlayer]

p.dice=[
roll(),
roll(),
roll()
]

displayDice(currentPlayer)

}

function endTurn(){

let p=players[currentPlayer]

let s=score(p.dice)

p.score+=s

saveStats(p.name)

currentPlayer++

if(currentPlayer>=players.length)
currentPlayer=0

drawBoard()

if(players[currentPlayer].type=="ai")
aiPlay()

}

function displayDice(i){

let txt=players[i].dice.join(" ")

document.getElementById("dice"+i).innerText=txt

}

function roll(){
return Math.floor(Math.random()*6)+1
}