// Jesse Boone
// Otrio javascript game
// Human playable vs up to 3 cpu (random) players...
// Hopefully AI cpu players to follow...

// each players pieces
// let P1Pieces = [0,0,0,1,1,1,2,2,2];
let P1Pieces = [3,3,3];
let P2Pieces = [0,0,0,1,1,1,2,2,2];
let P3Pieces = [0,0,0,1,1,1,2,2,2];
let P4Pieces = [0,0,0,1,1,1,2,2,2];

// Available spots on each level of board
let available0 = [  0, 1, 2, 3, 4, 5, 6, 7, 8 ];
let available1 = [  9,10,11,12,13,14,15,16,17 ];
let available2 = [ 18,19,20,21,22,23,24,25,26 ];

// game board
let otrio_board = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

// players
let players = [1, 2];

// used for distance formula later
let centerXs;
let centerYs;

// used to keep track of whose turn it is
let currentPlayer = 0;

let ringVals = [
  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ],
  [
    [9, 10, 11],
    [12, 13, 14],
    [15, 16, 17]
  ],
  [
    [18, 19, 20],
    [21, 22, 23],
    [24, 25, 26]
  ]
];

  // ?
let result;


function GameSetup() {

  // each players pieces
  // P1Pieces = [0,0,0,1,1,1,2,2,2];
  P1Pieces = [3,3,3];
  P2Pieces = [0,0,0,1,1,1,2,2,2];
  P3Pieces = [0,0,0,1,1,1,2,2,2];
  P4Pieces = [0,0,0,1,1,1,2,2,2];

  // Available spots on each level of board
  available0 = [  0, 1, 2, 3, 4, 5, 6, 7, 8 ];
  available1 = [  9,10,11,12,13,14,15,16,17 ];
  available2 = [ 18,19,20,21,22,23,24,25,26 ];

  // game board
  otrio_board = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

  // remaking player array based on slider value
  players = [];
  for (var i = 1; i <= slider.value(); i++) {
    players.push(i);
  }
  currentPlayer = 0;
}

// mostly unneeded, used for bug fixes
function logBoard() {
  print("Spot: " + spot);
  print("currentPlayer: " + currentPlayer);
  // let o = otrio_board.toString();
  // console.log("Board: " + o);
  // console.log("Av0: " + available0);
  // console.log("Av1: " + available1);
  // console.log("Av2: " + available2);
}

function setup() {
  let text = createP('1: Red - 2: Green - 3: Blue - 4: Purple');
  text.style('font-size', '32pt');
  createCanvas(600, 600);
  let w6 = width/6;
  let h6 = height/6;
  centerXs = [w6,w6*3,w6*5];
  centerYs = [h6,h6*3,h6*5];
  frameRate(5);
  slider = createSlider(1, 4);
  slider.position(width+10, height+10);
  slider.style('width', '80px');
  button = createButton('New Game');
  button.position(width+10, height+50);
  button.mousePressed(NewGame);
  //currentPlayer = floor(random(players.length));
}

function NewGame() {
  print("New game with " + slider.value() + " players.");
  GameSetup();
  loop();
}

function equals3(a, b, c) {
  return (a != '0' && a == b && b == c);
}

