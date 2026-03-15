
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
