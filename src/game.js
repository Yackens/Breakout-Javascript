class Game {
    constructor() {
        this.startScreen = document.getElementById("game-intro");
        this.gameOverall = document.getElementById("game-container");
        this.gameScreen1 = document.getElementById("game-screen-1");
        this.gameScreen2 = document.getElementById("game-screen-2");
        this.gameScreen3 = document.getElementById("game-screen-3");
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
            650,
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
        this.tiles = [];
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

        //
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
        if (this.gameIsOver) {
            return;
        }
        this.update();
        window.requestAnimationFrame(() => this.gameLoop());
    }
  
    update() {
        this.bar.move()
        this.ball.moveBall()
        // Case when ball hits the bar
        if (this.ball.collisionBar(this.bar)) {
            this.ball.directionY = -this.ball.directionY;
        }

        for (let i = 0; i < this.tiles_green.length; i+=1) {
            const tile = this.tiles_green[i];
            if (this.ball.collisionBar(tile)) {
                // Remove the tile element from the DOM
                tile.element.remove();
                // Remove tile object from the array
                this.tiles.splice(i, 1);
                // Reduce player's lives by 1 and add it to the screen
                this.score+= 10;
                document.querySelector(".score").innerHTML = this.lives;
            }
        }

        if (this.ball.liveLost()) {
            this.lives --;
            document.querySelector(".lives").innerHTML = this.lives;
            this.ball.element.remove();
            if ( this.lives > 0) {
                    this.ball = new Ball(this.gameOverall, this.bar.left+50, this.bar.top-50, 35, 35, "yellow");
                }
        }

        if (this.lives <= 0) {
            this.endGame();
          }
      

    }
  
    // Create a new method responsible for ending the game
    endGame() {
        this.bar.element.remove();
      
        // Hide game screen
        this.gameScreen1.style.display = "none";
        this.gameScreen2.style.display = "none";
        this.gameScreen3.style.display = "none";

        document.getElementById("final_score").textContent = `Your final score was ${this.score} points.`;
        this.gameIsOver = true;

        // Show game over screen
        this.gameEndScreen.style.display = "block";

        if (this.lives <= 0) {
            // Show game over message
            document.getElementById("final_message").textContent = `Game over.`;

        } else {
            // Show beat game message
            document.getElementById("final_message").textContent = `Congratulations! You beat the game.`;

        }
    }
  }
  