function checkWinner(wentHere) { 
  if (currentPlayer == 0) {
    print("In checkWinner as currentPlayer 0");
    print('And wentHere is: ' + wentHere + " of type " + typeof wentHere);
    print("Board: " + otrio_board);
  }
  // console.log(wentHere[0] + " is a " + typeof wentHere[0]);
  // made this function a switch statement and hardcoded each position's possible wins
  // then for each one there is only be about 5 to check and is much faster
  let winner = null;

  switch(wentHere) {
    case 0:
      if ((equals3(otrio_board[0],otrio_board[1],otrio_board[2])) || 
          (equals3(otrio_board[0],otrio_board[3],otrio_board[6])) || 
          (equals3(otrio_board[0],otrio_board[4],otrio_board[8])) || 
          (equals3(otrio_board[0],otrio_board[9],otrio_board[18])) || 
          (equals3(otrio_board[0],otrio_board[10],otrio_board[20])) || 
          (equals3(otrio_board[0],otrio_board[13],otrio_board[17])) || 
          (equals3(otrio_board[0],otrio_board[12],otrio_board[24])) ) 
      { winner = otrio_board[0]; }
      break;
    case 1:
      if ((equals3(otrio_board[0],otrio_board[1],otrio_board[2])) || 
          (equals3(otrio_board[1],otrio_board[4],otrio_board[7])) || 
          (equals3(otrio_board[1],otrio_board[10],otrio_board[19])) || 
          (equals3(otrio_board[1],otrio_board[13],otrio_board[25])) )
      { winner = otrio_board[1]; }
      break;
    case 2:
      if ((equals3(otrio_board[0],otrio_board[1],otrio_board[2])) || 
          (equals3(otrio_board[2],otrio_board[5],otrio_board[8])) || 
          (equals3(otrio_board[2],otrio_board[4],otrio_board[6])) || 
          (equals3(otrio_board[2],otrio_board[11],otrio_board[20])) || 
          (equals3(otrio_board[2],otrio_board[10],otrio_board[18])) || 
          (equals3(otrio_board[2],otrio_board[14],otrio_board[26])) || 
          (equals3(otrio_board[2],otrio_board[13],otrio_board[24])) )
      { winner = otrio_board[2]; }
      break;
    case 3:
      if ((equals3(otrio_board[0],otrio_board[3],otrio_board[6])) || 
          (equals3(otrio_board[3],otrio_board[4],otrio_board[5])) || 
          (equals3(otrio_board[3],otrio_board[12],otrio_board[21])) || 
          (equals3(otrio_board[3],otrio_board[13],otrio_board[23])) )
      { winner = otrio_board[3]; }
      break;
    case 4:
      if ((equals3(otrio_board[1],otrio_board[4],otrio_board[7])) || 
          (equals3(otrio_board[3],otrio_board[4],otrio_board[5])) || 
          (equals3(otrio_board[2],otrio_board[4],otrio_board[6])) || 
          (equals3(otrio_board[0],otrio_board[4],otrio_board[8])) ||
          (equals3(otrio_board[4],otrio_board[13],otrio_board[22])) )
      { winner = otrio_board[4]; }
      break;
    case 5:
      if ((equals3(otrio_board[2],otrio_board[5],otrio_board[8])) || 
          (equals3(otrio_board[3],otrio_board[4],otrio_board[5])) || 
          (equals3(otrio_board[3],otrio_board[13],otrio_board[21])) || 
          (equals3(otrio_board[5],otrio_board[14],otrio_board[23])) )
      { winner = otrio_board[5]; }
      break;
    case 6:
      if ((equals3(otrio_board[0],otrio_board[3],otrio_board[6])) || 
          (equals3(otrio_board[6],otrio_board[7],otrio_board[8])) || 
          (equals3(otrio_board[2],otrio_board[4],otrio_board[6])) || 
          (equals3(otrio_board[6],otrio_board[13],otrio_board[20])) || 
          (equals3(otrio_board[6],otrio_board[15],otrio_board[24])) || 
          (equals3(otrio_board[6],otrio_board[12],otrio_board[18])) || 
          (equals3(otrio_board[6],otrio_board[16],otrio_board[26])) )
      { winner = otrio_board[6]; }
      break;
    case 7:
      if ((equals3(otrio_board[6],otrio_board[7],otrio_board[8])) || 
          (equals3(otrio_board[1],otrio_board[4],otrio_board[7])) || 
          (equals3(otrio_board[7],otrio_board[13],otrio_board[19])) || 
          (equals3(otrio_board[7],otrio_board[16],otrio_board[25])) )
      { winner = otrio_board[7]; }
      break;
    case 8:
      if ((equals3(otrio_board[2],otrio_board[5],otrio_board[8])) || 
          (equals3(otrio_board[6],otrio_board[7],otrio_board[8])) || 
          (equals3(otrio_board[0],otrio_board[4],otrio_board[8])) || 
          (equals3(otrio_board[8],otrio_board[14],otrio_board[20])) || 
          (equals3(otrio_board[8],otrio_board[16],otrio_board[24])) || 
          (equals3(otrio_board[8],otrio_board[13],otrio_board[18])) || 
          (equals3(otrio_board[8],otrio_board[17],otrio_board[26])) )
      { winner = otrio_board[8]; }
      break;
    case 9:
      if ((equals3(otrio_board[9],otrio_board[10],otrio_board[11])) || 
          (equals3(otrio_board[9],otrio_board[12],otrio_board[15])) || 
          (equals3(otrio_board[9],otrio_board[13],otrio_board[17])) || 
          (equals3(otrio_board[0],otrio_board[9],otrio_board[18])) )
      { winner = otrio_board[9]; }
      break;
    case 10:
      if ((equals3(otrio_board[9],otrio_board[10],otrio_board[11])) || 
          (equals3(otrio_board[10],otrio_board[13],otrio_board[16])) || 
          (equals3(otrio_board[18],otrio_board[10],otrio_board[2])) || 
          (equals3(otrio_board[0],otrio_board[10],otrio_board[20])) ||
          (equals3(otrio_board[1],otrio_board[10],otrio_board[19])) )
      { winner = otrio_board[10]; }
      break;
    case 11:
      if ((equals3(otrio_board[9],otrio_board[10],otrio_board[11])) || 
          (equals3(otrio_board[11],otrio_board[14],otrio_board[17])) || 
          (equals3(otrio_board[11],otrio_board[13],otrio_board[15])) || 
          (equals3(otrio_board[2],otrio_board[11],otrio_board[20])) )
      { winner = otrio_board[11]; }
      break;
    case 12:
      if ((equals3(otrio_board[9],otrio_board[12],otrio_board[15])) || 
          (equals3(otrio_board[12],otrio_board[13],otrio_board[14])) || 
          (equals3(otrio_board[0],otrio_board[12],otrio_board[24])) || 
          (equals3(otrio_board[18],otrio_board[12],otrio_board[6])) ||
          (equals3(otrio_board[3],otrio_board[12],otrio_board[21])) )
      { winner = otrio_board[12]; }
      break;
    case 13:
      if ((equals3(otrio_board[0],otrio_board[13],otrio_board[26])) || 
          (equals3(otrio_board[9],otrio_board[13],otrio_board[17])) || 
          (equals3(otrio_board[18],otrio_board[13],otrio_board[8])) || 
          (equals3(otrio_board[1],otrio_board[13],otrio_board[25])) ||
          (equals3(otrio_board[10],otrio_board[13],otrio_board[16])) || 
          (equals3(otrio_board[19],otrio_board[13],otrio_board[7])) || 
          (equals3(otrio_board[2],otrio_board[13],otrio_board[24])) ||
          (equals3(otrio_board[11],otrio_board[13],otrio_board[15])) || 
          (equals3(otrio_board[20],otrio_board[13],otrio_board[6])) || 
          (equals3(otrio_board[3],otrio_board[13],otrio_board[23])) || 
          (equals3(otrio_board[12],otrio_board[13],otrio_board[14])) || 
          (equals3(otrio_board[21],otrio_board[13],otrio_board[5])) || 
          (equals3(otrio_board[4],otrio_board[13],otrio_board[22])) )
      { winner = otrio_board[13]; }
      break;
    case 14:
      if ((equals3(otrio_board[11],otrio_board[14],otrio_board[17])) || 
          (equals3(otrio_board[12],otrio_board[13],otrio_board[14])) || 
          (equals3(otrio_board[2],otrio_board[14],otrio_board[26])) || 
          (equals3(otrio_board[20],otrio_board[14],otrio_board[8])) ||
          (equals3(otrio_board[5],otrio_board[14],otrio_board[23])) )
      { winner = otrio_board[14]; }
      break;
    case 15:
      if ((equals3(otrio_board[9],otrio_board[12],otrio_board[15])) || 
          (equals3(otrio_board[17],otrio_board[16],otrio_board[15])) || 
          (equals3(otrio_board[11],otrio_board[13],otrio_board[15])) || 
          (equals3(otrio_board[6],otrio_board[15],otrio_board[24])) )
      { winner = otrio_board[15]; }
      break;
    case 16:
      if ((equals3(otrio_board[15],otrio_board[16],otrio_board[17])) || 
          (equals3(otrio_board[10],otrio_board[13],otrio_board[16])) || 
          (equals3(otrio_board[6],otrio_board[16],otrio_board[26])) || 
          (equals3(otrio_board[24],otrio_board[16],otrio_board[8])) ||
          (equals3(otrio_board[7],otrio_board[16],otrio_board[25])) )
      { winner = otrio_board[16]; }
      break;
    case 17:
      if ((equals3(otrio_board[11],otrio_board[14],otrio_board[17])) || 
          (equals3(otrio_board[17],otrio_board[16],otrio_board[15])) || 
          (equals3(otrio_board[9],otrio_board[13],otrio_board[17])) || 
          (equals3(otrio_board[8],otrio_board[17],otrio_board[26])) )
      { winner = otrio_board[17]; }
      break;
    case 18:
      if ((equals3(otrio_board[18],otrio_board[19],otrio_board[20])) || 
          (equals3(otrio_board[18],otrio_board[21],otrio_board[24])) || 
          (equals3(otrio_board[18],otrio_board[22],otrio_board[26])) || 
          (equals3(otrio_board[18],otrio_board[10],otrio_board[2])) || 
          (equals3(otrio_board[18],otrio_board[13],otrio_board[8])) || 
          (equals3(otrio_board[18],otrio_board[12],otrio_board[6])) || 
          (equals3(otrio_board[18],otrio_board[9],otrio_board[0])) )
      { winner = otrio_board[18]; }
      break;
    case 19:
      if ((equals3(otrio_board[18],otrio_board[19],otrio_board[20])) || 
          (equals3(otrio_board[19],otrio_board[22],otrio_board[25])) || 
          (equals3(otrio_board[19],otrio_board[10],otrio_board[1])) || 
          (equals3(otrio_board[19],otrio_board[13],otrio_board[7])) )
      { winner = otrio_board[19]; }
      break;
    case 20:
      if ((equals3(otrio_board[18],otrio_board[19],otrio_board[20])) || 
          (equals3(otrio_board[20],otrio_board[22],otrio_board[24])) || 
          (equals3(otrio_board[20],otrio_board[23],otrio_board[26])) || 
          (equals3(otrio_board[20],otrio_board[10],otrio_board[0])) || 
          (equals3(otrio_board[20],otrio_board[13],otrio_board[6])) || 
          (equals3(otrio_board[20],otrio_board[14],otrio_board[8])) || 
          (equals3(otrio_board[20],otrio_board[11],otrio_board[2])) )
      { winner = otrio_board[20]; }
      break;
    case 21:
      if ((equals3(otrio_board[18],otrio_board[21],otrio_board[24])) || 
          (equals3(otrio_board[21],otrio_board[22],otrio_board[23])) || 
          (equals3(otrio_board[21],otrio_board[12],otrio_board[3])) || 
          (equals3(otrio_board[21],otrio_board[13],otrio_board[5])) )
      { winner = otrio_board[21]; }
      break;
    case 22:
      if ((equals3(otrio_board[21],otrio_board[22],otrio_board[23])) || 
          (equals3(otrio_board[19],otrio_board[22],otrio_board[25])) || 
          (equals3(otrio_board[18],otrio_board[22],otrio_board[26])) || 
          (equals3(otrio_board[20],otrio_board[22],otrio_board[24])) ||
          (equals3(otrio_board[4],otrio_board[13],otrio_board[22])) )
      { winner = otrio_board[22]; }
      break;
    case 23:
      if ((equals3(otrio_board[20],otrio_board[23],otrio_board[26])) || 
          (equals3(otrio_board[21],otrio_board[22],otrio_board[23])) || 
          (equals3(otrio_board[23],otrio_board[14],otrio_board[5])) || 
          (equals3(otrio_board[23],otrio_board[13],otrio_board[3])) )
      { winner = otrio_board[23]; }
      break;
    case 24:
      if ((equals3(otrio_board[18],otrio_board[21],otrio_board[24])) || 
          (equals3(otrio_board[20],otrio_board[22],otrio_board[24])) || 
          (equals3(otrio_board[24],otrio_board[25],otrio_board[26])) || 
          (equals3(otrio_board[24],otrio_board[15],otrio_board[6])) || 
          (equals3(otrio_board[24],otrio_board[12],otrio_board[0])) || 
          (equals3(otrio_board[24],otrio_board[13],otrio_board[2])) || 
          (equals3(otrio_board[24],otrio_board[16],otrio_board[8])) )
      { winner = otrio_board[24]; }
      break;
    case 25:
      if ((equals3(otrio_board[19],otrio_board[22],otrio_board[25])) || 
          (equals3(otrio_board[24],otrio_board[25],otrio_board[26])) || 
          (equals3(otrio_board[25],otrio_board[16],otrio_board[7])) || 
          (equals3(otrio_board[25],otrio_board[13],otrio_board[1])) )
      { winner = otrio_board[25]; }
      break;
    case 26:
      if ((equals3(otrio_board[18],otrio_board[22],otrio_board[26])) || 
          (equals3(otrio_board[24],otrio_board[25],otrio_board[26])) || 
          (equals3(otrio_board[20],otrio_board[23],otrio_board[26])) || 
          (equals3(otrio_board[26],otrio_board[17],otrio_board[8])) || 
          (equals3(otrio_board[26],otrio_board[13],otrio_board[0])) || 
          (equals3(otrio_board[26],otrio_board[14],otrio_board[2])) || 
          (equals3(otrio_board[26],otrio_board[16],otrio_board[6])) )
      { winner = otrio_board[26]; }
      break;
    default:
  }
  if ( (available0 == '') && (available1 == '') && (available2 == '') && (winner == null) ) {
    return 'tie';
  } 
  else {
    return winner;
  } 
}

