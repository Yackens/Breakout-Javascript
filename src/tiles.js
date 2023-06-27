class Tiles {
    constructor(gameScreen, left, top, color, className) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.element = document.createElement("div");
        this.element.className = className;

        this.element.style.backgroundColor = color;
        this.element.style.position = "absolute";
        this.element.style.width = `110px`;
        this.element.style.height = `30px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    
        this.gameScreen.appendChild(this.element);
    }

    addLineTiles(top) {
        let currentLeft = 5;
        while (currentLeft + parseInt(this.element.style.width) <= parseInt(this.gameScreen.offsetWidth)) {
            new Tiles(this.gameScreen, currentLeft, top, this.element.style.backgroundColor, "actual_tiles");
            currentLeft = currentLeft + parseInt(this.element.style.width) + 10;
        }
    }
    

    didCollide(bar) {
      const playerRect = this.element.getBoundingClientRect();
      const obstacleRect = bar.element.getBoundingClientRect();
  
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
  
  