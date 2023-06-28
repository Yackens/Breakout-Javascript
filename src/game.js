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

        // Add the tiles per row
        this.tiles.push(...this.tiles_green.addLineTiles(80));
        this.tiles.push(...this.tiles_green.addLineTiles(120));

        //
        this.gameLoop();
        console.log(this.tiles)
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

        // Add the tiles per row
        this.tiles.push(...this.tiles_blue.addLineTiles(80));
        this.tiles.push(...this.tiles_blue.addLineTiles(120));
        this.tiles.push(...this.tiles_green.addLineTiles(160));

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
        this.tiles.push(...this.tiles_orange.addLineTiles(80));
        this.tiles.push(...this.tiles_orange.addLineTiles(120));
        this.tiles.push(...this.tiles_blue.addLineTiles(160));
        this.tiles.push(...this.tiles_green.addLineTiles(200));
    
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

        let scoreElement = document.getElementsByClassName("score")[0];
        let livesElement = document.getElementsByClassName("lives")[0];

        if (this.tiles.length === 0 && this.score <= 300) {
            this.level_2();
            this.ball.element.remove();
            this.ball = new Ball(this.gameOverall, this.bar.left+50, this.bar.top-50, 35, 35, "yellow");
            scoreElement = document.getElementsByClassName("score")[1];
            livesElement = document.getElementsByClassName("lives")[1];

        }

        else if (this.tiles.length === 0 && this.score > 300) {
            this.level_3();
            this.ball.element.remove();
            this.ball = new Ball(this.gameOverall, this.bar.left+50, this.bar.top-50, 35, 35, "yellow");
            scoreElement = document.getElementsByClassName("score")[2];
            livesElement = document.getElementsByClassName("lives")[2];

        }

        // Case when ball hits the bar
        if (this.ball.collisionBar(this.bar)) {
            this.ball.directionY = -this.ball.directionY;
        }

        for (let i = 0; i < this.tiles.length; i++) {
            const tile = this.tiles[i];

            if (this.ball.collisionTiles(tile)) {
                if (tile.element.style.backgroundColor === "orange") {
                    tile.element.style.backgroundColor = "blue";
                }

                else if (tile.element.style.backgroundColor === "blue") {
                    tile.element.style.backgroundColor = "green";
                }

                else {
                     // Remove the tile element from the DOM
                    tile.element.remove();
                    // Remove tile object from the array
                    this.tiles.splice(i, 1);
                    // Adjust the loop index to account for the removed tile
                    i--;
                }

                // Increase the score
                this.score += 10;
                scoreElement.innerHTML = this.score;
                // Change the ball's direction
                this.ball.directionY = -this.ball.directionY;
                break;
            }
          }

        if (this.ball.livesLost()) {
            this.lives --;
            livesElement.innerHTML = this.lives;
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
        this.tiles.forEach(function (tile) {tile.element.remove()});
      
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
  