// look for available spot for that type of piece
function getSpot(piece) {
  // console.log('In get spot with piece: ' + piece);
  if (piece == 0) return available0.splice(floor(random(available0.length)), 1);
  else if (piece == 1) return available1.splice(floor(random(available1.length)), 1);
  else if (piece == 2) return available2.splice(floor(random(available2.length)), 1);
}

let spot = -1;
// find random place to go
function nextTurn() {
  // console.log('next turn called for player: ' + currentPlayer);
  let piece = null;
  // if (currentPlayer == 0); 
  if (currentPlayer == 1) piece = P2Pieces.splice(floor(random(P2Pieces.length)), 1);
  else if (currentPlayer == 2) piece = P3Pieces.splice(floor(random(P3Pieces.length)), 1);
  else if (currentPlayer == 3) piece = P4Pieces.splice(floor(random(P4Pieces.length)), 1);
  // can piece ever equal null here? I dont think so but check later (apparently it can [check winner not working atm though])
  if (piece == '') {
    console.log('Game over, out of pieces');
    noLoop();
  }
  // print("Pre getSpot spot is: " + spot);
  spot = getSpot(piece);
  // print("Post getSpot spot is: " + spot);
  //if (spot == null) {remove();}
  otrio_board[spot] = players[currentPlayer]; // claim that spot on board
  currentPlayer = (currentPlayer + 1) % players.length; // cycle through turns
}

