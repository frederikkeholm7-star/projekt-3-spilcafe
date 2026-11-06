"use strict";
// Fælles navne, som gruppen har aftalt:
// displayGames(list) viser spilkortene i game-list
// showGameDialog(id) åbner dialogen for ét spil
// Classes på kortene: game-card, game-image, game-title, game-meta

// DOM-referencer til spilliste, dialog og filterpanel
const gameList = document.getElementById("game-list");
const gameDialog = document.getElementById("game-dialog");
const dialogCloseButton = document.getElementById("dialog-close");
const filterButton = document.getElementById("filter-toggle");
const filterPanel = document.getElementById("filter-panel");
const filterPanelCloseButton = document.getElementById("filter-close");
const darkOverlay = document.getElementById("overlay");

// Genererer et spilkort for hvert spil i listen og indsætter det i spillisten
function displayGames(list) {
  // Tømmer spillisten, så tidligere viste kort fjernes
  gameList.innerHTML = "";

  // Gennemløber listen og opretter et kort pr. spil
  list.forEach((game) => {
    // Opretter kortets container og tildeler class
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";

    // Indsætter billede, titel, antal spillere og spilletid
    gameCard.innerHTML = `
    <img src="${game.image}" alt="${game.title}"
    class="game-image">
        <h3 class="game-title">${game.title}</h3>

        <div class="game-meta">
            <span class="players">${game.minPlayers}-${game.maxPlayers} Players</span>

            <span class="time">${game.minTime}-${game.maxTime} min</span>
        </div>
    `;

    // Åbner dialogen ved klik og tilføjer kortet til spillisten
    gameCard.addEventListener("click", () => showGameDialog(game.id));
    gameList.appendChild(gameCard);
  });
}

// Finder spillet ud fra id, udfylder dialogen og åbner den som modal
function showGameDialog(id) {
  // Finder spillet med det valgte id
  const game = games.find((game) => game.id === id);

  // Udfylder dialogens felter med spillets data
  document.getElementById("dialog-title").textContent = game.title;
  document.getElementById("dialog-description").textContent = game.description;
  document.getElementById("dialog-players").textContent =
    `${game.minPlayers}-${game.maxPlayers} Players`;
  document.getElementById("dialog-time").textContent =
    `${game.minTime}-${game.maxTime} min`;
  document.getElementById("dialog-category").textContent =
    game.categories.join(", ");
  document.getElementById("dialog-difficulty").textContent =
    `${game.difficulty}/5`;
  document.getElementById("dialog-image").src = game.image;
  document.getElementById("dialog-image").alt = game.title;

  // Åbner dialogen som modal
  gameDialog.showModal();
}

// Lukker dialogen ved klik på Close
dialogCloseButton.addEventListener("click", () => gameDialog.close());

// Åbner og lukker filterpanelet og det mørke lag
function toggleFilterPanel() {
  filterPanel.classList.toggle("active");
  darkOverlay.classList.toggle("active");
}

// Lukker filterpanelet og det mørke lag
function closeFilterPanel() {
  filterPanel.classList.remove("active");
  darkOverlay.classList.remove("active");
}

// Kobler filterknappen, krydset og det mørke lag til panelet
filterButton.addEventListener("click", toggleFilterPanel);
filterPanelCloseButton.addEventListener("click", closeFilterPanel);
darkOverlay.addEventListener("click", closeFilterPanel);

// Viser alle spil, når DOM'en er indlæst
window.addEventListener("DOMContentLoaded", () => {
  displayGames(games);
});
