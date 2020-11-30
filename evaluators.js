console.log("evaluators.js");

function sum3(a, b, c) {
  return (a + b + c);
}

function traditionalEval(wentHere, otrio_board, player) { 
  // sum across all possible wins and returns result
  // basically just prioritizes going in important spots
  board = otrio_board.concat();
  for (var i = board.length - 1; i >= 0; i--) {
    if(board[i] != player) board[i] = 0;
  }
  let sum = 
       (21*board[0] + 12*board[1] + 21*board[2]
      + 12*board[3] + 15*board[4] + 12*board[5]
      + 21*board[6] + 12*board[7] + 21*board[8]
      + 12*board[9] + 15*board[10] + 12*board[11]
      + 15*board[12] + 39*board[13] + 15*board[14]
      + 12*board[15] + 15*board[16] + 12*board[17]
      + 21*board[18] + 12*board[19] + 21*board[20]
      + 12*board[21] + 15*board[22] + 12*board[23]
      + 21*board[24] + 12*board[25] + 21*board[26]);
  return sum;
}

function equals3p(a, b, c, p) {
  // console.log((a == p && a == b && b == c));
  return (a == p && a == b && b == c);
}

function equals2p(a, b, c, p) {
  if (a==p) {
    if ((b==p) || (c==p)) return true;
  }
  else if ((b==p) && (c==p)) return true;
  else return false;
}

function equals1p(a, b, c, p) {
  if ((a == p) && (b==c) && (c==0)) return true;
  else if ((b == p) && (a==c) && (c==0)) return true;
  else if ((c == p) && (a==b) && (b==0)) return true;
  else return false;
}

function xinaRow(a, b, c, p) {
  if (equals3p(a,b,c,p)) return 4089;
  else if (equals3p(a,b,c,1)) return -2086; // add a for each other player loop for this one 
  else if (equals2p(a,b,c,p)) return 129;
  else if (equals2p(a,b,c,1)) return -64; // and this -64
  else if (equals1p(a,b,c,p)) return 1;
  else if (equals1p(a,b,c,1)) return -1;
  else return 0;
}

// works alright when depth of minimax = 0, after that it gets weird
function eval1(board, p) {
  let sum = 0;
  // board[wentHere] = p; // already done by minimax
  sum = 
    // every row
    (xinaRow(board[0],board[1],board[2],p)) + 
    (xinaRow(board[3],board[4],board[5],p)) + 
    (xinaRow(board[6],board[7],board[8],p)) + 
    (xinaRow(board[9],board[10],board[11],p)) + 
    (xinaRow(board[12],board[13],board[14],p)) + 
    (xinaRow(board[15],board[16],board[17],p)) + 
    (xinaRow(board[18],board[19],board[20],p)) +
    (xinaRow(board[21],board[22],board[23],p)) + 
    (xinaRow(board[24],board[25],board[26],p)) + 
    // every column
    (xinaRow(board[0],board[3],board[6],p)) + 
    (xinaRow(board[1],board[4],board[7],p)) + 
    (xinaRow(board[2],board[5],board[8],p)) + 
    (xinaRow(board[9],board[12],board[15],p)) + 
    (xinaRow(board[10],board[13],board[16],p)) +
    (xinaRow(board[11],board[14],board[17],p)) + 
    (xinaRow(board[18],board[21],board[24],p)) + 
    (xinaRow(board[19],board[22],board[25],p)) + 
    (xinaRow(board[20],board[23],board[26],p)) + 
    // every stack
    (xinaRow(board[0],board[9],board[18],p)) + 
    (xinaRow(board[1],board[10],board[19],p)) + 
    (xinaRow(board[2],board[11],board[20],p)) + 
    (xinaRow(board[3],board[12],board[21],p)) + 
    (xinaRow(board[4],board[13],board[22],p)) +
    (xinaRow(board[5],board[14],board[23],p)) + 
    (xinaRow(board[6],board[15],board[24],p)) + 
    (xinaRow(board[7],board[16],board[25],p)) + 
    (xinaRow(board[8],board[17],board[26],p)) + 
    // horizontal diagonals
    (xinaRow(board[0],board[10],board[20],p)) + 
    (xinaRow(board[3],board[13],board[23],p)) + 
    (xinaRow(board[6],board[16],board[26],p)) +
    (xinaRow(board[18],board[10],board[2],p)) + 
    (xinaRow(board[21],board[13],board[5],p)) + 
    (xinaRow(board[24],board[16],board[8],p)) +
    // vertical diagonals
    (xinaRow(board[0],board[12],board[24],p)) + 
    (xinaRow(board[1],board[13],board[25],p)) + 
    (xinaRow(board[2],board[14],board[26],p)) +
    (xinaRow(board[18],board[12],board[6],p)) + 
    (xinaRow(board[19],board[13],board[7],p)) + 
    (xinaRow(board[20],board[14],board[8],p)) +
    // x-cross diagonals
    (xinaRow(board[0],board[13],board[26],p)) + 
    (xinaRow(board[18],board[13],board[8],p)) + 
    (xinaRow(board[2],board[13],board[24],p)) + 
    (xinaRow(board[20],board[13],board[6],p));

  return sum;
}

