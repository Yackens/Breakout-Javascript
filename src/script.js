window.onload = function () {
  // Click Sound
  let levelUpAudio = new Audio('./media/click.wav');

  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;
  
  startButton.addEventListener("click", () => {
    levelUpAudio.play()
    startGame();
  });
  
  restartButton.addEventListener("click", () => {
    levelUpAudio.play()
    // Call the restartGame function when the button is clicked
    restartGame();
  });
  
  function startGame() {
    game = new Game();
    game.level_1();
  }
  
  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }
  
  // Function that handles keydown event
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
       "ArrowLeft",
       "a",
       "A",
       "ArrowRight",
       "d",
       "D",
      ];
  
      // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
        event.preventDefault();
  
        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case "ArrowLeft":
          case "a":
          case "A":
            game.bar.directionX = -10;
            break;
          case "ArrowRight":
          case "d":
          case "D":
            game.bar.directionX = 10;
            break;
        }
      }
  }

  function handleKeyup(event) {
    const key = event.key;
    
    // Reset bar's directionX when the corresponding key is released
    if (key === "ArrowLeft" || key === "ArrowRight" || key === "a" || key === "A" || key === "d" || key === "D") {
      game.bar.directionX = 0;
    }
  }
  // Add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("keyup", handleKeyup);
};