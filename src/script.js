window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game;
  
    startButton.addEventListener("click", () => {
      startGame();
    });
  
    restartButton.addEventListener("click", () => {
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
            game.bar.directionX = -6;
            break;
          case "ArrowRight":
          case "d":
          case "D":
            game.bar.directionX = 6;
            break;
        }
      }
    }
  
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);
  };
  