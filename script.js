// Init

let cpc = 1;
let cursorCps = 0.1;
let canardCps = 1;
let chatCps = 8;
let chienCps = 47;
let usineCps = 260;

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
    chienNombre = parseInt(getCookie('cookie9'), 10);
    chienPrix = parseInt(getCookie('cookie10'), 10);
    usineNombre = parseInt(getCookie('cookie11'), 10);
    usinePrix = parseInt(getCookie('cookie12'), 10);
    updateTextes();
}

// Cookies

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
    setCookie('cookie9', chienNombre, 3);
    setCookie('cookie10', chienPrix, 3);
    setCookie('cookie11', usineNombre, 3);
    setCookie('cookie12', usinePrix, 3);
}

setInterval(sendCookie, 1000);

// fonctions principales

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
        chienNombre = 0;
        chienPrix = 12000;
        usineNombre = 0;
        usinePrix = 130000;
    }
}

function clique(){
    nbCookies = nbCookies + cpc;
    updateTextes()
}

function updateTextes(){
    if(nbCookies >= 1000000000000){
        document.getElementById("nombre").innerText = "Cookies : " + (nbCookies/1000000000000).toFixed(1) + "T";
    } else if(nbCookies >= 1000000000){
        document.getElementById("nombre").innerText = "Cookies : " + (nbCookies/1000000000).toFixed(1) + "B";
    }else if(nbCookies >= 1000000){
        document.getElementById("nombre").innerText = "Cookies : " + (nbCookies/1000000).toFixed(1) + "M";
    }
    else if(nbCookies >= 1000){
        document.getElementById("nombre").innerText = "Cookies : " + (nbCookies/1000).toFixed(1) + "k";
    }else if(nbCookies < 1000){
        document.getElementById("nombre").innerText = "Cookies : " + nbCookies;
    }

    if (cursorPrix >= 1000000000000){
        document.getElementById("cursorPrix").innerText = "Prix: " + (cursorPrix/1000000000000).toFixed(1) + "T";
        } else if (cursorPrix >= 1000000000){
        document.getElementById("cursorPrix").innerText = "Prix: " + (cursorPrix/1000000000).toFixed(1) + "B";
        } else if (cursorPrix >= 1000000){
        document.getElementById("cursorPrix").innerText = "Prix: " + (cursorPrix/1000000).toFixed(1) + "M";
        } else if (cursorPrix >= 1000){
        document.getElementById("cursorPrix").innerText = "Prix: " + (cursorPrix/1000).toFixed(1) + "k";
        } else if (cursorPrix < 1000){
        document.getElementById("cursorPrix").innerText = "Prix: " + cursorPrix;
        }
    document.getElementById("cursorNombre").innerText = "Nombre : " + cursorNombre;

    if (canardPrix >= 1000000000000){
        document.getElementById("canardPrix").innerText = "Prix: " + (canardPrix/1000000000000).toFixed(1) + "T";
    } else if (canardPrix >= 1000000000){
        document.getElementById("canardPrix").innerText = "Prix: " + (canardPrix/1000000000).toFixed(1) + "B";
    } else if (canardPrix >= 1000000){
        document.getElementById("canardPrix").innerText = "Prix: " + (canardPrix/1000000).toFixed(1) + "M";
    } else if (canardPrix >= 1000){
        document.getElementById("canardPrix").innerText = "Prix: " + (canardPrix/1000).toFixed(1) + "k";
    } else if (canardPrix < 1000){
        document.getElementById("canardPrix").innerText = "Prix: " + canardPrix;
    }
    document.getElementById("canardNombre").innerText = "Nombre : " + canardNombre;

    if (chatPrix >= 1000000000000){
        document.getElementById("chatPrix").innerText = "Prix: " + (chatPrix/1000000000000).toFixed(1) + "T";
    } else if (chatPrix >= 1000000000){
        document.getElementById("chatPrix").innerText = "Prix: " + (chatPrix/1000000000).toFixed(1) + "B";
    } else if (chatPrix >= 1000000){
        document.getElementById("chatPrix").innerText = "Prix: " + (chatPrix/1000000).toFixed(1) + "M";
    } else if (chatPrix >= 1000){
        document.getElementById("chatPrix").innerText = "Prix: " + (chatPrix/1000).toFixed(1) + "k";
    } else if (chatPrix < 1000){
        document.getElementById("chatPrix").innerText = "Prix: " + chatPrix;
    }
    document.getElementById("chatNombre").innerText = "Nombre : " + chatNombre;

    if (chienPrix >= 1000000000000){
        document.getElementById("chienPrix").innerText = "Prix: " + (chienPrix/1000000000000).toFixed(1) + "T";
    } else if (chienPrix >= 1000000000){
        document.getElementById("chienPrix").innerText = "Prix: " + (chienPrix/1000000000).toFixed(1) + "B";
    } else if (chienPrix >= 1000000){
        document.getElementById("chienPrix").innerText = "Prix: " + (chienPrix/1000000).toFixed(1) + "M";
    } else if (chienPrix >= 1000){
        document.getElementById("chienPrix").innerText = "Prix: " + (chienPrix/1000).toFixed(1) + "k";
    } else if (chienPrix < 1000){
        document.getElementById("chienPrix").innerText = "Prix: " + chienPrix;
    }
    document.getElementById("chienNombre").innerText = "Nombre : " + chienNombre;

    if (usinePrix >= 1000000000000){
        document.getElementById("usinePrix").innerText = "Prix: " + (usinePrix/1000000000000).toFixed(1) + "T";
    } else if (usinePrix >= 1000000000){
        document.getElementById("usinePrix").innerText = "Prix: " + (usinePrix/1000000000).toFixed(1) + "B";
    } else if (usinePrix >= 1000000){
        document.getElementById("usinePrix").innerText = "Prix: " + (usinePrix/1000000).toFixed(1) + "M";
    } else if (usinePrix >= 1000){
        document.getElementById("usinePrix").innerText = "Prix: " + (usinePrix/1000).toFixed(1) + "k";
    } else if (usinePrix < 1000){
        document.getElementById("usinePrix").innerText = "Prix: " + usinePrix;
    }
    document.getElementById("usineNombre").innerText = "Nombre : " + usineNombre;
 
    if (cps >= 1000000000000){
        document.getElementById("cpstot").innerText = (Math.round((cps+cursorCps*cursorNombre)*10) /10/1000000000000).toFixed(1) + "T/s";
    }else if (cps >= 1000000000){
        document.getElementById("cpstot").innerText = (Math.round((cps+cursorCps*cursorNombre)*10) /10/1000000000).toFixed(1) + "B/s";
    } else if (cps >= 1000000){
        document.getElementById("cpstot").innerText = (Math.round((cps+cursorCps*cursorNombre)*10) /10/1000000).toFixed(1) + "M/s";
    } else if (cps >= 1000){
        document.getElementById("cpstot").innerText = (Math.round((cps+cursorCps*cursorNombre)*10) /10/1000).toFixed(1) + "k/s";
    } else if (cps < 1000){ 
        document.getElementById("cpstot").innerText = (Math.round((cps+cursorCps*cursorNombre)*10) / 10).toFixed(1) + "/s";
    }

}

