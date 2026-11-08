"use strict";

// FINDER SØGEFELTET FRA HTML
const searchInput = document.getElementById("search-input");

// SØGNING AF BRÆTSPIL
function searchGames(list) {
  // GØR SØGETEKSTEN TIL SMÅ BOGSTAVER OG FJERNER MELLEMRUM I ENDERNE
  const searchText = searchInput.value.toLowerCase().trim();
  // HVIS SØGEFELTET ER TOMT, VISES ALLE SPIL
  if (searchText === "") {
    return list;
  }
  // BEHOLDER KUN DE SPIL, HVOR TITLEN INDEHOLDER SØGETEKSTEN
  return list.filter((game) => game.title.toLowerCase().includes(searchText));
}

// OPDATERER LISTEN, MENS BRUGEREN SKRIVER
searchInput.addEventListener("input", filterGames);
