let minimax_calls = {0: 0, 1: 0, 2: 0};

function is_terminal_state(lastSpot, board, pieces) {
  /* 
  if all players are out of pieces
    return true
  else if theres a three in a row somewhere
    return true
  else
    return false
  */
  let total = 0; // count of pieces remaining
  for (let i = 0; i < pieces.length; i++) {
    total += pieces[i].reduce((acc, x) => acc + x);
  }
  if (total == 0) { // all players are OUT
    return true;
  }

  if (checkWinner(lastSpot, board, pieces) != null) {
    return true;
  } else {
    return false;
  }

  // 27 + 27 + 27 + 6 + 6 + 6 + 4 = 103 possible ways to make 3 in a row
  threeInARow = false;

  // wrt ringVals, these go left to right
  for (let i = 0; i < 27; i += 3) {
    if (equals3(board[i], board[i+1], board[i+2])) {
      threeInARow = true;
      break;
    }
  }
  if (threeInARow) return true;

  // wrt ringVals, these go top to bottom
  for (let i = 18; i < 27; i += 1) {
    if (equals3(board[i], board[i-9], board[i-18])) {
      threeInARow = true;
      break;
    }
  }
  if (threeInARow) return true;

  // wrt ringVals, these go front to back
  [6, 7, 8, 15, 16, 17, 24, 25, 26].forEach(i => {
    if (equals3(board[i], board[i-3], board[i=6])) {
      threeInARow = true;
    }
  });
  if (threeInARow) return true;

  // criss crosses
  [18, 21, 24].forEach(i => { // top left to bottom right
    if (equals3(board[i], board[i-8], board[i-16])) {
      threeInARow = true;
    }
  });
  [20, 23, 26].forEach(i => { // top right to bottom left
    if (equals3(board[i], board[i-10], board[i-20])) {
      threeInARow = true;
    }
  });
  [18, 19, 20].forEach(i => { // top back to bottom front
    if (equals3(board[i], board[i-6], board[i-12])) {
      threeInARow = true;
    }
  });
  [24, 25, 26].forEach(i => { // top front to bottom back
    if (equals3(board[i], board[i-12], board[i-24])) {
      threeInARow = true;
    }
  });
  [0, 9, 18].forEach(i => { // back left to front right
    if (equals3(board[i], board[i+4], board[i+8])) {
      threeInARow = true;
    }
  });
  [6, 15, 24].forEach(i => { // front left to back right
    if (equals3(board[i], board[i-2], board[i-4])) {
      threeInARow = true;
    }
  });
  if (threeInARow) return true;

  // four corner diagonals
  threeInARow = equals3(board[0], board[13], board[26])
                || equals3(board[2], board[13], board[24])
                || equals3(board[18], board[13], board[8])
                || equals3(board[20], board[13], board[6]);

  return threeInARow;
}

function evaluate(lastSpot, board, pieces, player) {
  /*
  Return number representing how good this board is for player
  */
  let winner = checkWinner(lastSpot, board, pieces);
  if (winner == player) {
    return Number.MAX_VALUE;
  } else if (winner == null) {
    return 0;
  } else if (winner == 'tie') {
    return -1;
  } else { // winner != player but a player has won
    return -Number.MIN_VALUE;
  }
}

function minimax(lastSpot, board, pieces, turn, player, depth) {
  /*
   * I'm sorry sober me
   *
   * lastSpot - the last move made on board. Useful for more efficiently checking the board for winners
   * board - a copy of the gameboard. BE SURE TO MAKE A COPY WHEN YOU PASS because javascript passes arrays by reference
   * pieces - a copy of the game pieces. Same warning as board
   * turn - who's turn is it?
   * player - currentPlayer for whom we are evaluating games
   * depth - how many plies deep we want to go
   *
   * Great reference: https://www.cs.cornell.edu/courses/cs312/2002sp/lectures/rec21.htm
   */
  minimax_calls[depth]++;
  if (is_terminal_state(lastSpot, board, pieces) || depth == 0) {
    return evaluate(lastSpot, board, pieces, player);
  }
  
  let available = availableSpots(board);
  if (turn == player) { // max node
    let score = -Number.MIN_VALUE;
    for (let i = 0; i < available.length; i++) {
      if (eligibleMove(available[i], board, pieces[turn])) {
        // create child gamestate
        let board_copy = board.concat(); // call concat with no args to make a copy
        board_copy[available[i]] = players[turn];
        let pieces_copy = deepCopy2DArray(pieces);
        pieces_copy[currentPlayer][floor(available[i] / 9)]--;
        let next_turn = (currentPlayer + 1) % players.length;
        // find child score
        let temp_score = minimax(available[i], board_copy, pieces_copy, next_turn, player, depth - 1);
        if (temp_score > score) {
          score = temp_score;
        }
      }
    }
    if (score == Number.MIN_VALUE) print('minimax broke: score == min_value');
    return score;
  } else { // min node
    let score = Number.MAX_VALUE;
    for (let i = 0; i < available.length; i++) {
      if (eligibleMove(available[i], board, pieces[turn])) {
        // create child gamestate
        let board_copy = board.concat(); // call concat with no args to make a copy
        board_copy[available[i]] = players[turn];
        let pieces_copy = deepCopy2DArray(pieces);
        pieces_copy[currentPlayer][floor(available[i] / 9)]--;
        let next_turn = (currentPlayer + 1) % players.length;
        // find child score
        let temp_score = minimax(available[i], board_copy, pieces_copy, next_turn, player, depth - 1);
        if (temp_score < score) {
          score = temp_score;
        }
        // if v' < v, v := v'
      }
    }
    if (score == Number.MAX_VALUE) print('minimax broke: score == max_value');
    return score;
  }
}