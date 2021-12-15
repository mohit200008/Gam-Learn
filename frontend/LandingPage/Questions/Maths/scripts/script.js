const auth = firebase.auth();

var playerLife = 10;
var questLife = 10;
var correctAnswers = 0;

var questWinnerMessage = "Game over: Now you know the power of the dark side!";
var playerWinnerMessage = "You defeated the dark side!";

var playerStartLife = parseInt(playerLife);
var questStartLife = parseInt(questLife);

var roundFinished = false;
var cardSelected = false;

updateScores();

document.querySelector(".game-board").classList.add("before-game");

var allCardElements = document.querySelectorAll(".card");

for (var i = 0; i < allCardElements.length; i++) {
  var card = allCardElements[i];
  if (card.classList.contains("player-card")) {
    card.addEventListener("click", function (e) {
      cardClicked(this);
    });
  }
}


function cardClicked(cardEl) {

  if (cardSelected) { return; }
  cardSelected = true;

  cardEl.classList.add("played-card");

  document.querySelector(".game-board").classList.add("card-selected");

  setTimeout(function () {
    revealquestPower();
  }, 500)

  setTimeout(function () {
    revealPlayerPower();
  }, 700)

  setTimeout(function () {
    compareCards();
  }, 700);
}


function compareCards() {
  var playerCard = document.querySelector(".played-card");
  var playerPowerEl = playerCard.querySelector(".power");

  var questCard = document.querySelector(".quest-card");
  var questPowerEl = questCard.querySelector(".power");

  var playerPower = parseInt(playerPowerEl.innerHTML);
  var questPower = parseInt(questPowerEl.innerHTML);

  var powerDifference = playerPower - questPower;

  if (powerDifference < 0) {
    playerLife = playerLife + powerDifference;
    questCard.classList.add("better-card");
    playerCard.classList.add("worse-card");
    document.querySelector(".player-stats .thumbnail").classList.add("ouch");
  } else if (powerDifference > 0) {
    correctAnswers++;
    questLife = questLife - powerDifference;
    playerCard.classList.add("better-card");
    questCard.classList.add("worse-card");
    document.querySelector(".quest-stats .thumbnail").classList.add("ouch");
  } else {
    playerCard.classList.add("tie-card");
    questCard.classList.add("tie-card");
  }

  updateScores();

  if (playerLife <= 0) {
    gameOver("Dark side");
  } else if (questLife <= 0) {
    gameOver("Player")
  }

  roundFinished = true;

  document.querySelector("button.next-turn").removeAttribute("disabled");
}

function gameOver(winner) {
  localStorage.setItem("maths-score", correctAnswers);
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("scores").add({
        email: user.email,
        subject: "maths",
        score: correctAnswers,
        date: new Date()
      }).then(() => {
        window.location.href = "/frontend/LandingPage/score.html";
      })
    } else {
      console.log("No user");
    }
  });

  audioObj.pause();
  document.querySelector(".game-board").classList.add("game-over");
  document.querySelector(".winner-section").style.display = "flex";
  document.querySelector(".winner-section").classList.remove("player-color");
  document.querySelector(".winner-section").classList.remove("quest-color");

  if (winner == "Dark side") {
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


function startGame() {
  document.querySelector(".game-board").classList.remove("before-game");
  document.querySelector(".game-board").classList.add("during-game");
  playTurn();
}


function restartGame() {
  document.querySelector(".game-board").classList.remove("game-over");
  document.querySelector(".game-board").classList.remove("during-game");
  document.querySelector(".game-board").classList.add("before-game");

  document.querySelector(".winner-section").style.display = "none";
  document.querySelector(".quest-card").style.display = "none";

  var cards = allCardElements;

  document.querySelector("button").removeAttribute("disabled");

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  playerLife = playerStartLife;
  questLife = questStartLife;

  roundFinished = true;
  cardSelected = false;

  updateScores();
}

function updateScores() {

  document.querySelector(".player-stats .life-total").innerHTML = playerLife;
  document.querySelector(".quest-stats .life-total").innerHTML = questLife;

  var playerPercent = playerLife / playerStartLife * 100;
  if (playerPercent < 0) {
    playerPercent = 0;
  }
  document.querySelector(".player-stats .life-left").style.height = playerPercent + "%";

  var questPercent = questLife / questStartLife * 100
  if (questPercent < 0) {
    questPercent = 0;
  }
  document.querySelector(".quest-stats .life-left").style.height = questPercent + "%";
}


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


function playTurn() {

  roundFinished = true;
  cardSelected = false;

  document.querySelector(".game-board").classList.remove("card-selected");
  document.querySelector(".quest-stats .thumbnail").classList.remove("ouch");
  document.querySelector(".player-stats .thumbnail").classList.remove("ouch");
  document.querySelector(".next-turn").setAttribute("disabled", "true");

  for (var i = 0; i < allCardElements.length; i++) {
    var card = allCardElements[i];
    card.classList.remove("showCard");
  }

  setTimeout(function () {
    revealCards();
  }, 500);
}

function revealCards() {


  var j = 0;
  var cardIndexes = shuffleArray([0, 1, 2]);
  console.log("scenarios.length == " + scenarios.length);

  var randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
  var scenario = scenarios[randomScenarioIndex];
  console.log(scenario.questCard.description);

  scenarios.splice(randomScenarioIndex, 1);

  console.log("scenarios.length after splice == " + scenarios.length);

  var questCard = scenario.questCard;
  var questCardEl = document.querySelector(".quest-area .card");

  var playerCards = scenario.playerCards;

  for (var i = 0; i < allCardElements.length; i++) {
    var card = allCardElements[i];

    card.classList.remove("worse-card");
    card.classList.remove("better-card");
    card.classList.remove("played-card");
    card.classList.remove("tie-card");
    card.classList.remove("prepared");
    card.classList.remove("reveal-power");

    if (card.classList.contains("player-card")) {
      card.querySelector(".text").innerHTML = playerCards[cardIndexes[j]].description;
      card.querySelector(".power").innerHTML = playerCards[cardIndexes[j]].power;
      j++;
    }
    setTimeout(function (card, j) {
      return function () {
        card.classList.remove("prepared");
        card.style.display = "block";
        card.classList.add("showCard");
      }
    }(card, i), parseInt(i + 1) * 200);
  }

  questCardEl.querySelector(".text").innerHTML = questCard.description;
  questCardEl.querySelector(".power").innerHTML = questCard.power;
}
