// Init

let cpc = 1;

if (getCookie('cookie1') === null || getCookie('cookie2') === null || getCookie('cookie3') === null) {reset();} //si les cookies n'existent pas, on reset le jeu sinon on les récupère
else {
    nbCookies = parseFloat(getCookie('cookie1'), 10);
    cps = parseFloat(getCookie('cookie2'), 10);
    batiments = JSON.parse(getCookie('cookie3'));
    date = parseInt(getCookie('cookie4'), 10);
    nbCookiesTotal = parseFloat(getCookie('cookie5'), 10);
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

for (i=0; i < batiments.length; i++) {affichageBatiment(i);} //on affiche les batiments

updateTextes();

// Batiments (format = [[nom, prix, cps, nombre, prixinitial]])

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

/*
    canbuy unlocked = on peut acheter le batiment et on l'a deverouillé
    cantbuy unlocked = on ne peut pas acheter le batiment mais on l'a deverouillé
    canbuy locked on = n'existe pas car canbuy implique qu'il est déverouillé
    cantbuy locked on = on ne peut pas l'acheter et il est verouillé mais on l'affiche car c'est le suivant après le dernier déverouillé
    canbuy locked off = n'existe pas car canbuy implique qu'il est déverouillé
    cantbuy locked off = on ne peut pas l'acheter et il est verouillé et on ne l'affiche pas
*/
function className(){
    for (let i = 0; i < batiments.length; i++){
        let className = '';
        let classNamePrix = '';
        if (nbCookies >= batiments[i][1]){className,classNamePrix = 'canbuy';}
        else {className,classNamePrix = 'cantbuy';}
        if (nbCookiesTotal >= batiments[i][4]){className = className + ' unlocked';}
        else {className = className + ' locked';}
        document.getElementById(batiments[i][0]).className = className;
        document.getElementById('Prix'+batiments[i][0]).className = classNamePrix;
    }
}
setInterval(className, 100);

// fonctions principales

function reset(){
    if (confirm("Êtes-vous sûr de vouloir recommencer ? \nCela supprimera toutes vos données de jeu.")){
        for (let i = 0; i < batiments.length; i++){ 
            document.getElementById(batiments[i][0]).remove(); //on supprime les divs des batiments un par un
        }
        nbCookies = 0;  //on reset toutes les variables
        nbCookiesTotal = 0;
        cps = 0;
        batiments = [
            ['Cursor', 15, 0.1, 0, 15, "Clique Automatiquement toutes les 10 secondes"],
            ['Canard', 100, 1, 0, 100, "Vive le Duck Tateur qui nous offre ses précieux cookies"],
            ['Chat', 1100, 8, 0, 1100, "Le vrai meilleur ami de l'homme"],
            ['Chien', 12000, 47, 0, 12000, "The annoying dog gives you 47 cookies per second "],
            ['Usine', 130000, 260, 0, 130000, "Produit de nombreux cookies pour son propriétaire"],
            ['Banque', 1400000, 1400, 0, 1400000, "Génère des cookies avec les intérêts"],
            ['Fusée', 20000000, 7800, 0, 20000000, "Ramène des cookies depuis l'espace"],
            ['Lune', 330000000, 44000, 0, 330000000, "Ses habitants vous offrent gentillement leurs cookies"],
            ['Station Spatiale', 5100000000, 260000, 0, 5100000000, "Récupère des cookies dans tout l'univers"],
            ['Trou Noir', 75000000000, 1600000, 0, 75000000000, "On raconte que ses cookies viennent d'une autre dimension"],
        ];
        date = 0
        for (i=0; i < batiments.length; i++) {affichageBatiment(i);}
    }
}

function clique(){
    nbCookies = nbCookies + cpc;
    nbCookiesTotal = nbCookiesTotal + cpc;
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
    nbCookiesTotal = Math.round((nbCookiesTotal + cps)*10) / 10;
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
    setCookie('cookie5', nbCookiesTotal, 3);
}

setInterval(sendCookie, 500);
