function score(d){

let s=[...d].sort((a,b)=>b-a)

if(s[0]==4 && s[1]==2 && s[2]==1)
return 100

if(s[0]==1 && s[1]==1 && s[2]==1)
return 90

if(s[0]==s[1] && s[1]==s[2])
return 80+s[0]

return s[0]*10+s[1]

}