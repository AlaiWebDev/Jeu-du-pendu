class Pendu {
  triedLetters = "";
  word = "";
  pics = `
+---+
    |
    |
    |
    |
    |
=========
***    
+---+
|   |
    |
    |
    |
    |
=========
***
+---+
|   |
O   |
    |
    |
    |
=========
***
+---+
|   |
O   |
|   |
    |
    |
=========
***
+---+
|   |
O   |
/|   |
    |
    |
=========
***
+---+
|   |
O   |
/|\\  |
    |
    |
=========
***
+---+
|   |
O   |
/|\\  |
/    |
    |
=========
***
+---+
|   |
O   |
/|\\  |
/ \\  |
    |
=========`;

  words =
    "ACAJOU, AGNEAU, ALARME, ANANAS, ANGORA, ANIMAL, ARCADE, AVIRON, AZIMUT, BABINE, BALADE, BONZAI, BASSON, BILLET, BOUCHE, BOUCLE, BRONZE, CABANE, CAIMAN, CLOCHE, CHEQUE, CIRAGE, COCCYX, CRAYON, GARAGE, GOSPEL, GOULOT, GRAMME, GRELOT, GUENON, HOCHET, HORMIS, HUMOUR, HURLER, JARGON, LIMITE, LIONNE, MENTHE, OISEAU, PODIUM, POULPE, POUMON, PUZZLE, QUARTZ, RAPIDE, SEISME, TETINE, TOMATE, WALABI, WHISKY, ZIPPER, ABRITER, BALLAST, BARYTON, BASSINE, BATAVIA, BILLARD, BRETZEL, CITHARE, CHARIOT, CLAIRON, CORBEAU, CORTEGE, CRAPAUD, CYMBALE, DENTIER, DJEMBE, DRAPEAU, EXEMPLE, FOURMIS, GRANDIR, ICEBERG, JAVELOT, JOCKEY, JOURNAL, JOURNEE, JOUXTER, LOSANGE, MACADAM, MONDIAL, NOTABLE, OXYGENE, PANIQUE, PETROLE, POTERIE, POUVOIR, RENEGAT, SCOOTER, SENTEUR, SIFFLET, SPIRALE, SUCETTE, STROPHE, TONNEAU, TROUSSE, TUNIQUE, UKULELE, VAUTOUR, ZOZOTER, AQUARIUM, ARAIGNEE, ARBALETE, ARCHIPEL, BANQUISE, BATTERIE, BROCANTE, BROUHAHA, CAPELINE, CLAVECIN, CLOPORTE, DEBUTANT, DIAPASON, GANGSTER, GOTHIQUE, HAUTBOIS, HERISSON, LOGICIEL, OBJECTIF, PARANOIA, PARCOURS, PASTICHE, QUESTION, QUETSCHE, SCARABEE, SCORPION, SYMPTOME, TABOURET, TOMAHAWK, TOUJOURS, TOURISME, TRIANGLE, UTOPIQUE, ZEPPELIN, ACCORDEON, ASCENSEUR, ASCENSION, ASEPTISER, AUTOROUTE, AVALANCHE, BALALAIKA, BILBOQUET, BOURRICOT, BRILLANCE, CABRIOLET, CONTRARIO, CORNEMUSE, DANGEREUX, EPLUCHAGE, FEODALITE, FORTERESSE, GONDOLIER, GRAPHIQUE, HOROSCOPE, INTREPIDE, KLAXONNER, MASCARADE, METAPHORE, NARRATEUR, PERIPETIE, POPULAIRE, PRINTEMPS, QUEMANDER, TAMBOURIN, VESTIAIRE, XYLOPHONE, ACROSTICHE, APOCALYPSE, ATTRACTION, AVENTURIER, BOUILLOTTE, CITROUILLE, CONTROVERSE, COQUELICOT, DISSIMULER, FLIBUSTIER, FORESTIERE, GRENOUILLE, IMPOSSIBLE, LABYRINTHE, MAHARADJAH, PRUDEMMENT, QUADRICEPS, SOLILOQUER, SUBJECTIF";

  constructor() {
    let buttons = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
      buttons += "<button>" + letter + "</button>";
    });

    document.querySelector(".keyboard").innerHTML += buttons;
    document.querySelector(".keyboard").addEventListener("click", (event) => {
      this.clickLetter(event);
    });
    document.querySelector(".replay").addEventListener("click", (event) => {
      this.start();
    });
    this.words = this.words.split(", ");
    this.pics = this.pics.split("***");

    this.start();
  }
  start() {
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    this.numberOfTries = 0;
    this.numberOfErrors = 0;
    this.triedLetters = "";
    document.getElementsByClassName("word")[0].innerHTML = "_".repeat(
      this.word.length
    );
    //document.getElementsByClassName("gallows")[0].innerHTML = this.pics[0];
    document.querySelector(".gallows").innerHTML = this.pics[0];

    document.querySelectorAll(".keyboard button").forEach((elt) => {
      elt.disabled = false;
    });

    // document.querySelector(".replay").className = "hidden";
    document.querySelector(".replay").classList.add("hidden");
    document.querySelector("p.message").innerHTML = "";
  }
  clickLetter(event) {
    console.log(this);
    if (event.target.tagName !== "BUTTON") return;

    this.triedLetters += event.target.innerText;
    event.target.disabled = true;
    let result = "";
    for (let i = 0; i < this.word.length; i++) {
      if (this.triedLetters.indexOf(this.word[i]) !== -1) {
        // found
        result += this.word[i];
      } else {
        // not found
        result += "_";
      }

      document.getElementsByClassName("word")[0].innerHTML = result;
    }

    if (this.word.indexOf(event.target.innerText) === -1) {
      this.numberOfErrors += 1;

      // On a PERDU
      if (this.numberOfErrors === this.pics.length - 1) {
        //alert("vous êtes mort Cowboy. Le mot à trouver était " + this.word)
        document.querySelector(
          "p.message"
        ).innerHTML = `Vous êtes mort Cowboy. Le mot à trouver était ${this.word} `;
        document.querySelector(".replay").classList.remove("hidden");

        return;
      }

      document.querySelector(".gallows").innerHTML = this.pics[
        this.numberOfErrors
      ];
    }
    console.log(result, this.word);
    if (result === this.word) {
      //alert("vous êtes mort Cowboy. Le mot à trouver était " + this.word)
      document.querySelector(
        "p.message"
      ).innerHTML = `Bravo Cowboy, Tu as gagné en faisant ${this.numberOfErrors} erreurs.`;
      document.querySelector(".replay").classList.remove("hidden");

      return;
    }
  }
}

new Pendu();
