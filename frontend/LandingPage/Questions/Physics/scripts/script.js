var audioObj = new Audio("sound.mp3");
// Set starting life totals here
var playerLife = 10;
var questLife = 10;

// Message when the game is over
var questWinnerMessage = "Game over: Now you know the power of the dark side!";
var playerWinnerMessage = "You defeated the dark side!";


// Game code starts here
var playerStartLife = parseInt(playerLife);
var questStartLife = parseInt(questLife);

var roundFinished = false;
var cardSelected = false;

updateScores();

document.querySelector(".game-board").classList.add("before-game");

var allCardElements = document.querySelectorAll(".card");

// Adds click handler to all player card elements
for(var i = 0; i < allCardElements.length; i++) {
  var card = allCardElements[i];
  if(card.classList.contains("player-card")) {
    card.addEventListener("click",function(e){
      cardClicked(this);
    });
  }
}


// When a card is clicked
function cardClicked(cardEl) {

  if(cardSelected) { return; }
  cardSelected = true;

  cardEl.classList.add("played-card");

  document.querySelector(".game-board").classList.add("card-selected");

  // Wait 500ms to reveal the quest power
  setTimeout(function(){
    revealquestPower();
  },500)

  // Wait 750ms to reveal the player power
  setTimeout(function(){
    revealPlayerPower();
  },700)

  // Wait 1250ms to compare the card scoers
  setTimeout(function(){
    compareCards();
  }, 700);
}

// // Shows the power level on the player card
// function revealPlayerPower(){
//   var playerCard = document.querySelector(".played-card");
//   playerCard.classList.add("reveal-power");
// }

// // Shows the power level on the quest card
// function revealquestPower(){
//   var questCard = document.querySelector(".quest-card");
//   questCard.classList.add("reveal-power");
// }

function compareCards(){
  var playerCard = document.querySelector(".played-card");
  var playerPowerEl = playerCard.querySelector(".power");

  var questCard = document.querySelector(".quest-card");
  var questPowerEl = questCard.querySelector(".power");

  var playerPower = parseInt(playerPowerEl.innerHTML);
  var questPower = parseInt(questPowerEl.innerHTML);

  var powerDifference = playerPower - questPower;

  if (powerDifference < 0) {
    // Player Loses
    playerLife = playerLife + powerDifference;
    questCard.classList.add("better-card");
    playerCard.classList.add("worse-card");
    document.querySelector(".player-stats .thumbnail").classList.add("ouch");
  } else if (powerDifference > 0) {
    // Player Wins
    questLife = questLife - powerDifference;
    playerCard.classList.add("better-card");
    questCard.classList.add("worse-card");
    document.querySelector(".quest-stats .thumbnail").classList.add("ouch");
  } else {
    playerCard.classList.add("tie-card");
    questCard.classList.add("tie-card");
  }

  updateScores();

  if(playerLife <= 0) {
    gameOver("Dark side");
  } else if (questLife <= 0){
    gameOver("Player")
  }

  roundFinished = true;

  document.querySelector("button.next-turn").removeAttribute("disabled");
}

// Shows the winner message
function gameOver(winner) {
  audioObj.pause();
  document.querySelector(".game-board").classList.add("game-over");
  document.querySelector(".winner-section").style.display = "flex";
  document.querySelector(".winner-section").classList.remove("player-color");
  document.querySelector(".winner-section").classList.remove("quest-color");

  if(winner == "Dark side") {
    let evilAudio = new Audio("evil-laugh.mp3");
    evilAudio.play();
    document.querySelector(".winner-message").innerHTML = questWinnerMessage;
    document.querySelector(".winner-section").classList.add("quest-color");
  } else {
    let ohNoAudio = new Audio("Oh-no-sound-effect.mp3");
    ohNoAudio.play();
    document.querySelector(".winner-message").innerHTML = playerWinnerMessage;
    document.querySelector(".winner-section").classList.add("player-color");
  }
}


