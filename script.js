let nbCookies = 0;
let cps = 0;
let cpc = 1;

function clique(){
    nbCookies = Math.round((nbCookies + cpc)*10) / 10;
    document.getElementById("nombre").innerText = nbCookies;
    return nbCookies;
}

function parSeconde(){
    nbCookies = Math.round((nbCookies + cps)*10) / 10;
    document.getElementById("nombre").innerText = nbCookies;
    document.getElementById("cpstot").innerText = "par seconde : "+ Math.round((cps+cursorCps*cursorNombre)*10) / 10;
}

setInterval(parSeconde, 1000);

function parSecondeVirgule(){
    nbCookies = nbCookies + cursorNombre*cursorCps*10 ;
    document.getElementById("nombre").innerText = nbCookies;
    document.getElementById("cpstot").innerText = "par seconde : "+ Math.round((cps+cursorCps*cursorNombre)*10) / 10;
}
setInterval(parSecondeVirgule, 10000);

// Batiments

let cursorPrix = 15;
let cursorCps = 0.1;
let cursorNombre = 0;
function cursor(){
    if (nbCookies-cursorPrix >= 0){
        nbCookies = Math.round((nbCookies-cursorPrix)*10) / 10;
        cursorNombre++;
        cursorPrix = (15 * (1.15**cursorNombre)).toFixed();
        document.getElementById("cursorCps").innerText = "Cps : " + cursorCps;
        document.getElementById("cursorPrix").innerText = "Prix : " + cursorPrix;
        document.getElementById("cursorNombre").innerText = "Nombre : " + cursorNombre;
        document.getElementById("nombre").innerText = nbCookies;
    }
}

let canardPrix = 100;
let canardCps = 1;
let canardNombre = 0;
function canard(){
    if (nbCookies-canardPrix >= 0){
        canardNombre ++;
        nbCookies = nbCookies - canardPrix;
        canardPrix = (100 * (1.15**canardNombre)).toFixed();
        cps = cps + canardCps;
        document.getElementById("canardCps").innerText = "Cps : " + canardCps;
        document.getElementById("canardPrix").innerText = "Prix : " + canardPrix;
        document.getElementById("canardNombre").innerText = "Nombre : " + canardNombre;
        document.getElementById("nombre").innerText = nbCookies;
    }
    else{
        alert("Bah non t'es trop pauvre sale gueux")
    }
}
