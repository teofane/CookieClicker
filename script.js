let cpc = 1;

// Cookies
function reset(){
    if (confirm("Êtes-vous sûr de vouloir recommencer ? \nCela supprimera toutes vos données de jeu.\nCela pourrait être utile si vous avez des bugs.")){
        nbCookies = 0;
        cps = 0;
        cursorPrix = 15;
        cursorNombre = 0;
        canardPrix = 100;
        canardNombre = 0;
        chatNombre = 0;
        chatPrix = 1100;
    }
}

if (getCookie('cookie1') === null) {
    reset()
} else {
    nbCookies = parseInt(getCookie('cookie1'), 10);
    cps = parseInt(getCookie('cookie2'), 10);
    cursorPrix = parseInt(getCookie('cookie3'), 10);
    cursorNombre = parseInt(getCookie('cookie4'), 10);
    canardPrix = parseInt(getCookie('cookie5'), 10);
    canardNombre = parseInt(getCookie('cookie6'), 10);
    chatNombre = parseInt(getCookie('cookie7'), 10);
    chatPrix = parseInt(getCookie('cookie8'), 10);
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const value = cookies
        .find(c => c.startsWith(name + "="))
        ?.split('=')[1];
    if (value === undefined) {
        return null;
    }        
    return value;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()};`;
}

function sendCookie() {
    setCookie('cookie1', nbCookies, 3);
    setCookie('cookie2', cps, 3);
    setCookie('cookie3', cursorPrix, 3);
    setCookie('cookie4', cursorNombre, 3);
    setCookie('cookie5', canardPrix, 3);
    setCookie('cookie6', canardNombre, 3);
    setCookie('cookie7', chatNombre, 3);
    setCookie('cookie8', chatPrix, 3);
    document.getElementById("canardPrix").innerText = "Prix : " + parseInt(getCookie('cookie5'), 10);
    document.getElementById("canardNombre").innerText = "Nombre : " + parseInt(getCookie('cookie6'), 10);
    document.getElementById("cursorNombre").innerText = "Nombre : " + parseInt(getCookie('cookie4'), 10);
    document.getElementById("cursorPrix").innerText = "Prix : " + parseInt(getCookie('cookie3'), 10);
    document.getElementById("chatNombre").innerText = "Nombre : " + parseInt(getCookie('cookie7'), 10);
    document.getElementById("chatPrix").innerText = "Prix : " + parseInt(getCookie('cookie8'), 10);
    document.getElementById("nombre").innerText = "Cookies : " + nbCookies;
    document.getElementById("cpstot").innerText = Math.round((cps+cursorCps*cursorNombre)*10) / 10+"/s";
}

setInterval(sendCookie, 1000);

// fonctions principales

function clique(){
    nbCookies = Math.round((nbCookies + cpc)*10) / 10;
    document.getElementById("nombre").innerText = "Cookies : " + nbCookies;
    return nbCookies;
}

function parSeconde(){
    nbCookies = Math.round((nbCookies + cps)*10) / 10;
    document.getElementById("nombre").innerText = "Cookies : " + nbCookies;
    document.getElementById("cpstot").innerText = Math.round((cps+cursorCps*cursorNombre)*10) / 10+"/s";
}

setInterval(parSeconde, 1000);

function parSecondeVirgule(){
    nbCookies = nbCookies + cursorNombre*cursorCps*10 ;
    document.getElementById("nombre").innerText = "Cookies : " + nbCookies;
    document.getElementById("cpstot").innerText = Math.round((cps+cursorCps*cursorNombre)*10) / 10 +"/s";
}
setInterval(parSecondeVirgule, 10000);

// Batiments

let cursorCps = 0.1;
function cursor(){
    if (nbCookies-cursorPrix >= 0){
        nbCookies = Math.round((nbCookies-cursorPrix)*10) / 10;
        cursorNombre++;
        cursorPrix = (15 * (1.15**cursorNombre)).toFixed();
        document.getElementById("cursorCps").innerText = "Cps : " + cursorCps;
        document.getElementById("cursorPrix").innerText = "Prix : " + cursorPrix;
        document.getElementById("cursorNombre").innerText = "Nombre : " + cursorNombre;
        document.getElementById("nombre").innerText = "Cookies : " + nbCookies;
    }
}

let canardCps = 1;
function canard(){
    if (nbCookies-canardPrix >= 0){
        canardNombre ++;
        nbCookies = nbCookies - canardPrix;
        canardPrix = (100 * (1.15**canardNombre)).toFixed();
        cps = cps + canardCps;
        document.getElementById("canardCps").innerText = "Cps : " + canardCps;
        document.getElementById("canardPrix").innerText = "Prix : " + canardPrix;
        document.getElementById("canardNombre").innerText = "Nombre : " + canardNombre;
        document.getElementById("nombre").innerText = "Cookies : " + nbCookies;
    }
}

let chatCps = 8;
function chat(){
    if (nbCookies-chatPrix >= 0){
        chatNombre ++;
        nbCookies = nbCookies - chatPrix;
        chatPrix = (1100 * (1.15**chatNombre)).toFixed();
        cps = cps + chatCps;
        document.getElementById("chatCps").innerText = "Cps : " + chatCps;
        document.getElementById("chatPrix").innerText = "Prix : " + chatPrix;
        document.getElementById("chatNombre").innerText = "Nombre : " + chatNombre;
        document.getElementById("nombre").innerText = "Cookies : " + nbCookies;
    }
}
