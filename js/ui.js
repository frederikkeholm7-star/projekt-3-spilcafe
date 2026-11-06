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
  });
}
