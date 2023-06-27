class Bar {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement("img");
    
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        this.element.className = "bar";

        this.gameScreen.appendChild(this.element);
      }
  
    move() {
      // Update bar's car position based on directionX
      this.left += this.directionX;
  
      // Ensure the bar stays within the game screen
      if (this.left < 20) {
        this.left = 20;
      }
      if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
        this.left = this.gameScreen.offsetWidth - this.width - 10;
      }
  
      // Update the bar's car position on the screen
      this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
      }
  
    didCollide(obstacle) {
      const playerRect = this.element.getBoundingClientRect();
      const obstacleRect = obstacle.element.getBoundingClientRect();
  
      if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
      ) {
        console.log("Crash!");
  
        return true;
      } else {
        return false;
      }
    }
  }
  