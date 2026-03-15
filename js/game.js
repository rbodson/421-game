
let players=[]
let phase="charge"
let pool=21
let currentPlayer=0
let results=[]

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
