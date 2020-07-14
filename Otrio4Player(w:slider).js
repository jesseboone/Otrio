// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/149-tic-tac-toe.html
// https://youtu.be/GTWrWM1UsnA
// https://editor.p5js.org/codingtrain/sketches/5JngATm3c

/*// bottom board = outer layer = 0
  let Board0 = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  // middle board = middle layer = 1
  let Board1 = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  // top board = top layer = 2
  let Board2 = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];*/
  let P1Pieces = [0,0,0,1,1,1,2,2,2];
  let P2Pieces = [0,0,0,1,1,1,2,2,2];
  let P3Pieces = [0,0,0,1,1,1,2,2,2];
  let P4Pieces = [0,0,0,1,1,1,2,2,2];

  // Available spots on sub-board
  let available0 = [ [0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2] ];
  let available1 = [ [0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2] ];
  let available2 = [ [0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2] ];
  // console.log(available0);

  //can I do it like this?
  let otrio_board = [
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  ];

  let players = [1, 2, 3, 4];
  let currentPlayer = 0;
  let position;

function GameSetup() {

  //Players Pieces (outer, middle, inner)
  P1Pieces = [0,0,0,1,1,1,2,2,2];
  P2Pieces = [0,0,0,1,1,1,2,2,2];
  P3Pieces = [0,0,0,1,1,1,2,2,2];
  P4Pieces = [0,0,0,1,1,1,2,2,2];

  // Available spots on sub-board
  available0 = [ [0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2] ];
  available1 = [ [0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2] ];
  available2 = [ [0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2] ];
  // console.log(available0);

  //can I do it like this?
  otrio_board = [
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  ];

  players = [];
  for (var i = 0; i < slider.value(); i++) {
    players.push(i);
  }
  currentPlayer = 0;
}

function logBoard() {
  let o = otrio_board.toString();
console.log(o);
}

function setup() {
  let text = createP('1: Red - 2: Green - 3: Blue - 4: Purple');
  text.style('font-size', '32pt');
  // text.html("Player 1: Red | Player 2: Green");
  createCanvas(500, 500);
  frameRate(1);
  slider = createSlider(1, 4);
  slider.position(510, 510);
  slider.style('width', '80px');
  button = createButton('New Game');
  button.position(510, 550);
  button.mousePressed(NewGame);
  //currentPlayer = floor(random(players.length));
  /*for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        available.push([i, j, k]);
      }
    }
  }*/
}

function NewGame() {
  print(slider.value());
  GameSetup();
  loop();
}

function equals3(a, b, c) {
  return (a == b && b == c && a != '');
}

function checkWinner() { 
  let winner = null;

  // for each horizontal across a ring level
  for (let i = 0; i<3; i++) {
    for (let j = 0; j<3; j++) {
      if (equals3(otrio_board[i][j][0], otrio_board[i][j][1], otrio_board[i][j][2])) {
        return otrio_board[i][j][1];
      }
    }
  }

  // for each vertical down a ring level
  for (let i = 0; i<3; i++) {
    for (let k = 0; k<3; k++) {
      if (equals3(otrio_board[i][0][k], otrio_board[i][1][k], otrio_board[i][2][k])) {
        return otrio_board[i][1][k];
      }
    }
  }

  // same spot stacks
  for (let j = 0; j<3; j++) {
    for (let k = 0; k<3; k++) {
      if (equals3(otrio_board[0][j][k], otrio_board[1][j][k], otrio_board[2][j][k])) {
        return otrio_board[1][j][k];
      }
    }
  }

  //ascending & descending horiz & vertical
  for (let j = 0; j<3; j++) {
      if (equals3(otrio_board[0][j][0], otrio_board[1][j][1], otrio_board[2][j][2])) {
        return otrio_board[1][j][1];
    }
  }

  // diagonals identical & ascending/descending

  // horizontal
  for (let k = 0; k < 3; k++) {
    for (let i = 0; i < 3; i++) {
      if (equals3(otrio_board[i][0][k], otrio_board[i][1][k], otrio_board[i][2][k])) {
        return otrio_board[i][0][k];
      }
    }
  }

  // Vertical
  for (let k = 0; k < 3; k++) {
    for (let i = 0; i < 3; i++) {
      if (equals3(otrio_board[0][i][k], otrio_board[1][i][k], otrio_board[2][i][k])) {
        return otrio_board[0][i][k];
      }
    }
  }

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      if (equals3(otrio_board[j][i][0], otrio_board[j][i][1], otrio_board[j][i][2])) {
        return otrio_board[j][i][0];
      }
    }
  }

  // 3D Diagonals
  if (equals3(otrio_board[0][0][0], otrio_board[1][1][1], otrio_board[2][2][2])) {
    return otrio_board[1][1][1];
  }
  else if (equals3(otrio_board[2][0][0], otrio_board[1][1][1], otrio_board[0][2][2])) {
    return otrio_board[1][1][1];
  }
  else if (equals3(otrio_board[0][0][2], otrio_board[1][1][1], otrio_board[2][2][0])) {
    return otrio_board[1][1][1];
  }
  else if (equals3(otrio_board[2][0][2], otrio_board[1][1][1], otrio_board[0][2][0])) {
    return otrio_board[1][1][1];
  }

  if ( (winner == null) && (P1Pieces == '') && (P2Pieces == '') ) {
    return 'tie';
  } 
  else {
    return winner;
  }
}


/* // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  if (winner == null && available.length == 0) {
    return 'tie';
  } else {
    return winner;
  }*/

  // Or this?
  // if ( (P1Pieces.length == 0) && (P2Pieces.length == 0) ) {
    // might need an isEmpty() function instead?



  /*if ( (winner == null) && (P1Pieces == null) && (P2Pieces == null) ) {
    return 'tie';
  }
  else {
  return winner;
  }
}
*/


// look for available spot for that type of piece
function getSpot(piece) {
  // console.log('In get spot with piece: ' + piece);
  if (piece == 0) return available0.splice(floor(random(available0.length)), 1)[0];
  else if (piece == 1) return available1.splice(floor(random(available1.length)), 1)[0];
  else if (piece == 2) return available2.splice(floor(random(available2.length)), 1)[0];
  else if (piece == 3) return available3.splice(floor(random(available3.length)), 1)[0];
}

// find random place to go
function nextTurn() {
  // console.log('next turn called for player: ' + currentPlayer);
  let piece = null;
  if (currentPlayer == 0) piece = P1Pieces.splice(floor(random(P1Pieces.length)), 1);
  else if (currentPlayer == 1) piece = P2Pieces.splice(floor(random(P2Pieces.length)), 1);
  else if (currentPlayer == 2) piece = P3Pieces.splice(floor(random(P3Pieces.length)), 1);
  else if (currentPlayer == 3) piece = P4Pieces.splice(floor(random(P4Pieces.length)), 1);
  // can piece ever equal null here? I dont think so but check later
  if (piece == '') {
    console.log('Game over, out of pieces');
    noLoop();
  }
  let spot = getSpot(piece);
  //if (spot == null) {remove();}
  let i = piece;
  let j = spot[0];
  let k = spot[1];
  // print('The board at ' + i + ',' + j + ',' + k + ' is now: ' + players[currentPlayer]);
  otrio_board[i][j][k] = players[currentPlayer]; 
  // claim that spot on board
  currentPlayer = (currentPlayer + 1) % players.length; // cycle through turns
}

/*function mousePressed() {
   nextTurn(); 
   // logBoard();
 }*/


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

  for (let j = 0; j < 3; j++) {
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < 3; i++) {
        let x = w * k + w / 2;
        let y = h * j + h / 2;
        let place = otrio_board[i][j][k];
        // textSize(32);
        if (place == players[0]) { fill(color('red'));} 
        else if (place == players[1]) { fill(color('green'));}
        else if (place == players[2]) { fill(color('blue'));}
        else if (place == players[3]) { fill(color('purple'));}
        else fill(color('white'));
        if (i==0) {ellipse(x, y, w / 1.2);}
        else if (i==1) {ellipse(x, y, w / 1.7);}
        else if (i==2) {ellipse(x, y, w / 3.1);}
      }
    }
  }

  //let result = checkWinner();
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html("Tie!")
    } else {
      resultP.html(`${result} wins!`);
    }
  } else {
    nextTurn();
  }

}