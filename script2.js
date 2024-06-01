// Init

let cpc = 1;

if (getCookie('cookie1') === null || getCookie('cookie2') === null || getCookie('cookie3') === null) {reset();} //si les cookies n'existent pas, on reset le jeu sinon on les récupère
else {
    nbCookies = parseFloat(getCookie('cookie1'), 10);
    cps = parseFloat(getCookie('cookie2'), 10);
    batiments = JSON.parse(getCookie('cookie3'));
    date = parseInt(getCookie('cookie4'), 10);
}

tempsAfkInit = parseInt(Date.now()) - date; //on calcule le temps passé en afk
nbCookies = nbCookies + (cps * (tempsAfkInit / 1000)); //on ajoute les cookies gagnés en afk

if (tempsAfkInit >= 1000) {
    let tempsAfk2 = tempsAfkInit;
    let tempsDeco = '';
    const alert = document.createElement('div');
    if (tempsAfk2 >= 86400000){tempsDeco = Math.floor(tempsAfk2/86400000) + " jours, " ; tempsAfk2 -= Math.floor(tempsAfk2/86400000)*86400000;}
    if (tempsAfk2 >= 3600000){tempsDeco = tempsDeco + Math.floor(tempsAfk2/3600000) + " heures, "; tempsAfk2 -= Math.floor(tempsAfk2/3600000)*3600000;}
    if (tempsAfk2 >= 60000){tempsDeco = tempsDeco + Math.floor(tempsAfk2/60000) + " minutes, "; tempsAfk2 -= Math.floor(tempsAfk2/60000)*60000;}
    if (tempsAfk2 >= 1000){tempsDeco = tempsDeco + Math.floor(tempsAfk2/1000) + " secondes, "; tempsAfk2 -= Math.floor(tempsAfk2/1000)*1000;}
    alert.textContent = `Temps de déconnexion : ${tempsDeco} \nCookies gagnés : ${formatage(cps * tempsAfkInit/1000)}`;
    alert.id = 'alert';
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

for (i=0; i < batiments.length; i++) {affichageBatiment(i);} //on affiche les batiments déjà disponibles

updateTextes();

// Batiments (format = [[nom, prix, cps, nombre, prixinitial]])

function createBatiment(nom, prix, cps, nombre, description) {batiments.push([nom, prix, cps, nombre, prix, description]);}

function creationBatiments(){ //on crée les batiments au fur et à mesure que le joueur a assez de cookies
    if (nbCookies >= 15 && batiments.length === 0){createBatiment('Cursor', 15, 0.1, 0, "Clique Automatiquement toutes les 10 secondes");affichageBatiment(0);}
    if (nbCookies >= 100 && batiments.length === 1){createBatiment('Canard', 100, 1, 0, "Vive le Duck Tateur qui nous offre ses précieux cookies");affichageBatiment(1);}
    if (nbCookies >= 1100 && batiments.length === 2){createBatiment('Chat', 1100, 8, 0, "Le vrai meilleur ami de l'homme");affichageBatiment(2);}
    if (nbCookies >= 12000 && batiments.length === 3){createBatiment('Chien', 12000, 47, 0,"The annoying dog gives you 47 cookies per second ");affichageBatiment(3);}
    if (nbCookies >= 130000 && batiments.length === 4){createBatiment('Usine', 130000, 260, 0,"Produit de nombreux cookies pour son propriétaire");affichageBatiment(4);}
    if (nbCookies >= 1400000 && batiments.length === 5){createBatiment('Banque', 1400000, 1400, 0, "Génère des cookies avec les intérêts");affichageBatiment(5);}
    if (nbCookies >= 20000000 && batiments.length === 6){createBatiment('Fusée', 20000000, 7800, 0, "Ramène des cookies depuis l'espace");affichageBatiment(6);}
    if (nbCookies >= 330000000 && batiments.length === 7){createBatiment('Lune', 330000000, 44000, 0, "Ses habitants vous offrent gentillement leurs cookies");affichageBatiment(7);}
    if (nbCookies >= 5100000000 && batiments.length === 8){createBatiment('Station Spatiale', 5100000000, 260000, 0, "Récupère des cookies dans tout l'univers");affichageBatiment(8);}
    if (nbCookies >= 75000000000 && batiments.length === 9){createBatiment('Trou Noir', 75000000000, 1600000, 0, "On raconte que ses cookies viennent d'une autre dimension");affichageBatiment(9);}
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

    const batimentDescription = document.createElement('div');
    batimentDescription.id = 'Description';
    batimentDiv.appendChild(batimentDescription);

    const nomDiv = document.createElement('h1');
    nomDiv.textContent = batiments[i][0];
    batimentDescription.appendChild(nomDiv);
        
    const prixDiv = document.createElement('div');
    prixDiv.id = 'Prix'+batiments[i][0];
    prixDiv.textContent = formatage(batiments[i][1]) + " cookies";
    batimentDescription.appendChild(prixDiv);

    const nombreDiv = document.createElement('div');
    nombreDiv.id = 'Nombre'+batiments[i][0];
    nombreDiv.textContent = batiments[i][3];
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

function canbuy(){
    for (let i = 0; i < batiments.length; i++){
        if (nbCookies >= batiments[i][1]){ document.getElementById('Prix'+batiments[i][0]).className = 'canbuy';document.getElementById(batiments[i][0]).className = 'canbuy';}
        else{document.getElementById('Prix'+batiments[i][0]).className = 'cantbuy';document.getElementById(batiments[i][0]).className = 'cantbuy';}
    }
}
setInterval(canbuy, 100);
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
        document.getElementById('Prix'+batiments[i][0]).textContent = formatage(batiments[i][1])+ " cookies";
        document.getElementById('Nombre'+batiments[i][0]).textContent = batiments[i][3];
    }
    document.title = formatage(nbCookies) + " cookies - Cookie Clicker"; //on met à jour le titre de la page avec le nombre de cookies
}

function parSeconde(){
    nbCookies = Math.round((nbCookies + cps)*10) / 10; //on ajoute les cps chaque seconde
    updateTextes();
}

function formatage(nb){
    if (nb < 1000000){
        if (batiments[0] && batiments[0][2] !== undefined && nb !== cps && nb !== batiments[0][2]) {return Intl.NumberFormat('en-US').format(Math.round(nb));} // on affiche le nombre avec des virgules     
            else {return Intl.NumberFormat('en-US',{minimumFractionDigits:1,maximumFractionDigits:1}).format(nb);}  //on garde le nombre de base pour les cps (pour aficher la virgule)
    }else{  // on compte combien de fois on peut diviser le nombre par 1000 pour afficher le bon suffixe
        let i = 0;
        while (nb >= 1000){
            nb = nb / 1000;
            i++;
        }
        if (i < 11){return nb.toFixed(1) + ['','',' million',' billion',' trillion',' quadrillion',' quintillion',' sextillion',' septillion',' octillion',' nonillion'][i];}
        else {return nb.toFixed(1) + 'e' + 3*i;}
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
    setCookie('cookie4', Date.now(), 3);
}

setInterval(sendCookie, 500);
