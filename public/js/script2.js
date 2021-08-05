let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;

var count = 0;
let oneCh = false;
let twoCh = false;
let thrCh = false;
let googleUser


//let playerIcon = new Image();


class Player {

  constructor() {
    this.reset();
  }

  reset() {
    this.col = 0;
    this.row = 0;
  }

}

class MazeCell {

  constructor(col, row) {
    this.col = col;
    this.row = row;

    this.eastWall = true;
    this.northWall = true;
    this.southWall = true;
    this.westWall = true;

    this.visited = false;
  }

}

class Maze {

  constructor(cols, rows, cellSize) {

    this.backgroundColor = "#ffffff";
    this.cols = cols;
    //this.endColor = "#88FF88";
    this.endIcon=bunkBed;
    console.log(this.endIcon);
    this.mazeColor = "#000000";
    //this.playerColor="#800080";
    this.playerIcon = image;
    console.log(this.playerIcon);
    //console.log(this.playerIcon.src);
    this.challengeColorOne = "#4263f5";
    this.challengeColorTwo = "#4263f5";
    this.challengeColorThree = "#4263f5";
    this.rows = rows;
    this.cellSize = cellSize;

    this.cells = [];
    this.challengeOneCol = Math.floor(Math.random() * this.cols);
    this.challengeOneRow = Math.floor(Math.random() * this.rows);
    this.challengeTwoCol = Math.floor(Math.random() * this.cols);
    this.challengeTwoRow = Math.floor(Math.random() * this.rows);
    this.challengeThreeCol = Math.floor(Math.random() * this.cols);
    this.challengeThreeRow = Math.floor(Math.random() * this.rows);
    
    while (this.challengeOneCol == cols-1 && this.challengeOneRow==rows-1 ||
        this.challengeOneCol == 0 && this.challengeOneRow==0 ){
        this.challengeOneCol = Math.floor(Math.random() * this.cols);
        this.challengeOneRow = Math.floor(Math.random() * this.rows);
    }
    while(this.challengeTwoCol == this.challengeOneCol && this.challengeTwoRow == this.challengeOneRow || 
        this.challengeTwoCol == 0 && this.challengeTwoRow == 0 || 
        this.challengeTwoCol == cols-1 && this.challengeTwoRow == rows-1){
        this.challengeTwoCol = Math.floor(Math.random() * this.cols);
        this.challengeTwoRow = Math.floor(Math.random() * this.rows);
    }
    while(this.challengeThreeCol == this.challengeOneCol && this.challengeThreeRow == this.challengeOneRow ||
         this.challengeThreeCol == this.challengeTwoCol && this.challengeThreeRow == this.challengeTwoRow ||
         this.challengeThreeCol == 0 && this.challengeThreeRow == 0 || 
        this.challengeThreeCol == cols-1 && this.challengeThreeRow == rows-1){
        this.challengeThreeCol = Math.floor(Math.random() * this.cols);
        this.challengeThreeRow = Math.floor(Math.random() * this.rows);
    }
    
    this.generate()
    console.log("1: " + this.challengeOneRow + " " + this.challengeOneCol);
    console.log("2: " + this.challengeTwoRow + " " + this.challengeTwoCol);
    console.log("3: " + this.challengeThreeRow + " " + this.challengeThreeCol);

  }
    
  generate() {

    mazeHeight = this.rows * this.cellSize;
    mazeWidth = this.cols * this.cellSize;

    canvas.height = mazeHeight;
    canvas.width = mazeWidth;
    canvas.style.height = mazeHeight;
    canvas.style.width = mazeWidth;

    for (let col = 0; col < this.cols; col++) {
      this.cells[col] = [];
      for (let row = 0; row < this.rows; row++) {
        this.cells[col][row] = new MazeCell(col, row);
      }
    }

    let rndCol = Math.floor(Math.random() * this.cols);
    let rndRow = Math.floor(Math.random() * this.rows);

    let stack = [];
    stack.push(this.cells[rndCol][rndRow]);

    let currCell;
    let dir;
    let foundNeighbor;
    let nextCell;

    while (this.hasUnvisited(this.cells)) {
      currCell = stack[stack.length - 1];
      currCell.visited = true;
      if (this.hasUnvisitedNeighbor(currCell)) {
        nextCell = null;
        foundNeighbor = false;
        do {
          dir = Math.floor(Math.random() * 4);
          switch (dir) {
            case 0:
              if (currCell.col !== (this.cols - 1) && !this.cells[currCell.col + 1][currCell.row].visited) {
                currCell.eastWall = false;
                nextCell = this.cells[currCell.col + 1][currCell.row];
                nextCell.westWall = false;
                foundNeighbor = true;
              }
              break;
            case 1:
              if (currCell.row !== 0 && !this.cells[currCell.col][currCell.row - 1].visited) {
                currCell.northWall = false;
                nextCell = this.cells[currCell.col][currCell.row - 1];
                nextCell.southWall = false;
                foundNeighbor = true;
              }
              break;
            case 2:
              if (currCell.row !== (this.rows - 1) && !this.cells[currCell.col][currCell.row + 1].visited) {
                currCell.southWall = false;
                nextCell = this.cells[currCell.col][currCell.row + 1];
                nextCell.northWall = false;
                foundNeighbor = true;
              }
              break;
            case 3:
              if (currCell.col !== 0 && !this.cells[currCell.col - 1][currCell.row].visited) {
                currCell.westWall = false;
                nextCell = this.cells[currCell.col - 1][currCell.row];
                nextCell.eastWall = false;
                foundNeighbor = true;
              }
              break;
          }
          if (foundNeighbor) {
            stack.push(nextCell);
          }
        } while (!foundNeighbor)
      } else {
        currCell = stack.pop();
      }
    }

    this.redraw();

  }

