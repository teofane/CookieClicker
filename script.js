let nbCookies = 0;
let cps = 0;
let cpc = 10;

function clique(){
    nbCookies = nbCookies + cpc;
    document.getElementById("nombre").innerText = nbCookies;
    return nbCookies
}

function parSeconde(){
    nbCookies = nbCookies + cps;
    document.getElementById("nombre").innerText = nbCookies;
    document.getElementById("cps").innerText = "par seconde : "+cps;
}

setInterval(parSeconde, 1000);

// Batiments

let cursorPrix = 150;
let cursorCps = 1;
let cursorNombre = 0;
function cursor(){
    if (nbCookies-cursorPrix > 0){
        nbCookies = nbCookies - cursorPrix;
        cursorNombre++;
        cursorPrix = (cursorPrix * (1.15**cursorNombre)).toFixed();
        cps = cps + cursorCps;
        document.getElementById("cursor").innerText = "Cps : "+cursorCps+", Prix : "+cursorPrix+", Nombre :"+cursorNombre;
        document.getElementById("nombre").innerText = nbCookies;
    }
}

let canardPrix = 1000;
let canardCps = 10;
let canardNombre = 0;
function canard(){
    if (nbCookies-canardPrix > 0){
        canardNombre ++;
        nbCookies = nbCookies - canardPrix;
        canardPrix = (canardPrix * (1.15**canardNombre)).toFixed();
        cps = cps + canardCps
        document.getElementById("Canard").innerText = "Cps : "+canardCps+", Prix : "+canardPrix+", Nombre :"+canardNombre;
        document.getElementById("nombre").innerText = nbCookies;
    }
}