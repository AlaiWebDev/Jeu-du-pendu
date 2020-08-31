let words7letter = ["EPAULES", "DENTELE", "CEREALE", "LETALES", "EPISODE", "CERISES", "LIBERTE", "ETOILES", "GLAUQUE", "HAMECON", "VANILLE", "VAUTOUR", "BRULURE", "CRAPULE", "CERTAIN", "TORNADE", "TRAITRE", "SCANNER", "TIEDEUR", "SAUVAGE", "TAMBOUR", "RAVIOLI", "CERVIDE", "RACINES", "PYTHONS"];
let myAlphabet = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
let nbRandom = getRandomInt(0, words7letter.length - 1);
let wordMystery = words7letter[nbRandom];
let tabMystery = []; //tableau du mot mystère
let tabResult = ["-", "-", "-", "-", "-", "-", "-"]; //tableau résultat pour placer les lettres trouvées
tabMystery = wordMystery.split(""); //On transforme le mot mystère en tableau
let nbEssai = 8; //On initialise le nombre d'essais(max 10)
let failed = 0;
let found = false;
let test = document.querySelectorAll(".btn");
let myVar = myAlphabet.split("");
let win = new Audio("./assets/media/applause.mp3");
let loose = new Audio("./assets/media/cloche.mp3");
console.log(wordMystery);
for (let i = 0; i < myVar.length; i++) {
    document.getElementById("alphabet").innerHTML += "<button class=" + myVar[i] + " btn onclick=" + "compare('" + myVar[i] + "')>" + myVar[i] + "</button>\n";
};
document.getElementById("replay").addEventListener("click", function () { window.location.reload() })
document.addEventListener("keydown", (event) => {
    let keyPressed = event.key;
    keyPressed = keyPressed.toUpperCase();
    if (myAlphabet.indexOf(keyPressed) !== -1) {
        removeFocus();
        compare(keyPressed);
    };
})
function removeFocus() {
    document.activeElement.blur();
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
function compare(letter) {
    let choice = document.getElementsByClassName(letter);
    choice[0].disabled = true;
    choice[0].classList.add(letter, "disabled");
    console.log(nbEssai);
    for (let i = 0; i <= tabMystery.length - 1; i++) {
        //On entre dans la boucle qui va tester si la lettre se trouve dans le mot mystère
        if ((letter === tabMystery[i]) && (nbEssai > 0)) //Teste saisie ok et encore des essais
        {
            found = true;
            tabResult[i] = tabMystery[i];
            //On remplit notre tableau pour afficher la progression
            document.getElementById("progress").value = tabResult.join("");
            //On affiche la progression
            if (tabMystery.join("") == tabResult.join(""))
            //On vérifie que tout le mot n'a pas été trouvé
            {
                winfunc();
                msgWin();
                return;
            }
        } else {
            if (nbEssai <= 1 && found !== true && (i === (tabMystery.length - 1))) {//nb d'essai dépassé
                loosefunc();
                msgFail();
                return;
            }
        }
    }
    switch (found) {
        case false: removeTry();
            break;
        case true: found = false;
            break;
        default: console.log("valeur de found incorrecte :" + found);
    }
}
function removeTry() {
    //On a grillé 1 essai
    document.getElementById("image").style.display = "block";
    failed = failed + 1;
    document.getElementById("image").innerHTML = `<img src ="./assets/img/pendu${failed}.png">`;
    nbEssai -= 1;
    document.getElementById("trialCount").innerHTML = nbEssai;
}
function msgWin() {
    //On félicite et on affiche le mot mystère et on sort de la fonction
    document.getElementById("replay").classList.add("display");
    document.getElementById("resultat").innerHTML = " Bravo. Le mot était bien : " + tabResult.join(
        "");
    document.getElementById("message").className = "green";
    document.getElementById("linkModal").click();
}
function msgFail() {
    //Perdu. On affiche la solution et on sort de la fonction
    document.getElementById("replay").classList.add("display");
    document.getElementById("resultat").innerHTML = " Désolé. Vous avez perdu. Le mot était :" +
        tabMystery.join("");
    document.getElementById("trialCount").innerHTML = "0";
    document.getElementById("message").className = "red";
    document.getElementById("message").innerText = "DESOLE VOUS AVEZ PERDU";
    document.getElementById("linkModal").click();
}

function winfunc() {
    setTimeout(pause, 3000);
    win.volume = 0.3;
    win.play();
}
function loosefunc() {
    setTimeout(pause, 3000);
    loose.volume = 0.3;
    loose.play();
}
function pause() {
    loose.pause();
    win.pause();
}
