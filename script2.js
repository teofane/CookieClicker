// Init

let cpc = 1;

if (getCookie('cookie1') === null || getCookie('cookie2') === null || getCookie('cookie3') === null) {reset();} //si les cookies n'existent pas, on reset le jeu sinon on les récupère
else {
    nbCookies = parseFloat(getCookie('cookie1'), 10);
    cps = parseFloat(getCookie('cookie2'), 10);
    batiments = JSON.parse(getCookie('cookie3'));
}

for (i=0; i < batiments.length; i++) {affichageBatiment(i);} //on affiche les batiments déjà disponibles

updateTextes();

// Batiments (format = [[nom, prix, cps, nombre, prixinitial]])

function createBatiment(nom, prix, cps, nombre) {batiments.push([nom, prix, cps, nombre, prix]);}

function creationBatiments(){ //on crée les batiments au fur et à mesure que le joueur a assez de cookies
    if (nbCookies >= 15 && batiments.length === 0){createBatiment('Cursor', 15, 0.1, 0);affichageBatiment(0);}
    if (nbCookies >= 100 && batiments.length === 1){createBatiment('Canard', 100, 1, 0);affichageBatiment(1);}
    if (nbCookies >= 1100 && batiments.length === 2){createBatiment('Chat', 1100, 8, 0);affichageBatiment(2);}
    if (nbCookies >= 12000 && batiments.length === 3){createBatiment('Chien', 12000, 47, 0);affichageBatiment(3);}
    if (nbCookies >= 130000 && batiments.length === 4){createBatiment('Usine', 130000, 260, 0);affichageBatiment(4);}
}

function affichageBatiment(i){ // i est la position du batiment dans le tableau
    //on crée un div pour chaque batiment contentant une image, le prix, le cps et le nombre de batiments
    const batimentDiv = document.createElement('div');
    batimentDiv.id = batiments[i][0];
    document.getElementById('batiments').appendChild(batimentDiv);

    const batimentImg = document.createElement('img');
    batimentImg.src = 'assets/' + batiments[i][0] + '.png';
    batimentImg.id = batiments[i][0] + 'Png';
    batimentDiv.appendChild(batimentImg);

    const prixDiv = document.createElement('div');
    prixDiv.id = 'Prix'+batiments[i][0];
    prixDiv.textContent = "Prix : " + formatage(batiments[i][1]);
    batimentDiv.appendChild(prixDiv);

    const cpsDiv = document.createElement('div');
    cpsDiv.id = 'Cps'+batiments[i][0];
    cpsDiv.textContent = "Cps : " + formatage(batiments[i][2]);
    batimentDiv.appendChild(cpsDiv);

    const nombreDiv = document.createElement('div');
    nombreDiv.id = 'Nombre'+batiments[i][0];
    nombreDiv.textContent = "Nombre : " + batiments[i][3];
    batimentDiv.appendChild(nombreDiv);

    document.getElementById(batiments[i][0]).onclick = function() {
        if (nbCookies >= batiments[i][1]){ //si le joueur a assez de cookies
        nbCookies = nbCookies - batiments[i][1]; //on lui retire le prix du batiment
        cps = cps + batiments[i][2];          //on ajoute le cps du batiment à cps
        batiments[i][1] = Math.round(batiments[i][4] * (1.15**(batiments[i][3]+1))); //on augmente le prix du batiment
        batiments[i][3] = batiments[i][3] + 1; //on augmente le nombre de batiments
        updateTextes();
    }};
}

setInterval(creationBatiments, 100); //on vérifie si on peut créer un nouveau batiment toutes les 100ms

// fonctions principales

function reset(){
    if (confirm("Êtes-vous sûr de vouloir recommencer ? \nCela supprimera toutes vos données de jeu.")){
        for (let i = 0; i < batiments.length; i++){ 
            document.getElementById(batiments[i][0]).remove(); //on supprime les divs des batiments un par un
        }
        nbCookies = 0;  //on reset toutes les variables
        cps = 0;
        batiments = [];
    }
}

function clique(){
    nbCookies = nbCookies + cpc;
    updateTextes();
}

function updateTextes(){

    document.getElementById('nombre').textContent = formatage(nbCookies) + " cookies";
    document.getElementById('cpstot').textContent = formatage(cps) + "/s" ;

    for (let i = 0; i < batiments.length; i++){ //on met à jour les textes des batiments ( prix, cps, nombre)
        document.getElementById('Prix'+batiments[i][0]).textContent = " Prix : " + formatage(batiments[i][1]);
        document.getElementById('Cps'+batiments[i][0]).textContent = " Cps : " + formatage(batiments[i][2]);
        document.getElementById('Nombre'+batiments[i][0]).textContent = " Nombre : " + batiments[i][3];
    }
    document.title = formatage(nbCookies) + " cookies - Cookie Clicker"; //on met à jour le titre de la page avec le nombre de cookies
}

function parSeconde(){
    nbCookies = Math.round((nbCookies + cps)*10) / 10; //on ajoute les cps chaque seconde
    updateTextes();
}

function formatage(nb){
    if (nb < 1000000){
        if (nb !== cps){return Math.round(nb);} //on arrondit la valeur à l'unité si elle est inférieure à 1 million
        else {return nb.toFixed(1);}  //on garde le nombre de base pour les cps (pour aficher la virgule)
    }else{  // on compte combien de fois on peut diviser le nombre par 1000 pour afficher le bon suffixe
        let i = 0;
        while (nb >= 1000){
            nb = nb / 1000;
            i++;
        }
        if (i < 12){return nb.toFixed(1) + ['','',' thousand',' million',' billion',' trillion',' quadrillion',' quintillion',' sextillion',' septillion',' octillion',' nonillion'][i];}
        else {return nb.toFixed(1) + ' Mais wsh frr abuse\n arrete de cheat ou achete toi une vie';}
    }
}

setInterval(updateTextes, 100);
setInterval(parSeconde, 1000);


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