function potentialWin(a, b, p) {
  return( ((a==0) && (b==p)) || ((b==0) && (a==p)) );
}

function check2Win(move, board, p) {
  // THIS FUNCTION HAS A BUG -- IT DOES NOT CHECK IF THE PLAYER HAS THE PIECES, IT JUST ASSUMES IT DOES
  let sum = 0;
  switch(move) {
    case 0:
      sum += (potentialWin(otrio_board[1],otrio_board[2],p)) + 
          (potentialWin(otrio_board[3],otrio_board[6],p)) + 
          (potentialWin(otrio_board[4],otrio_board[8],p)) + 
          (potentialWin(otrio_board[9],otrio_board[18],p)) + 
          (potentialWin(otrio_board[10],otrio_board[20],p)) + 
          (potentialWin(otrio_board[13],otrio_board[26],p)) + 
          (potentialWin(otrio_board[12],otrio_board[24],p));
      break;
    case 1:
      sum += (potentialWin(otrio_board[0],otrio_board[2],p)) + 
          (potentialWin(otrio_board[4],otrio_board[7],p)) + 
          (potentialWin(otrio_board[10],otrio_board[19],p)) + 
          (potentialWin(otrio_board[13],otrio_board[25],p));
      break;
    case 2:
      sum += (potentialWin(otrio_board[1],otrio_board[0],p)) + 
          (potentialWin(otrio_board[5],otrio_board[8],p)) + 
          (potentialWin(otrio_board[4],otrio_board[6],p)) + 
          (potentialWin(otrio_board[11],otrio_board[20],p)) + 
          (potentialWin(otrio_board[10],otrio_board[18],p)) + 
          (potentialWin(otrio_board[14],otrio_board[26],p)) + 
          (potentialWin(otrio_board[13],otrio_board[24],p));
      break;
    case 3:
      sum += (potentialWin(otrio_board[0],otrio_board[6],p)) + 
          (potentialWin(otrio_board[4],otrio_board[5],p)) + 
          (potentialWin(otrio_board[12],otrio_board[21],p)) + 
          (potentialWin(otrio_board[13],otrio_board[23],p));
      break;
    case 4:
      sum += (potentialWin(otrio_board[1],otrio_board[7],p)) + 
          (potentialWin(otrio_board[3],otrio_board[5],p)) + 
          (potentialWin(otrio_board[2],otrio_board[6],p)) + 
          (potentialWin(otrio_board[0],otrio_board[8],p)) +
          (potentialWin(otrio_board[13],otrio_board[22],p));
      break;
    case 5:
      sum += (potentialWin(otrio_board[2],otrio_board[8],p)) + 
          (potentialWin(otrio_board[4],otrio_board[3],p)) + 
          (potentialWin(otrio_board[13],otrio_board[21],p)) + 
          (potentialWin(otrio_board[14],otrio_board[23],p));
      break;
    case 6:
      sum += (potentialWin(otrio_board[3],otrio_board[0],p)) + 
          (potentialWin(otrio_board[7],otrio_board[8],p)) + 
          (potentialWin(otrio_board[4],otrio_board[2],p)) + 
          (potentialWin(otrio_board[13],otrio_board[20],p)) + 
          (potentialWin(otrio_board[15],otrio_board[24],p)) + 
          (potentialWin(otrio_board[12],otrio_board[18],p)) + 
          (potentialWin(otrio_board[16],otrio_board[26],p));
      break;
    case 7:
      sum += (potentialWin(otrio_board[6],otrio_board[8],p)) + 
          (potentialWin(otrio_board[4],otrio_board[1],p)) + 
          (potentialWin(otrio_board[13],otrio_board[19],p)) + 
          (potentialWin(otrio_board[16],otrio_board[25],p));
      break;
    case 8:
      sum += (potentialWin(otrio_board[5],otrio_board[2],p)) + 
          (potentialWin(otrio_board[7],otrio_board[6],p)) + 
          (potentialWin(otrio_board[4],otrio_board[0],p)) + 
          (potentialWin(otrio_board[14],otrio_board[20],p)) + 
          (potentialWin(otrio_board[16],otrio_board[24],p)) + 
          (potentialWin(otrio_board[13],otrio_board[18],p)) + 
          (potentialWin(otrio_board[17],otrio_board[26],p));
      break;
    case 9:
      sum += (potentialWin(otrio_board[10],otrio_board[11],p)) + 
          (potentialWin(otrio_board[12],otrio_board[15],p)) + 
          (potentialWin(otrio_board[13],otrio_board[17],p)) + 
          (potentialWin(otrio_board[0],otrio_board[18],p));
      break;
    case 10:
      sum += (potentialWin(otrio_board[9],otrio_board[11],p)) + 
          (potentialWin(otrio_board[13],otrio_board[16],p)) + 
          (potentialWin(otrio_board[18],otrio_board[2],p)) + 
          (potentialWin(otrio_board[0],otrio_board[20],p)) +
          (potentialWin(otrio_board[1],otrio_board[19],p));
      break;
    case 11:
      sum += (potentialWin(otrio_board[10],otrio_board[9],p)) + 
          (potentialWin(otrio_board[14],otrio_board[17],p)) + 
          (potentialWin(otrio_board[13],otrio_board[15],p)) + 
          (potentialWin(otrio_board[2],otrio_board[20],p));
      break;
    case 12:
      sum += (potentialWin(otrio_board[9],otrio_board[15],p)) + 
          (potentialWin(otrio_board[13],otrio_board[14],p)) + 
          (potentialWin(otrio_board[0],otrio_board[24],p)) + 
          (potentialWin(otrio_board[18],otrio_board[6],p)) +
          (potentialWin(otrio_board[3],otrio_board[21],p));
      break;
    case 13:
      sum += (potentialWin(otrio_board[0],otrio_board[26],p)) + 
          (potentialWin(otrio_board[9],otrio_board[17],p)) + 
          (potentialWin(otrio_board[18],otrio_board[8],p)) + 
          (potentialWin(otrio_board[1],otrio_board[25],p)) +
          (potentialWin(otrio_board[10],otrio_board[16],p)) + 
          (potentialWin(otrio_board[19],otrio_board[7],p)) + 
          (potentialWin(otrio_board[2],otrio_board[24],p)) +
          (potentialWin(otrio_board[11],otrio_board[15],p)) + 
          (potentialWin(otrio_board[20],otrio_board[6],p)) + 
          (potentialWin(otrio_board[3],otrio_board[23],p)) + 
          (potentialWin(otrio_board[12],otrio_board[14],p)) + 
          (potentialWin(otrio_board[21],otrio_board[5],p)) + 
          (potentialWin(otrio_board[4],otrio_board[22],p));
      break;
    case 14:
      sum += (potentialWin(otrio_board[11],otrio_board[17],p)) + 
          (potentialWin(otrio_board[12],otrio_board[13],p)) + 
          (potentialWin(otrio_board[2],otrio_board[26],p)) + 
          (potentialWin(otrio_board[20],otrio_board[8],p)) +
          (potentialWin(otrio_board[5],otrio_board[23],p));
      break;
    case 15:
      sum += (potentialWin(otrio_board[9],otrio_board[12],p)) + 
          (potentialWin(otrio_board[17],otrio_board[16],p)) + 
          (potentialWin(otrio_board[11],otrio_board[13],p)) + 
          (potentialWin(otrio_board[6],otrio_board[24],p));
      break;
    case 16:
      sum += (potentialWin(otrio_board[15],otrio_board[17],p)) + 
          (potentialWin(otrio_board[10],otrio_board[13],p)) + 
          (potentialWin(otrio_board[6],otrio_board[26],p)) + 
          (potentialWin(otrio_board[24],otrio_board[8],p)) +
          (potentialWin(otrio_board[7],otrio_board[25],p));
      break;
    case 17:
      sum += (potentialWin(otrio_board[11],otrio_board[14],p)) + 
          (potentialWin(otrio_board[16],otrio_board[15],p)) + 
          (potentialWin(otrio_board[9],otrio_board[13],p)) + 
          (potentialWin(otrio_board[8],otrio_board[26],p));
      break;
    case 18:
      sum += (potentialWin(otrio_board[19],otrio_board[20],p)) + 
          (potentialWin(otrio_board[21],otrio_board[24],p)) + 
          (potentialWin(otrio_board[22],otrio_board[26],p)) + 
          (potentialWin(otrio_board[10],otrio_board[2],p)) + 
          (potentialWin(otrio_board[13],otrio_board[8],p)) + 
          (potentialWin(otrio_board[12],otrio_board[6],p)) + 
          (potentialWin(otrio_board[9],otrio_board[0],p));
      break;
    case 19:
      sum += (potentialWin(otrio_board[18],otrio_board[20],p)) + 
          (potentialWin(otrio_board[22],otrio_board[25],p)) + 
          (potentialWin(otrio_board[10],otrio_board[1],p)) + 
          (potentialWin(otrio_board[13],otrio_board[7],p));
      break;
    case 20:
      sum += (potentialWin(otrio_board[19],otrio_board[18],p)) + 
          (potentialWin(otrio_board[22],otrio_board[24],p)) + 
          (potentialWin(otrio_board[23],otrio_board[26],p)) + 
          (potentialWin(otrio_board[10],otrio_board[0],p)) + 
          (potentialWin(otrio_board[13],otrio_board[6],p)) + 
          (potentialWin(otrio_board[14],otrio_board[8],p)) + 
          (potentialWin(otrio_board[11],otrio_board[2],p));
      break;
    case 21:
      sum += (potentialWin(otrio_board[18],otrio_board[24],p)) + 
          (potentialWin(otrio_board[22],otrio_board[23],p)) + 
          (potentialWin(otrio_board[12],otrio_board[3],p)) + 
          (potentialWin(otrio_board[13],otrio_board[5],p));
      break;
    case 22:
      sum += (potentialWin(otrio_board[21],otrio_board[23],p)) + 
          (potentialWin(otrio_board[19],otrio_board[25],p)) + 
          (potentialWin(otrio_board[18],otrio_board[26],p)) + 
          (potentialWin(otrio_board[20],otrio_board[24],p)) +
          (potentialWin(otrio_board[4],otrio_board[13],p));
      break;
    case 23:
      sum += (potentialWin(otrio_board[20],otrio_board[26],p)) + 
          (potentialWin(otrio_board[21],otrio_board[22],p)) + 
          (potentialWin(otrio_board[14],otrio_board[5],p)) + 
          (potentialWin(otrio_board[13],otrio_board[3],p));
      break;
    case 24:
      sum += (potentialWin(otrio_board[18],otrio_board[21],p)) + 
          (potentialWin(otrio_board[20],otrio_board[22],p)) + 
          (potentialWin(otrio_board[25],otrio_board[26],p)) + 
          (potentialWin(otrio_board[15],otrio_board[6],p)) + 
          (potentialWin(otrio_board[12],otrio_board[0],p)) + 
          (potentialWin(otrio_board[13],otrio_board[2],p)) + 
          (potentialWin(otrio_board[16],otrio_board[8],p));
      break;
    case 25:
      sum += (potentialWin(otrio_board[19],otrio_board[22],p)) + 
          (potentialWin(otrio_board[24],otrio_board[26],p)) + 
          (potentialWin(otrio_board[16],otrio_board[7],p)) + 
          (potentialWin(otrio_board[13],otrio_board[1],p));
      break;
    case 26:
      sum += (potentialWin(otrio_board[18],otrio_board[22],p)) + 
          (potentialWin(otrio_board[24],otrio_board[25],p)) + 
          (potentialWin(otrio_board[20],otrio_board[23],p)) + 
          (potentialWin(otrio_board[17],otrio_board[8],p)) + 
          (potentialWin(otrio_board[13],otrio_board[0],p)) + 
          (potentialWin(otrio_board[14],otrio_board[2],p)) + 
          (potentialWin(otrio_board[16],otrio_board[6],p));
      break;
    default:
  }
  return (sum>=2);
}