  hasUnvisited() {
    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (!this.cells[col][row].visited) {
          return true;
         // console.log(c);
        }
      }
    }
    return false;
  }

  hasUnvisitedNeighbor(mazeCell) {
    return ((mazeCell.col !== 0               && !this.cells[mazeCell.col - 1][mazeCell.row].visited) ||
            (mazeCell.col !== (this.cols - 1) && !this.cells[mazeCell.col + 1][mazeCell.row].visited) ||
            (mazeCell.row !== 0               && !this.cells[mazeCell.col][mazeCell.row - 1].visited) ||
            (mazeCell.row !== (this.rows - 1) && !this.cells[mazeCell.col][mazeCell.row + 1].visited));
  }

  redraw() {

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, mazeHeight, mazeWidth);

    //ctx.fillStyle = this.endColor;
    //ctx.fillRect((this.cols - 1) * this.cellSize, (this.rows - 1) * this.cellSize, this.cellSize, this.cellSize);
    ctx.drawImage(this.endIcon, (this.cols - 1) * this.cellSize, (this.rows - 1) * this.cellSize, this.cellSize-(this.cellSize/10),this.cellSize-(this.cellSize/10));


    ctx.strokeStyle = this.mazeColor;
    ctx.strokeRect(0, 0, mazeHeight, mazeWidth);

    ctx.fillStyle = this.challengeColorOne;
    ctx.fillRect(this.challengeOneCol * this.cellSize, this.challengeOneRow * this.cellSize, this.cellSize, this.cellSize);
    console.log(this.challengeOneCol, this.challengeOneRow)

    ctx.fillStyle = this.challengeColorTwo;
    ctx.fillRect(this.challengeTwoCol * this.cellSize, this.challengeTwoRow * this.cellSize, this.cellSize, this.cellSize);

    ctx.fillStyle = this.challengeColorThree;
    ctx.fillRect(this.challengeThreeCol * this.cellSize, this.challengeThreeRow * this.cellSize, this.cellSize, this.cellSize);

    for (let col = 0; col < this.cols; col++) {
      for (let row = 0; row < this.rows; row++) {
        if (this.cells[col][row].eastWall) {
          ctx.beginPath();
          ctx.moveTo((col + 1) * this.cellSize, row * this.cellSize);
          ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
          ctx.stroke();
        }
        if (this.cells[col][row].northWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.cellSize, row * this.cellSize);
          ctx.lineTo((col + 1) * this.cellSize, row * this.cellSize);
          ctx.stroke();
        }
        if (this.cells[col][row].southWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.cellSize, (row + 1) * this.cellSize);
          ctx.lineTo((col + 1) * this.cellSize, (row + 1) * this.cellSize);
          ctx.stroke();
        }
        if (this.cells[col][row].westWall) {
          ctx.beginPath();
          ctx.moveTo(col * this.cellSize, row * this.cellSize);
          ctx.lineTo(col * this.cellSize, (row + 1) * this.cellSize);
          ctx.stroke();
        }

        console.log ("row: " + player.row + " col: " + player.col);

        if(player.col==this.challengeOneCol && 
                player.row==this.challengeOneRow && oneCh == false){
                    oneCh = true;
                    console.log("oneCh: " + oneCh);
                    this.challengeColorOne = "#FFFFFF";
            }
            else if(player.col==this.challengeTwoCol && 
                player.row==this.challengeTwoRow && twoCh == false){
                    twoCh = true;
                    console.log("TwoCh: " + twoCh);
                    this.challengeColorTwo = "#FFFFFF";
   
                }
            else if (player.col==this.challengeThreeCol && 
                player.row==this.challengeThreeRow && thrCh == false) {
                    thrCh = true;
                    console.log("threeCh: " + thrCh);
                    this.challengeColorThree = "#FFFFFF";
            }

      }
    }

    //ctx.fillStyle = this.playerColor;
    console.log((player.col - 1) * this.cellSize, (player.row - 1) * this.cellSize);
    ctx.drawImage(this.playerIcon, (player.col) * this.cellSize + 2, (player.row) * this.cellSize + 2, this.cellSize-(this.cellSize/10), this.cellSize-(this.cellSize/10));
    //ctx.drawImage((player.col * this.cellSize) + 2, (player.row * this.cellSize) + 2, this.cellSize - 4, this.cellSize - 4);
  }

}