// Starts the game
function startGame() {
  audioObj.loop = true;
  audioObj.addEventListener("canplaythrough", event => {
    /* the audio is now playable; play it if permissions allow */
    myAudioElement.play();
  });
  audioObj.play();
  document.querySelector(".game-board").classList.remove("before-game");
  document.querySelector(".game-board").classList.add("during-game");
  playTurn();
}


// Start the game over from scratch
function restartGame(){
  document.querySelector(".game-board").classList.remove("game-over");
  document.querySelector(".game-board").classList.remove("during-game");
  document.querySelector(".game-board").classList.add("before-game");

  document.querySelector(".winner-section").style.display = "none";
  document.querySelector(".quest-card").style.display = "none";

  var cards = allCardElements;

  document.querySelector("button").removeAttribute("disabled");

  for(var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  playerLife = playerStartLife;
  questLife = questStartLife;

  roundFinished = true;
  cardSelected = false;

  updateScores();
}

// Updates the displayed life bar and life totals
function updateScores(){

  // Update life totals for each player
  document.querySelector(".player-stats .life-total").innerHTML = playerLife;
  document.querySelector(".quest-stats .life-total").innerHTML = questLife;

  // Update the player lifebar
  var playerPercent = playerLife / playerStartLife * 100;
  if (playerPercent < 0) {
    playerPercent = 0;
  }
  document.querySelector(".player-stats .life-left").style.height =  playerPercent + "%";

  // Update the quest lifebar
  var questPercent = questLife / questStartLife * 100
  if (questPercent < 0) {
    questPercent = 0;
  }
  document.querySelector(".quest-stats .life-left").style.height =  questPercent + "%";
}


// Shuffles an array
function shuffleArray(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}


// Plays one turn of the game
function playTurn() {

  roundFinished = true;
  cardSelected = false;

  document.querySelector(".game-board").classList.remove("card-selected");

  // Remove "ouch" class from player and quest thumbnails
  document.querySelector(".quest-stats .thumbnail").classList.remove("ouch");
  document.querySelector(".player-stats .thumbnail").classList.remove("ouch");

  // Hides the "next turn" button, will show again when turn is over
  document.querySelector(".next-turn").setAttribute("disabled", "true");

  for(var i = 0; i < allCardElements.length; i++) {
    var card = allCardElements[i];
    card.classList.remove("showCard");
  }

  setTimeout(function(){
    revealCards();
  }, 500);
}

function revealCards(){


  var j = 0;
  var cardIndexes = shuffleArray([0, 1, 2]);

  // Get scenario cards
  console.log("scenarios.length == " + scenarios.length);

  var randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
  var scenario = scenarios[randomScenarioIndex];
  console.log(scenario.questCard.description);

  scenarios.splice(randomScenarioIndex, 1);

  console.log("scenarios.length after splice == " + scenarios.length);

  var questCard = scenario.questCard;
  var questCardEl = document.querySelector(".quest-area .card");

  // Contents of the player cards
  var playerCards = scenario.playerCards;

  for(var i = 0; i < allCardElements.length; i++) {
    var card = allCardElements[i];

    card.classList.remove("worse-card");
    card.classList.remove("better-card");
    card.classList.remove("played-card");
    card.classList.remove("tie-card");
    card.classList.remove("prepared");
    card.classList.remove("reveal-power");

    // Display the payer card details
    if(card.classList.contains("player-card")) {
      card.querySelector(".text").innerHTML = playerCards[cardIndexes[j]].description;
      card.querySelector(".power").innerHTML = playerCards[cardIndexes[j]].power;
      j++;
    }

    // Reveal each card one by one with a delay of 100ms
    setTimeout(function(card, j){
      return function() {
        card.classList.remove("prepared");
        card.style.display = "block";
        card.classList.add("showCard");
      }
    }(card,i), parseInt(i+1) * 200);
  }

  // Display the quest card
  questCardEl.querySelector(".text").innerHTML = questCard.description;
  questCardEl.querySelector(".power").innerHTML = questCard.power;
}