function logical (available) {
  let undecided = true;
  let nextPl = (currentPlayer+1)%players.length;
  // if theres a spot you can win in, go there
  if(undecided) {
    for (let i = 0; i < available.length; i++) {
      let available_piece = floor(available[i] / 9); // get which piece this is
      if (pieces[currentPlayer][available_piece] > 0) { // if we still have pieces of this size
        otrio_board[available[i]] = players[currentPlayer]; // put the piece there
        // spot = available[i]; // trying to save it from going where human just went
        if(checkWinner(available[i], otrio_board) == players[currentPlayer]) { // check if that wins
          otrio_board[available[i]] = 0;
          spot = available[i]; // if it does, lets go there
          pieces[currentPlayer][available_piece]--; // take away from pieces (uneccessary but right)
          undecided = false;
          break;
        }
        else otrio_board[available[i]] = 0; // otherwise put the board back
      }
    }
  }
  // if not, but theres a spot opponent can win in, go there
  if(undecided) {
    for (let i = 0; i < available.length; i++) {
      let available_piece = floor(available[i] / 9); // get which piece this is
      if ((pieces[nextPl][available_piece] > 0) && (pieces[currentPlayer][available_piece] > 0)) { // if both still have pieces of this size
        otrio_board[available[i]] = players[nextPl]; // put the piece there
        // spot = available[i]; // shouldn't need this again...right?
        if(checkWinner(available[i], otrio_board) == players[nextPl]) { // check if that wins for enemy
          otrio_board[available[i]] = 0; 
          spot = available[i]; // if it does, lets go there
          pieces[currentPlayer][available_piece]--; // take away from pieces
          undecided = false;
          break;
        }
        else otrio_board[available[i]] = 0; // otherwise put the board back
      }
    }
  }
  // if theres a spot that can give you two winning spots, go there
  if(undecided) {
    for (let i = 0; i < available.length; i++) {
      let available_piece = floor(available[i] / 9); // get which piece this is
      if (pieces[currentPlayer][available_piece] > 0) { // if we still have pieces of this size
        otrio_board[available[i]] = players[currentPlayer]; // put the piece there
        // spot = available[i]; 
        if(check2Win(available[i], otrio_board, players[currentPlayer])) { // check if that has 2 winnning moves
          otrio_board[available[i]] = 0; // put board back to how it was
          spot = available[i]; // if it does, lets go there
          pieces[currentPlayer][available_piece]--; // take away from pieces
          undecided = false;
          break;
        }
        else otrio_board[available[i]] = 0; // otherwise put the board back
      }
    }
  }
  // if theres a spot that can give opponent two winning spots, go there
  if(undecided) {
    for (let i = 0; i < available.length; i++) {
      let available_piece = floor(available[i] / 9); // get which piece this is
      if (pieces[nextPl][available_piece] > 0) { // if we still have pieces of this size
        otrio_board[available[i]] = players[nextPl]; // put the piece there
        // spot = available[i]; 
        if(check2Win(available[i], otrio_board, players[nextPl])) { // check if that has 2 winnning moves
          otrio_board[available[i]] = 0; // put board back to how it was
          spot = available[i]; // if it does, lets go there
          pieces[currentPlayer][available_piece]--; // take away from pieces
          undecided = false;
          break;
        }
        else otrio_board[available[i]] = 0; // otherwise put the board back
      }
    }
  }
  // default priority locations
  if(undecided) {
    if(otrio_board[13]==0) {
      spot = 13;
      pieces[currentPlayer][1]--;
    }
    else { 
      let corners = [0,2,6,8,18,20,24,26]
      for (let i = corners.length - 1; i >= 0; i--) {
        if(otrio_board[corners[i]]==0) {
          spot = corners[i];
          pieces[currentPlayer][floor(corners[i]/9)]--;
          undecided = false;
          break;
        }
      }
    }
  }
}