function whichRing(x,y) {
  // using centers from setup, run distance formula from x,y to centers x,y
  let dist = sqrt( pow(centerXs[x]-mouseX,2) + pow(centerYs[y]-mouseY,2) );

  // classify ring based on radius
  if ( dist < width/(3*2*3.1) ) return 2;
  else if (dist < width/(3*2*1.7) ) return 1;
  else if (dist < width/(3*2*1.2) ) return 0;
  else return -1;
}

function mousePressed() {
  let went = false;
  if (currentPlayer == 0) {
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      // finding quadrant
      let x=floor(mouseX/(width/3));
      let y=floor(mouseY/(height/3));
      // choosing ring
      let ring = whichRing(x,y);
      if (ring >= 0) {
        spot = ringVals[ring][y][x];
      }
      if (spot < 9) {
        if ( (available0.includes(spot)) && (P1Pieces[0]>0) ) {
          available0.splice(available0.indexOf(spot), 1); // remove spot from available
          otrio_board[spot] = players[currentPlayer]; // claim that spot on board
          P1Pieces[0]--;
          went = true;
        }
      }
      else if (spot < 18) {
        if ( (available1.includes(spot)) && (P1Pieces[1]>0) ) {
          available1.splice(available1.indexOf(spot), 1); // remove spot from available
          otrio_board[spot] = players[currentPlayer]; // claim that spot on board
          P1Pieces[1]--;
          went = true;
        }
      }
      else if (spot < 27) {
        if ( (available2.includes(spot)) && (P1Pieces[2]>0) ) {
          available2.splice(available2.indexOf(spot), 1); // remove spot from available
          otrio_board[spot] = players[currentPlayer]; // claim that spot on board
          P1Pieces[2]--;
          went = true;
        }
      }
    }
  }
  print("In mousePressed and spot: " + spot + " is a " + typeof spot);
  result = checkWinner(spot);
  if (went) currentPlayer = (currentPlayer + 1) % players.length; // cycle through turns
  loop();
}

function draw() {
// set drawing settings
  background(255);
  let w = width / 3;
  let h = height / 3;
  strokeWeight(2);

// Draw board
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let i = 0; i < 27; i++) {
        let x = w * (i%3) + w / 2; // i was k
        let y = h * floor((i%9)/3) + h / 2; // i was j
        let place = otrio_board[i];
        // textSize(32);
        if (place == players[0]) { fill(color('red'));} 
        else if (place == players[1]) { fill(color('green'));}
        else if (place == players[2]) { fill(color('blue'));}
        else if (place == players[3]) { fill(color('purple'));}
        else fill(color('white'));
        if (i<9) {ellipse(x, y, w / 1.2);}
        else if (i<18) {ellipse(x, y, w / 1.7);}
        else if (i<27) {ellipse(x, y, w / 3.1);}
  }

// check for winner and stop if found
  // logBoard();
  // print("In draw and spot[0]: " + spot[0] + " is a " + typeof spot[0]);
  
  // print(result);
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html("Tie!")
    } else {
      resultP.html(`${result} wins!`);
      //console.log(winnerFrom);
    }
  } else {
    if (currentPlayer > 0) {
      nextTurn();
      result = checkWinner(spot[0]);
    }
    else noLoop();
  }
}