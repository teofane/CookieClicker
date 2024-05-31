// Init

let cpc = 1;

if (getCookie('cookie1') === null || getCookie('cookie2') === null || getCookie('cookie3') === null) {
    reset()
} else {
    nbCookies = parseFloat(getCookie('cookie1'), 10);
    cps = parseFloat(getCookie('cookie2'), 10);
    batiments = JSON.parse(getCookie('cookie3'));
}
if (batiments.length >= 1){affichageBatiment(0);}
if (batiments.length >= 2){affichageBatiment(1);}
if (batiments.length >= 3){affichageBatiment(2);}
if (batiments.length >= 4){affichageBatiment(3);}
if (batiments.length >= 5){affichageBatiment(4);}

updateTextes();
// Batiments (format = [[nom, prix, cps, nombre, prixinitial]])

function createBatiment(nom, prix, cps, nombre) {batiments.push([nom, prix, cps, nombre, prix]);}

function creationBatiments(){
    if (nbCookies >= 15 && batiments.length === 0){createBatiment("Cursor", 15, 0.1, 0);affichageBatiment(0);}
    if (nbCookies >= 100 && batiments.length === 1){createBatiment("Canard", 100, 1, 0);affichageBatiment(1);}
    if (nbCookies >= 1100 && batiments.length === 2){createBatiment("Chat", 1100, 8, 0);affichageBatiment(2);}
    if (nbCookies >= 12000 && batiments.length === 3){createBatiment("Chien", 12000, 47, 0);affichageBatiment(3);}
    if (nbCookies >= 130000 && batiments.length === 4){createBatiment("Usine", 130000, 260, 0);affichageBatiment(4);}
}

function affichageBatiment(i){ // i est la position du batiment dans le tableau
    const batimentDiv = document.createElement('div');
    batimentDiv.textContent = batiments[i][0] + " : " + batiments[i][3];
    batimentDiv.id = batiments[i][0];
    document.getElementById('batiments').appendChild(batimentDiv);
    document.getElementById(batiments[i][0]).onclick = function() {
        if (nbCookies >= batiments[i][1]){
        nbCookies = nbCookies - batiments[i][1];
        cps = cps + batiments[i][2];
        batiments[i][1] = Math.round(batiments[i][4] * (1.15**(batiments[i][3]+1)));
        batiments[i][3] = batiments[i][3] + 1;
        updateTextes();
    }};
}

setInterval(creationBatiments, 100);

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
    setCookie('cookie3', JSON.stringify(batiments), 3);
}

setInterval(sendCookie, 100);

// fonctions principales

function reset(){
    if (confirm("Êtes-vous sûr de vouloir recommencer ? \nCela supprimera toutes vos données de jeu.\nCela pourrait être utile si vous avez des bugs.")){
        for (let i = 0; i < batiments.length; i++){
            document.getElementById(batiments[i][0]).remove();
        }
        nbCookies = 0;
        cps = 0;
        batiments = [];
    }
}

function clique(){
    nbCookies = nbCookies + cpc;
    updateTextes();
}

function updateTextes(){

    if (nbCookies < 1000){document.getElementById('nombre').textContent = parseInt(formatage(nbCookies));}
    else {document.getElementById('nombre').textContent = formatage(nbCookies);}
    document.getElementById('cpstot').textContent = formatage(cps);

    for (let i = 0; i < batiments.length; i++){
        const element = document.getElementById(batiments[i][0]);
        if (element) {
            element.textContent = batiments[i][0] + " Prix : " + formatage(batiments[i][1]) + " Nombre : " + batiments[i][3];
        }
    }
}

function parSeconde(){
    nbCookies = Math.round((nbCookies + cps)*10) / 10;
    updateTextes();
}

function formatage(nb){
    let i = 0;
    while (nb >= 1000){
        nb = nb / 1000;
        i++;
    }
    return nb.toFixed(1) + ['','K','M','B','T','Q'][i];
}
setInterval(updateTextes, 100);
setInterval(parSeconde, 1000);
