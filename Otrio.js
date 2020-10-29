// Jesse Boone
// Otrio javascript game
// Human playable vs up to 3 cpu (random) players...
// AI cpu players in progress...


// to keep track of random play wins
let wins_ties = [0,0];
let boards = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let last2moves = [0,0,0]; // [(2 moves ago), (last move)]
// let winningMove = 0;

// For observing pruning improvements
let minimax_calls = [0, 0, 0, 0];

// game board
let otrio_board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// players (default game starts at 2)
let players = [1, 2];

// each default player's pieces
let pieces = [
  [3, 3, 3],
  [3, 3, 3]
];

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

let slider; // <input> element for selecting number of players
let button; // <button> element for starting a new game
let resultP; // <p> element for displaying winner
let radio; // <input> element for selecting AI strategy

function gameSetup() {
  otrio_board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  last2moves = [0,0,0]; // probably don't even need this since you can't win in under 3 moves but just in case
  // remaking player and pieces arrays based on slider value
  players = [];
  pieces = [];
  for (var i = 1; i <= slider.value(); i++) {
    players.push(i);
    pieces.push([3, 3, 3]);
  }
  currentPlayer = 0;

  result = null;
}

function deepCopy2DArray(arr) {
  // Deep copy a 2D array
  let fresh = [];
  for (let i = 0; i < arr.length; i++) {
    fresh.push(arr[i].concat());
  }
  return fresh;
}

// mostly unneeded, used for bug fixes
function logBoard() {
  print("Spot: " + spot);
  print("currentPlayer: " + currentPlayer);
  // let o = otrio_board.toString();
  // console.log("Board: " + o);
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

  slider = createSlider(1, 4, 2);
  slider.position(width+10, height+10);
  slider.style('width', '80px');

  button = createButton('New Game');
  button.position(width+10, height+50);
  button.mousePressed(newGame);

  resultP = createP('');

  radio = createRadio();
  radio.option('random');
  radio.option('minimax');
  radio.selected('random');
}

function eligibleMove(spot, board, pieces) {
  // If spot is available and the player has at least one of the correct piece, return true
  return board[spot] == 0 && pieces[floor(spot / 9)] > 0;
}

function availableSpots(board) {
  // Return indices of empty spots on the board
  let available = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] == 0) {
      available.push(i);
    }
  }
  return available;
}

function less1(i) {
  if (i == 0) return 2;
  else return (i-1);
}

function saveBoards() {
  let moves = 0;
  // add function here to turn opponents into -1s before copying it over????
  for (var i = otrio_board.length - 1; i >= 0; i--) {
    if (otrio_board[i] > 1) otrio_board[i] = -1;
    if (otrio_board[i] != 0) moves++;
  }
  print("Moves this game: " + moves);
  // save final board into all 3 spots
  boards[2] = otrio_board.concat();
  boards[1] = otrio_board.concat();
  boards[0] = otrio_board.concat();
  // reset last move and 2 moves to 0 in each previous board respectively
  boards[1][last2moves[1]] = 0;
  boards[0][last2moves[1]] = 0;
  boards[0][last2moves[0]] = 0;
  return;
}

function newGame() {
  // print("New game with " + slider.value() + " players.");
  resultP.html('');
  gameSetup();
  loop();
}

function equals3(a, b, c) {
  return (a != '0' && a == b && b == c);
}

function checkWinner(wentHere, otrio_board, pieces) { 
  // made this function a switch statement and hardcoded each position's possible wins
  // then for each one there is only be about 5 to check and is much faster
  // returns an integer player, null, or 'tie'
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
  // If all players are out of pieces, return 'tie'
  let all_out = true;
  for (let i = 0; i < slider.value(); i++) { // for each player
    if (pieces[i].reduce((acc, x) => acc + x) > 0) { // if they have any remaining moves left
      all_out = false;
    }
  }

  if (all_out) {
    return 'tie';
  }

  if (otrio_board.filter(spot => spot == 0).length == 0  && (winner == null)) {
    return 'tie';
  }
  else {
    return winner;
  } 
}

function shiftBack(arr, a) {
  arr[0] = arr[1];
  arr[1] = arr[2];
  arr[2] = a;
  // print(arr);
  return;
}

let spot = -1; // why is this here?
// find random place to go
function nextTurn() {
  if (radio.selected() == 'random') {
    let available = availableSpots(otrio_board);
    
    // Check available spots and make the first move we can
    available = shuffle(available);
    for (let i = 0; i < available.length; i++) {
      let available_piece = floor(available[i] / 9);
      if (pieces[currentPlayer][available_piece] > 0) { // we still have pieces of this size
        spot = available[i];
        pieces[currentPlayer][available_piece]--;
        break;
      }
    }
  } else if (radio.selected() == 'minimax') {
    minimax_calls = [0, 0, 0, 0];
    let bestSpot = null;
    let bestScore = -Number.MIN_VALUE;
    let available = availableSpots(otrio_board);
    for (let i = 0; i < available.length; i++) {
      if (eligibleMove(available[i], otrio_board, pieces[currentPlayer])) {
        let board_copy = otrio_board.concat(); // call concat with no args to make a copy
        board_copy[available[i]] = players[currentPlayer];
        let pieces_copy = deepCopy2DArray(pieces);
        pieces_copy[currentPlayer][floor(spot / 9)]--;
        let turn = (currentPlayer + 1) % players.length;
        let score = minimax(available[i], board_copy, pieces_copy, turn, currentPlayer, 2, -Number.MAX_VALUE, Number.MAX_VALUE);
        if (score > bestScore) {
          bestScore = score;
          bestSpot = available[i];
        }
      }
    }
    print('minimax calls at each depth: ' + minimax_calls);

    spot = bestSpot;
    let piece = floor(spot / 9);
    pieces[currentPlayer][piece]--; // this assumes minimax checks to see if currentPlayer has an appropriate piece for spot 
  }
  
  shiftBack(last2moves, spot);

  otrio_board[spot] = players[currentPlayer]; // claim that spot on board
  result = checkWinner(spot, otrio_board, pieces);
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
      if (eligibleMove(spot, otrio_board, pieces[0])) {
        otrio_board[spot] = players[currentPlayer];
        pieces[0][floor(spot / 9)]--;
        went = true;
      }
    }
  }
  // print("In mousePressed and spot: " + spot + " is a " + typeof spot);
  result = checkWinner(spot, otrio_board, pieces);
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
  
  // print(result);
  if (result != null) {
    noLoop();
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      wins_ties[1]++;
      resultP.html("Tie!")
      newGame();
    } else {
      resultP.html(`${result} wins!`);
      wins_ties[0]++;
      saveBoards();
      print(last2moves); print(boards[0]); print(boards[1]); print(boards[2]); print(wins_ties);
      newGame();
      //console.log(winnerFrom);
    }
  } else {
    if (currentPlayer > 0) { // calling random for non human (0) player
      nextTurn();
    }
    // else noLoop();
    else nextTurn();
  }
}