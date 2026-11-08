"use strict";

const searchInput = document.getElementById("search-input");

function searchGames(list) {
  const searchText = searchInput.value.toLowerCase().trim();
  if (searchText === "") {
    return list;
  }
  return list.filter((game) => game.title.toLowerCase().includes(searchText));
}
// Opdaterer listen, mens brugeren skriver
searchInput.addEventListener("input, filterGames");
