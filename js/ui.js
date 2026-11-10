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

// SKRIVER ÉT TAL, NÅR MIN OG MAX ER ENS, FX "2 Players" I STEDET FOR "2-2 Players"
function formatPlayers(game) {
  if (game.minPlayers === game.maxPlayers) {
    return `${game.minPlayers} Players`;
  }
  return `${game.minPlayers}-${game.maxPlayers} Players`;
}

// SKRIVER ÉT TAL, NÅR MIN OG MAX ER ENS, FX "60 min" I STEDET FOR "60-60 min"
function formatTime(game) {
  if (game.minTime === game.maxTime) {
    return `${game.minTime} min`;
  }
  return `${game.minTime}-${game.maxTime} min`;
}
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
            <span class="players">${formatPlayers(game)}</span>

            <span class="time">${formatTime(game)}</span>
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
  document.getElementById("dialog-players").textContent = formatPlayers(game);
  document.getElementById("dialog-time").textContent = formatTime(game);
  document.getElementById("dialog-category").textContent = game.categories
    .join(", ")
    .replaceAll("-", " ");
  document.getElementById("dialog-difficulty").textContent =
    `${game.difficulty}/5`;
  document.getElementById("dialog-age").textContent = `${game.age}+`;
  document.getElementById("dialog-image").src = game.image;
  document.getElementById("dialog-image").alt = game.title;
  document.getElementById("dialog-winning").textContent = game.winning;

  // Indsætter spillets regler som punkter i listen
  const rulesList = document.getElementById("dialog-rules");
  rulesList.innerHTML = "";
  game.rules.forEach((rule) => {
    rulesList.innerHTML += `<li>${rule}</li>`;
  });

  // SCROLLER DIALOGEN TIL TOPPEN, SÅ DEN ALTID STARTER VED BILLEDET
  gameDialog.showModal();
  gameDialog.scrollTop = 0;
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

// Lukker filterpanelet med Escape-tasten
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeFilterPanel();
  }
});

// Viser alle spil, når DOM'en er indlæst
window.addEventListener("DOMContentLoaded", () => {
  displayGames(games);
});
