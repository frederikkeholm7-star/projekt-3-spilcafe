"use strict";
// Shared names (agreed by the group)
// displayGames(list) - shows game cards in #game-list
// showGameDialog(id) - opens the dialog for one game
// Card classes: game-card, game-image, game-title, game-meta

const gameList = document.getElementById("game-list");
const gameDialog = document.getElementById("game-dialog");
const dialogCloseButton = document.getElementById("dialog-close");
const filterButton = document.getElementById("filter-toggle");
const filterPanel = document.getElementById("filter-panel");
const filterPanelCloseButton = document.getElementById("filter-close");
const darkOverlay = document.getElementById("overlay");

function displayGames(list) {
  gameList.innerHTML = "";

  list.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";

    gameCard.innerHTML = `
    <img src="${game.image}" alt="${game.title}"
    class="game-image">
        <h3 class="game-title">${game.title}</h3>

        <div class="game-meta">
            <span class="players">${game.minPlayers}-${game.maxPlayers} Players</span>

            <span class="time">${game.minTime}-${game.maxTime} min</span>
        </div>
    `;
    gameCard.addEventListener("click", () => showGameDialog(game.id));
    gameList.appendChild(gameCard);
  });
}

function showGameDialog(id) {
  const game = games.find((game) => game.id === id);
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

  gameDialog.showModal();
}
dialogCloseButton.addEventListener("click", () => gameDialog.close());

window.addEventListener("DOMContentLoaded", () => {
  displayGames(games);
});
