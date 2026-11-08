"use strict";

// FILTER ELEMENTER SKAL FINDES FRA HTML
const playerInputs = document.querySelectorAll('input[name="players"]'); //FINDER ALLE PLAYERS KNAPPER
const playingTime = document.querySelector("#playing-time"); //FINDER SLIDEREN, SOM ALLEREDE ER I HTML
const timeValue = document.querySelector("#time-value"); //FINDER TEKSTEN OVER SLIDEREN, SOM ALLEREDE ER I HTML
const categoryInputs = document.querySelectorAll('input[name="category"]'); //FINDER ALLE CHECKBOXES
const applyFilters = document.querySelector("#apply-filters"); //FINDER SHOW GAMES KNAPPEN
const resetFilters = document.querySelector("#reset-filters"); // FINDER RESET-KNAPPEN FRA HTML
const sortSelect = document.querySelector("#predefined-search"); // FINDER SORTERINGSMENUEN FRA HTML

let currentGames = [...games]; // GEMMER DE SPIL, DER AKTUELT VISES

// FILTRERING AF BRÆTSPIL
function filterGames() {
  // STARTER MED DE SPIL, DER PASSER TIL SØGNINGEN (SE SEARCH.JS)
  let filteredGames = searchGames([...games]);

  // FILTRER EFTER ANTAL SPILLERE
  const selectedPlayers = document.querySelector(
    'input[name="players"]:checked',
  );

  if (selectedPlayers) {
    const players = Number(selectedPlayers.value);

    filteredGames = filteredGames.filter(
      (game) => game.minPlayers <= players && game.maxPlayers >= players,
    );
  }

  // FILTRER EFTER SPILLETID
  const selectedTime = Number(playingTime.value);

  if (selectedTime < 120) {
    filteredGames = filteredGames.filter(
      (game) => game.maxTime <= selectedTime,
    );
  }

  // FIND DE VALGTE KATEGORIER
  const categories = Array.from(
    document.querySelectorAll('input[name="category"]:checked'), //FINDER ALLE KATEGORI-CHECHBOXES, SOM BRUGEREN HAR VALGT
  ).map((cb) => cb.value);

  // FILTRER EFTER KATEGORI
  if (categories.length > 0) {
    //UNDERSØGER OM BRUGEREN HAR VALGT MINDST 1 KATEGORI
    filteredGames = filteredGames.filter(
      (
        game, //GENNEMGÅR ALLE SPILLENE OG BEHOLDER KUN DEM, DER PASSER TIL DE VALGTE KATEGORIER
      ) =>
        game.categories.some(
          (
            category, //ET SPIL KAN HAVE FLERE KATEGORIER I DATA.JS
          ) => categories.includes(category), //UNDERSØGER OM KATEGORIEN FINDES BLANDT DE VALGTE KATEGORIER
        ),
    );
  }

  // GEMMER DE FILTREREDE SPIL
  currentGames = filteredGames;

  // SORTERER OG VISER DE FILTREREDE SPIL
  sortGames();
}

// OPDATER TEKSTEN OVER SLIDEREN
playingTime.addEventListener("input", () => {
  if (Number(playingTime.value) === 120) {
    timeValue.textContent = "120+ min";
  } else {
    timeValue.textContent = `Up to ${playingTime.value} min`;
  }
});

//NU SKAL DER TILFØJES EN EVENTLISTENER TIL "SHOW GAMES" KNAPPEN, SÅ FILTRERINGEN KØRES NÅR BRUGEREN TRYKKER PÅ KNAPPEN
// SHOW GAMES KNAPPEN
applyFilters.addEventListener("click", () => {
  filterGames();
});

// RESET FILTERS
resetFilters.addEventListener("click", () => {
  // FJERN VALGTE SPILLERE
  playerInputs.forEach((input) => {
    input.checked = false;
  });

  // FJERN VALGTE KATEGORIER
  categoryInputs.forEach((input) => {
    input.checked = false;
  });

  // NULSTIL SPILLETID
  playingTime.value = 60;
  timeValue.textContent = "Up to 60 min";

  // NULSTIL SORTERINGSMENUEN
  sortSelect.value = "";

  // NULSTIL LISTEN MED SPIL
  currentGames = [...games];

  // VIS ALLE SPIL IGEN
  displayGames(currentGames);
});

// SORTERER DEN AKTUELLE LISTE MED SPIL
function sortGames() {
  // LAVER EN KOPI AF DE FILTREREDE SPIL
  let sortedGames = [...currentGames];

  // SORTERER SPILLENE ALFABETISK
  if (sortSelect.value === "name") {
    sortedGames.sort((a, b) => a.title.localeCompare(b.title));
  }

  // SORTERER EFTER SPILLETID (KORTESTE FØRST)
  else if (sortSelect.value === "time") {
    sortedGames.sort((a, b) => a.minTime - b.minTime);
  }

  // SORTERER EFTER SVÆRHEDSGRAD (NEMMESTE FØRST)
  else if (sortSelect.value === "difficulty") {
    sortedGames.sort((a, b) => a.difficulty - b.difficulty);
  }

  // SORTERER EFTER ANTAL SPILLERE (FÆRREST FØRST)
  else if (sortSelect.value === "players") {
    sortedGames.sort((a, b) => a.minPlayers - b.minPlayers);
  }

  // VISER SPILLENE I DEN NYE RÆKKEFØLGE
  displayGames(sortedGames);
}

// KØRER SORTERING NÅR BRUGEREN VÆLGER I MENUEN
sortSelect.addEventListener("change", () => {
  sortGames();
});
