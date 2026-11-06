"use strict";

// FILTER ELEMENTER SKAL FINDES FRA HTML
const playerInputs = document.querySelectorAll('input[name="players"]'); //FINDER ALLE PLAYERS KNAPPER 
const playingTime = document.querySelector("#playing-time"); //FINDER SLIDEREN, SOM ALLEREDE ER I HTML
const timeValue = document.querySelector("#time-value"); //FINDER TEKSTEN OVER SLIDEREN, SOM ALLEREDE ER I HTML
const categoryInputs = document.querySelectorAll('input[name="category"]'); //FINDER ALLE CHECKBOXES
const applyFilters = document.querySelector("#apply-filters"); //FINDER SHOW GAMES KNAPPEN 

    // FILTRERING AF BRÆTSPIL
    function filtrerSpil() {

    // LAVER EN KOPI AF ALLE SPILLENE FRA DATA.JS
    let filteredGames = [...games];

    // FILTRER EFTER ANTAL SPILLERE
    const selectedPlayers = document.querySelector('input[name="players"]:checked');

    if (selectedPlayers) {
        const players = Number(selectedPlayers.value);

        filteredGames = filteredGames.filter(game =>
            game.minPlayers <= players && game.maxPlayers >= players
        );
    }

    // FILTRER EFTER SPILLETID
    const selectedTime = Number(playingTime.value);

    if (selectedTime < 120) {
        filteredGames = filteredGames.filter(game =>
            game.minTime <= selectedTime
        );
    }

    // VISER SPILLENE VED HJÆLP AF FUNKTIONEN FRA UI.JS
    displayGames(filteredGames);
    }

    // OPDATER TEKSTEN OVER SLIDEREN
    playingTime.addEventListener("input", () => {
    timeValue.textContent = `Up to ${playingTime.value} min`;
    });

     // FIND DE VALGTE KATEGORIER
    const categories = Array.from(
        document.querySelectorAll('input[name="category"]:checked') //FINDER ALLE KATEGORI-CHECHBOXES, SOM BRUGEREN HAR VALGT
    ).map(cb => cb.value);

     // FILTRER EFTER KATEGORI
    if (categories.length > 0) { //UNDERSØGER OM BRUGEREN HAR VALGT MINDST 1 KATEGORI
        filteredGames = filteredGames.filter(game => //GENNEMGÅR ALLE SPILLENE OG BEHOLDER KUN DEM, DER PASSER TIL DE VALGTE KATEGORIER
            game.categories.some(category => //ET SPIL KAN HAVE FLERE KATEGORIER I DATA.JS
                categories.includes(category) //UNDERSØGER OM KATEGORIEN FINDES BLANDT DE VALGTE KATEGORIER
            )
        );
    }