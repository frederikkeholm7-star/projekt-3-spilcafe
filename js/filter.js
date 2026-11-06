"use strict";

// FILTER ELEMENTER SKAL FINDES FRA HTML
const playerInputs = document.querySelectorAll('input[name="players"]'); //FINDER ALLE PLAYERS KNAPPER 
const playingTime = document.querySelector("#playing-time"); //FINDER SLIDEREN, SOM ALLEREDE ER I HTML
const timeValue = document.querySelector("#time-value"); //FINDER TEKSTEN OVER SLIDEREN, SOM ALLEREDE ER I HTML
const categoryInputs = document.querySelectorAll('input[name="category"]'); //FINDER ALLE CHECKBOXES
const applyFilters = document.querySelector("#apply-filters"); //FINDER SHOW GAMES KNAPPEN 

