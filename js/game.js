class Player{

constructor(name,isAI=false){

this.name=name
this.score=0
this.isAI=isAI

}

}

let players=[]
let phase="charge"
let pool=21
let currentPlayer=0
let results=[]

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

function rankCombination(d){

let dice=sortDice(d)

let count={}
dice.forEach(x=>count[x]=(count[x]||0)+1)

if(dice[0]==4 && dice[1]==2 && dice[2]==1)
return [8,dice]

if(dice[0]==1 && dice[1]==1 && dice[2]==1)
return [7,dice]

if(Object.keys(count).length==1)
return [6,dice]

if(count[1]==2){

let other=dice.find(x=>x!=1)
return [5,[other,1,1]]

}

let suites=[
[6,5,4],
[5,4,3],
[4,3,2],
[3,2,1]
]

for(let s of suites)
if(JSON.stringify(dice)==JSON.stringify(s))
return [4,dice]

if(dice[0]==2 && dice[1]==1 && dice[2]==1)
return [0,dice]

return [1,dice]

}

function compareDice(a,b){

let r1=rankCombination(a)
let r2=rankCombination(b)

if(r1[0]>r2[0]) return 1
if(r1[0]<r2[0]) return -1

for(let i=0;i<3;i++){

if(r1[1][i]>r2[1][i]) return 1
if(r1[1][i]<r2[1][i]) return -1

}

return 0

}

function pointsOf(d){

return rankCombination(d)[0]

}

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

function rollDice(){

animateDice(()=>{

let dice=sortDice(roll(3))

d1.textContent=dice[0]
d2.textContent=dice[1]
d3.textContent=dice[2]

combo.textContent="Combinaison : "+dice.join(" ")

results.push({player:players[currentPlayer],dice:dice})

log(players[currentPlayer].name+" -> "+dice.join(" "))

nextTurn()

})

}

function nextTurn(){

currentPlayer++

if(currentPlayer>=players.length){

resolveRound()
currentPlayer=0
results=[]

}

updateUI()

if(players[currentPlayer].isAI){

setTimeout(rollDice,1000)

}

}

function resolveRound(){

let best=results[0]
let worst=results[0]

for(let r of results){

if(compareDice(r.dice,best.dice)==1) best=r
if(compareDice(r.dice,worst.dice)==-1) worst=r

}

if(phase=="charge"){

let pts=Math.min(pointsOf(best.dice),pool)

worst.player.score+=pts
pool-=pts

log(best.player.name+" donne "+pts+" points à "+worst.player.name)

if(pool<=0){

phase="decharge"
log("Phase décharge")

}

}else{

let pts=pointsOf(best.dice)

worst.player.score+=pts

log(best.player.name+" donne "+pts+" points à "+worst.player.name)

if(worst.player.score>=21){

log(worst.player.name+" perd la partie")

players=players.filter(p=>p!=worst.player)

}

}

}

function updateUI(){

phaseTitle=document.getElementById("phase")
turn=document.getElementById("turn")

phaseTitle.textContent="Phase : "+phase
turn.textContent="Tour : "+players[currentPlayer].name

let txt=""

players.forEach(p=>{

txt+=p.name+" : "+p.score+"<br>"

})

scores.innerHTML=txt

}

function log(t){

logDiv=document.getElementById("log")
logDiv.innerHTML+=t+"<br>"
logDiv.scrollTop=logDiv.scrollHeight

}
