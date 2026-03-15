function saveStats(name){

let stats=JSON.parse(localStorage.getItem("stats") || "{}")

if(!stats[name])
stats[name]=0

stats[name]++

localStorage.setItem("stats",JSON.stringify(stats))

showStats()

}

function showStats(){

let stats=JSON.parse(localStorage.getItem("stats") || "{}")

let txt=""

for(let p in stats){

txt+=p+" : "+stats[p]+" victoires<br>"

}

document.getElementById("stats").innerHTML=txt

}

showStats()