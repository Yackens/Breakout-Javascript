class Ball {
    constructor(gameScreen, left, top, width, height, color) {
      this.gameScreen = gameScreen;
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.directionX = Math.random() < 0.5 ? -6 : 6;
      this.directionY = 4;
      this.element = document.createElement("div");
  
      this.element.style.backgroundColor = color;
      this.element.style.border = "thin solid black";
      this.element.style.position = "absolute";
      this.element.style.width = `${width}px`;
      this.element.style.height = `${height}px`;
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
      this.element.className = "ball";

      this.gameScreen.appendChild(this.element);
    }
    
    collisionBar(bar) {
      const ballRect = this.element.getBoundingClientRect();
      const barRect = bar.element.getBoundingClientRect();
  
      if (
        ballRect.left < barRect.right &&
        ballRect.right > barRect.left &&
        ballRect.top < barRect.bottom &&
        ballRect.bottom > barRect.top
      ) {
        return true;
      } else {
        return false;
      }
    }

    collisionTiles(tile) {
        const ballRect = this.element.getBoundingClientRect();
        const tileRect = tile.element.getBoundingClientRect();
    
        if (
          ballRect.left < tileRect.right &&
          ballRect.right > tileRect.left &&
          ballRect.top < tileRect.bottom &&
          ballRect.bottom > tileRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
    
    livesLost() {
        if (this.top > this.gameScreen.offsetHeight - this.height) {
            return true;
        } else {
            return false;
        }
    }

    moveBall() {
        // Update player's ball position based on directionX and directionY
        this.left += this.directionX;
        this.top -= this.directionY;
    
        // Ensure the bar bounces
        if (this.left < 0 || this.left > this.gameScreen.offsetWidth - this.width) {
          this.directionX = -this.directionX;
        }
        if (this.top < 0) {
          this.directionY = -this.directionY;
        }
    
        // Update the player's ball position on the screen
        this.updatePosition();
    }
  
    updatePosition() {
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  }
  