function onClick(event) { //regenerate maze
  player.reset();
  maze.cols = 5;
  maze.rows = 5;
  maze.generate();
}

// function onControlClick(event) {
//   switch (event.target.id) {
//     case 'left':
//       if (!maze.cells[player.col][player.row].westWall) {
//         player.col -= 1;
//       }
//       break;
//     case 'right':
//       if (!maze.cells[player.col][player.row].eastWall) {
//         player.col += 1;
//       }
//       break;
//     case 'down':
//       if (!maze.cells[player.col][player.row].southWall) {
//         player.row += 1;
//       }
//       break;
//     case 'up':
//       if (!maze.cells[player.col][player.row].northWall) {
//         player.row -= 1;
//       }
//       break;
//     default:
//       break;
//   }
//   maze.redraw();
// }
    let minutes = 0;
    let seconds = 0;
    let timer = document.querySelector("#timer");
    let time = minutes + ":" + seconds;
    timer.innerHTML = time;
    let timeCount

    function addTime() {
        seconds += 1;
        let time = minutes + ":" + seconds;
        timer.innerHTML = time;
         timeCount = setTimeout(addTime, 1000);
            if (seconds === 60){
                seconds = 0;
                minutes += 1;
            }

        }
    
function startTimer(){
    if (seconds === 0 && minutes === 0){
    addTime()   
    }
}
function stopTimer(){
    if (seconds !== 0  || minutes !== 0){
        let time = minutes + ":" + seconds;  
        clearTimeout(timeCount);   
    }
}

     tileOne = document.querySelector("#challengeOne");
     tileTwo = document.querySelector("#challengeTwo");
     tileThree = document.querySelector("#challengeThree");

function onKeyDown(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      if (!maze.cells[player.col][player.row].westWall) {
        player.col -= 1;
      }
      break;
    case 39:
    case 68:
      if (!maze.cells[player.col][player.row].eastWall) {
        player.col += 1;
      }
      break;
    case 40:
    case 83:
      if (!maze.cells[player.col][player.row].southWall) {
        player.row += 1;
      }
      break;
    case 38:
    case 87:
      if (!maze.cells[player.col][player.row].northWall) {
        player.row -= 1;
      }
      break;
    default:
      break;
  }

  maze.redraw();
  startTimer();
  //challanges appear 
  if (player.col == maze.challengeOneCol && player.row == maze.challengeOneRow) {
        tileOne.classList.remove("hidden");
  }
   if (player.col == maze.challengeTwoCol && player.row == maze.challengeTwoRow) {
        tileTwo.classList.remove("hidden");
  }
   if (player.col == maze.challengeThreeCol && player.row == maze.challengeThreeRow) {
        tileThree.classList.remove("hidden");
  }
    //ending pop up 
    if(player.col == maze.cols-1 && player.row == maze.rows-1
        && oneCh && twoCh && thrCh) {
        setTimeout(() => {  
            alert("You made it to the end of the maze. Congrats! Your time was " + minutes +" minutes and " + seconds + " seconds"); 
        }, 500);
       stopTimer();
       document.getElementById("saveBtn").style.display = "initial";
        
    } 
}
function saveScore() {
        let text;
        let person = prompt("Please enter your name:", "Name");
            if (person == null || person == "") {
                text = "User cancelled the prompt.";
            } else {
                text =  person + " - " + minutes + ":" + seconds;
            }
        document.getElementById("score").innerHTML = text;
            const submitScore = () => {
                // 1. Capture the form data
                // 2. Format the data and write it to our database
                    console.log(person, minutes, seconds)
                    firebase.database().ref().push({
                        name: person,
                        minutes: minutes,
                        seconds: seconds
                    })

                }
            submitScore();
        }



function onLoad() {

  canvas = document.getElementById('mainForm');
  ctx = canvas.getContext('2d');
  image = document.querySelector('#imageSource');
  bunkBed = document.querySelector('#bunkBedImage');
  progressBar = document.querySelector('#progressBar');  

  player = new Player();
  maze = new Maze(5, 5, 50);

  document.addEventListener('keydown', onKeyDown);
  //document.getElementById('generate').addEventListener('click', onClick);
}


function randomChallenge()  {
   //after button is clicked to submit value or final square is reached
   //progressBar.innerHTML = makeProgress(challengeCount);
}

const makeProgress = (challengeCount) => {
    return `<progress class = "progress is-success is-large" value = ${challengeCount * 25} max = "100">${challengeCount * 25}%</progress>`
}

const challengeOneAns = document.querySelector("#challengeOneAns");
const challengeOneEnter = document.querySelector("#challengeOneEnter");
const challengeTwoAns = document.querySelector("#challengeTwoAns");
const challengeTwoEnter = document.querySelector("#challengeTwoEnter");
const challengeThreeAns = document.querySelector("#challengeThreeAns");
const challengeThreeEnter = document.querySelector("#challengeThreeEnter");