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
        530,
        700,
        140,
        20,
        "./img/bar.jpg"
      );
      this.ball = new Ball(
        this.gameOverall,
        580,
        640,
        35,
        35,
        "yellow"
      )
      this.tiles_green = new Tiles(
        this.gameOverall,
        5,
        0,
        "green",
        "tiles",
      );
      this.tiles_blue = new Tiles(
        this.gameOverall,
        5,
        0,
        "blue",
        "tiles",
      );
      this.tiles_orange = new Tiles(
        this.gameOverall,
        5,
        0,
        "orange",
        "tiles",
      );
      this.height = 800;
      this.width = 1200;
      this.obstacles = [];
      this.score = 0;
      this.lives = 3;
      this.gameIsOver = false;
      this.gameOverall.style.height = `${this.height}px`;
      this.gameOverall.style.width = `${this.width}px`;
    }
  
    level_1() {
        // Set the height and width of the game screen
        this.gameScreen1.style.height = `${this.height}px`;
        this.gameScreen1.style.width = `${this.width}px`;
        
        // Hide the start screen and not used tiles
        this.startScreen.style.display = "none";

        // Show the game screen
        this.gameScreen1.style.display = "block";
        this.gameOverall.style.display = "block";

        // Add the tiles
        this.tiles_green.addLineTiles(80);
        this.tiles_green.addLineTiles(120);
        this.tiles_green.addLineTiles(160);

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
        this.gameOverall.style.display = "block";


        // Add the tiles
        this.tiles_blue.addLineTiles(80);
        this.tiles_blue.addLineTiles(120);
        this.tiles_green.addLineTiles(160);
        this.tiles_green.addLineTiles(200);

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
        this.gameOverall.style.display = "block";


        // Add the tiles
        this.tiles_orange.addLineTiles(80);
        this.tiles_orange.addLineTiles(120);
        this.tiles_blue.addLineTiles(160);
        this.tiles_blue.addLineTiles(200);
        this.tiles_green.addLineTiles(240);
    
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
        this.ball.moveBall()

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
  