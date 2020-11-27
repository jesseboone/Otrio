console.log("minimax.js");

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
}

let evalfunval = 0;
function useResults(err, results) {
 // console.log(results[0][0]);
 evalfunval = results[0][0];
}

function evaluate(lastSpot, board, pieces, player) {
  // console.log(board);

  // nn.predict(board.concat(), useResults);
  // evalfunval = traditionalEval(lastSpot, board, player);
  evalfunval = eval1(lastSpot, board, player);

  return evalfunval;


  /*
  Return number representing how good this board is for player
  */
  // let winner = checkWinner(lastSpot, board, pieces);
  // if (winner == player) {
  //   return Number.MAX_VALUE;
  // } else if (winner == null) {
  //   return 0;
  // } else if (winner == 'tie') {
  //   return -1;
  // } else { // winner != player but a player has won
  //   return -Number.MIN_VALUE;
  // }
}

function minimax(lastSpot, board, pieces, turn, player, depth, min, max) {
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
  // console.log("lastSpot: " + lastSpot);
  minimax_calls[depth]++;
  if (is_terminal_state(lastSpot, board, pieces) || depth == 0) {
    return evaluate(lastSpot, board, pieces, player);
  }
  
  let available = availableSpots(board);
  let board_copy = board.concat(); 
  let pieces_copy = deepCopy2DArray(pieces);
  let next_turn = (currentPlayer + 1) % players.length;
  if (turn == player) { // max node
    let score = min;
    for (let i = 0; i < available.length; i++) {
      if (eligibleMove(available[i], board, pieces[turn])) {
        // create child gamestate
        board_copy[available[i]] = players[turn];
        pieces_copy[currentPlayer][floor(available[i] / 9)]--;
        // find child score
        let temp_score = minimax(available[i], board_copy, pieces_copy, next_turn, player, depth - 1, score, max);
        if (temp_score > score) {
          score = temp_score;
        }
        if (score > max) {
          return max;
        }
      }
    }
    return score;
  } else { // min node
    let score = max;
    for (let i = 0; i < available.length; i++) {
      if (eligibleMove(available[i], board, pieces[turn])) {
        // create child gamestate
        board_copy[available[i]] = players[turn];
        pieces_copy[currentPlayer][floor(available[i] / 9)]--;
        // find child score
        let temp_score = minimax(available[i], board_copy, pieces_copy, next_turn, player, depth - 1, min, score);
        if (temp_score < score) {
          score = temp_score;
        }
        if (score < min) {
          return min;
        }
      }
    }
    return score;
  }
}