function parSecondeVirgule(){
    nbCookies = nbCookies + cursorNombre*cursorCps*10 ;
    updateTextes()
}

function parSeconde(){
    nbCookies = Math.round((nbCookies + cps)*10) / 10;
    updateTextes()
}
setInterval(parSecondeVirgule, 10000);
setInterval(parSeconde, 1000);

//destruction

function destruction(){ 
    if (confirm("Êtes-vous sûr de vouloir tout détruire ?")){
        nbCookies = Infinity;
        cps = Infinity;
    }
}

// Batiments

function cursor(){
    if (nbCookies-cursorPrix >= 0){
        nbCookies = Math.round((nbCookies-cursorPrix)*10) / 10;
        cursorNombre++;
        cursorPrix = (15 * (1.15**cursorNombre)).toFixed();
        updateTextes();
    }
}

function canard(){
    if (nbCookies-canardPrix >= 0){
        canardNombre ++;
        nbCookies = nbCookies - canardPrix;
        canardPrix = (100 * (1.15**canardNombre)).toFixed();
        cps = cps + canardCps;
        updateTextes()
    }
}

function chat(){
    if (nbCookies-chatPrix >= 0){
        chatNombre ++;
        nbCookies = nbCookies - chatPrix;
        chatPrix = (1100 * (1.15**chatNombre)).toFixed();
        cps = cps + chatCps;
        updateTextes()
    }
}

function chien(){
    if (nbCookies-chienPrix >= 0){
        chienNombre ++;
        nbCookies = nbCookies - chienPrix;
        chienPrix = (12000 * (1.15**chienNombre)).toFixed();
        cps = cps + chienCps;
        updateTextes()
    }
}

function usine() {
    if (nbCookies - usinePrix >= 0) {
        usineNombre++;
        nbCookies = nbCookies - usinePrix;
        usinePrix = (130000 * (1.15 ** usineNombre)).toFixed();
        cps = cps + usineCps;
        updateTextes()
    }
}
