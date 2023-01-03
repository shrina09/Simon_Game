// Intializing variables and arrays
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// Intializing the game state and level
var started = false;
var level = 0;

// Starting the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $(".sub-heading").text("Remember the pattern!");
    nextSequence();
    started = true;
  }
});


//Button animation and sound effects when the user presses a button
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


//Checks if the user is doing the answers right
function checkAnswer(currentLevel) {

   //Checking if the users answer is right and if not executing the game over code
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $(".sub-heading").text("Better luck next time!");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


//Generating the sequence of the buttons to give to the user using the random library
function nextSequence() {
  userClickedPattern = [];

  //Highering the level and printing it
  level++;
  $("#level-title").text("Level " + level);

  //Generating a random colour next out of the 4
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //generating the animation that shows what colour is in the pattern next
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//Animating the press of the player
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Playing the sound according to the color pressed
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Starting over code when the player loses (resetting)
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
