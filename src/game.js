class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameOverall = document.getElementById("game-container");
      this.gameScreen1 = document.getElementById("game-screen-1");
      this.gameScreen2 = document.getElementById("game-screen-2");
      this.gameScreen3 = document.getElementById("game-screen-3");
      this.gameOverScreen = document.getElementById("game-over");
      this.gameEndScreen = document.getElementById("game-end");
      this.bar = new Bar(
        this.gameOverall,
        570,
        700,
        120,
        20,
        "./img/bar.jpg"
      );
      this.tiles_1 = new Tiles(
        this.gameOverall,
        10,
        10,
        80,
        20,
        "green"
      );
      this.tiles_2 = new Tiles(
        this.gameOverall,
        10,
        10,
        80,
        20,
        "blue"
      );
      this.tiles_3 = new Tiles(
        this.gameOverall,
        50,
        100,
        100,
        20,
        "orange"
      );

      this.height = 800;
      this.width = 1200;
      this.obstacles = [];
      this.score = 0;
      this.lives = 3;
      this.gameIsOver = false;
    }
  
    level_1() {
      // Set the height and width of the game screen
      this.gameScreen1.style.height = `${this.height}px`;
      this.gameScreen1.style.width = `${this.width}px`;
      this.gameOverall.style.height = `${this.height}px`;
      this.gameOverall.style.width = `${this.width}px`;
      
  
      // Hide the start screen and not used tiles
      this.startScreen.style.display = "none";

      // Show the game screen
      this.gameScreen1.style.display = "block";
      this.gameOverall.style.display = "block";



      this.gameLoop();
    }

    level_2() {
        // Set the height and width of the game screen
        this.gameScreen2.style.height = `${this.height}px`;
        this.gameScreen2.style.width = `${this.width}px`;
    
        // Hide the start screen
        this.gameScreen1.style.display = "none";
        // Show the game screen
        this.gameScreen2.style.display = "block";
    
        //
        this.gameLoop();
      }

      level_3() {
        // Set the height and width of the game screen
        this.gameScreen3.style.height = `${this.height}px`;
        this.gameScreen3.style.width = `${this.width}px`;
    
        // Hide the start screen
        this.gameScreen2.style.display = "none";
        // Show the game screen
        this.gameScreen3.style.display = "block";
    
        //
        this.gameLoop();
      }
  
    gameLoop() {
      console.log("in the game loop");
  
      if (this.gameIsOver) {
        return;
      }
  
      this.update();
  
      window.requestAnimationFrame(() => this.gameLoop());
    }
  
    update() {
        this.bar.move()
    }
  
    // Create a new method responsible for ending the game
    endGame() {
      this.bar.element.remove();
      this.tiles_1.remove();
      this.tiles_2.remove();
      this.tiles_3.remove();

      this.gameIsOver = true;
      if (this.lives <= 0) {
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameOverScreen.style.display = "block";
      }
      else {
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block";
      }
    }
  }
  