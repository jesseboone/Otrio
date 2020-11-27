console.log("evaluators.js");

function sum3(a, b, c) {
  return (a + b + c);
}

function traditionalEval(wentHere, otrio_board, player) { 
  // sum across all possible wins and returns result
  // basically just prioritizes going in important spots
  let sum = 
       (21*otrio_board[0] + 12*otrio_board[1] + 21*otrio_board[2]
      + 12*otrio_board[3] + 15*otrio_board[4] + 12*otrio_board[5]
      + 21*otrio_board[6] + 12*otrio_board[7] + 21*otrio_board[8]
      + 12*otrio_board[9] + 15*otrio_board[10] + 12*otrio_board[11]
      + 15*otrio_board[12] + 39*otrio_board[13] + 15*otrio_board[14]
      + 12*otrio_board[15] + 15*otrio_board[16] + 12*otrio_board[17]
      + 21*otrio_board[18] + 12*otrio_board[19] + 21*otrio_board[20]
      + 12*otrio_board[21] + 15*otrio_board[22] + 12*otrio_board[23]
      + 21*otrio_board[24] + 12*otrio_board[25] + 21*otrio_board[26]);
  return sum;
}

function equals3p(a, b, c, p) {
  return (a == p && a == b && b == c);
}

function equals2p(a, b, c, p) {
  if (a==p) {
    if ((b==p) || (c==p)) return true;
  }
  else if ((b==p) && (c==p)) return true;
  else return false;
}

function xinaRow(a, b, c, p) {
if (equals3p(a,b,c,p)) return 4096;
else if (equals2p(a,b,c,p)) return 64;
else if (equals3p(a,b,c,1)) return -4096; // need to make these two account
else if (equals2p(a,b,c,1)) return -64; // for any other player not just 1
else return 0;
}

function howManyPieces(board) {
  let pieces = 0;
 for(i=0;i<27;i++) {
  if (board[i] != 0) pieces+=1;
 }
 return pieces;
}

function eval1(wentHere, board, p) {
  let sum = 0;
  switch(wentHere) {
    case 0:
      sum += ((xinaRow(board[0],board[1],board[2],p)) + 
          (xinaRow(board[0],board[3],board[6],p)) + 
          (xinaRow(board[0],board[4],board[8],p)) + 
          (xinaRow(board[0],board[9],board[18],p)) + 
          (xinaRow(board[0],board[10],board[20],p)) + 
          (xinaRow(board[0],board[13],board[26],p)) + 
          (xinaRow(board[0],board[12],board[24],p)));
      break;
    case 1:
      sum += ((xinaRow(board[0],board[1],board[2],p)) + 
          (xinaRow(board[1],board[4],board[7],p)) + 
          (xinaRow(board[1],board[10],board[19],p)) + 
          (xinaRow(board[1],board[13],board[25],p)));
      break;
    case 2:
      sum += ((xinaRow(board[0],board[1],board[2],p)) + 
          (xinaRow(board[2],board[5],board[8],p)) + 
          (xinaRow(board[2],board[4],board[6],p)) + 
          (xinaRow(board[2],board[11],board[20],p)) + 
          (xinaRow(board[2],board[10],board[18],p)) + 
          (xinaRow(board[2],board[14],board[26],p)) + 
          (xinaRow(board[2],board[13],board[24],p)));
      break;
    case 3:
      sum += ((xinaRow(board[0],board[3],board[6],p)) + 
          (xinaRow(board[3],board[4],board[5],p)) + 
          (xinaRow(board[3],board[12],board[21],p)) + 
          (xinaRow(board[3],board[13],board[23],p)));
      break;
    case 4:
      sum += ((xinaRow(board[1],board[4],board[7],p)) + 
          (xinaRow(board[3],board[4],board[5],p)) + 
          (xinaRow(board[2],board[4],board[6],p)) + 
          (xinaRow(board[0],board[4],board[8],p)) +
          (xinaRow(board[4],board[13],board[22],p)));
      break;
    case 5:
      sum += ((xinaRow(board[2],board[5],board[8],p)) + 
          (xinaRow(board[3],board[4],board[5],p)) + 
          (xinaRow(board[5],board[13],board[21],p)) + 
          (xinaRow(board[5],board[14],board[23],p)));
      break;
    case 6:
      sum += ((xinaRow(board[0],board[3],board[6],p)) + 
          (xinaRow(board[6],board[7],board[8],p)) + 
          (xinaRow(board[2],board[4],board[6],p)) + 
          (xinaRow(board[6],board[13],board[20],p)) + 
          (xinaRow(board[6],board[15],board[24],p)) + 
          (xinaRow(board[6],board[12],board[18],p)) + 
          (xinaRow(board[6],board[16],board[26],p)));
      break;
    case 7:
      sum += ((xinaRow(board[6],board[7],board[8],p)) + 
          (xinaRow(board[1],board[4],board[7],p)) + 
          (xinaRow(board[7],board[13],board[19],p)) + 
          (xinaRow(board[7],board[16],board[25],p)));
      break;
    case 8:
      sum += ((xinaRow(board[2],board[5],board[8],p)) + 
          (xinaRow(board[6],board[7],board[8],p)) + 
          (xinaRow(board[0],board[4],board[8],p)) + 
          (xinaRow(board[8],board[14],board[20],p)) + 
          (xinaRow(board[8],board[16],board[24],p)) + 
          (xinaRow(board[8],board[13],board[18],p)) + 
          (xinaRow(board[8],board[17],board[26],p)));
      break;
    case 9:
      sum += ((xinaRow(board[9],board[10],board[11],p)) + 
          (xinaRow(board[9],board[12],board[15],p)) + 
          (xinaRow(board[9],board[13],board[17],p)) + 
          (xinaRow(board[0],board[9],board[18],p)));
      break;
    case 10:
      sum += ((xinaRow(board[9],board[10],board[11],p)) + 
          (xinaRow(board[10],board[13],board[16],p)) + 
          (xinaRow(board[18],board[10],board[2],p)) + 
          (xinaRow(board[0],board[10],board[20],p)) +
          (xinaRow(board[1],board[10],board[19],p)));
      break;
    case 11:
      sum += ((xinaRow(board[9],board[10],board[11],p)) + 
          (xinaRow(board[11],board[14],board[17],p)) + 
          (xinaRow(board[11],board[13],board[15],p)) + 
          (xinaRow(board[2],board[11],board[20],p)));
      break;
    case 12:
      sum += ((xinaRow(board[9],board[12],board[15],p)) + 
          (xinaRow(board[12],board[13],board[14],p)) + 
          (xinaRow(board[0],board[12],board[24],p)) + 
          (xinaRow(board[18],board[12],board[6],p)) +
          (xinaRow(board[3],board[12],board[21],p)));
      break;
    case 13:
      sum += ((xinaRow(board[0],board[13],board[26],p)) + 
          (xinaRow(board[9],board[13],board[17],p)) + 
          (xinaRow(board[18],board[13],board[8],p)) + 
          (xinaRow(board[1],board[13],board[25],p)) +
          (xinaRow(board[10],board[13],board[16],p)) + 
          (xinaRow(board[19],board[13],board[7],p)) + 
          (xinaRow(board[2],board[13],board[24],p)) +
          (xinaRow(board[11],board[13],board[15],p)) + 
          (xinaRow(board[20],board[13],board[6],p)) + 
          (xinaRow(board[3],board[13],board[23],p)) + 
          (xinaRow(board[12],board[13],board[14],p)) + 
          (xinaRow(board[21],board[13],board[5],p)) + 
          (xinaRow(board[4],board[13],board[22],p)));
      break;
    case 14:
      sum += ((xinaRow(board[11],board[14],board[17],p)) + 
          (xinaRow(board[12],board[13],board[14],p)) + 
          (xinaRow(board[2],board[14],board[26],p)) + 
          (xinaRow(board[20],board[14],board[8],p)) +
          (xinaRow(board[5],board[14],board[23],p)));
      break;
    case 15:
      sum += ((xinaRow(board[9],board[12],board[15],p)) + 
          (xinaRow(board[17],board[16],board[15],p)) + 
          (xinaRow(board[11],board[13],board[15],p)) + 
          (xinaRow(board[6],board[15],board[24],p)));
      break;
    case 16:
      sum += ((xinaRow(board[15],board[16],board[17],p)) + 
          (xinaRow(board[10],board[13],board[16],p)) + 
          (xinaRow(board[6],board[16],board[26],p)) + 
          (xinaRow(board[24],board[16],board[8],p)) +
          (xinaRow(board[7],board[16],board[25],p)));
      break;
    case 17:
      sum += ((xinaRow(board[11],board[14],board[17],p)) + 
          (xinaRow(board[17],board[16],board[15],p)) + 
          (xinaRow(board[9],board[13],board[17],p)) + 
          (xinaRow(board[8],board[17],board[26],p)));
      break;
    case 18:
      sum += ((xinaRow(board[18],board[19],board[20],p)) + 
          (xinaRow(board[18],board[21],board[24],p)) + 
          (xinaRow(board[18],board[22],board[26],p)) + 
          (xinaRow(board[18],board[10],board[2],p)) + 
          (xinaRow(board[18],board[13],board[8],p)) + 
          (xinaRow(board[18],board[12],board[6],p)) + 
          (xinaRow(board[18],board[9],board[0],p)));
      break;
    case 19:
      sum += ((xinaRow(board[18],board[19],board[20],p)) + 
          (xinaRow(board[19],board[22],board[25],p)) + 
          (xinaRow(board[19],board[10],board[1],p)) + 
          (xinaRow(board[19],board[13],board[7],p)));
      break;
    case 20:
      sum += ((xinaRow(board[18],board[19],board[20],p)) + 
          (xinaRow(board[20],board[22],board[24],p)) + 
          (xinaRow(board[20],board[23],board[26],p)) + 
          (xinaRow(board[20],board[10],board[0],p)) + 
          (xinaRow(board[20],board[13],board[6],p)) + 
          (xinaRow(board[20],board[14],board[8],p)) + 
          (xinaRow(board[20],board[11],board[2],p)));
      break;
    case 21:
      sum += ((xinaRow(board[18],board[21],board[24],p)) + 
          (xinaRow(board[21],board[22],board[23],p)) + 
          (xinaRow(board[21],board[12],board[3],p)) + 
          (xinaRow(board[21],board[13],board[5],p)));
      break;
    case 22:
      sum += ((xinaRow(board[21],board[22],board[23],p)) + 
          (xinaRow(board[19],board[22],board[25],p)) + 
          (xinaRow(board[18],board[22],board[26],p)) + 
          (xinaRow(board[20],board[22],board[24],p)) +
          (xinaRow(board[4],board[13],board[22],p)));
      break;
    case 23:
      sum += ((xinaRow(board[20],board[23],board[26],p)) + 
          (xinaRow(board[21],board[22],board[23],p)) + 
          (xinaRow(board[23],board[14],board[5],p)) + 
          (xinaRow(board[23],board[13],board[3],p)));
      break;
    case 24:
      sum += ((xinaRow(board[18],board[21],board[24],p)) + 
          (xinaRow(board[20],board[22],board[24],p)) + 
          (xinaRow(board[24],board[25],board[26],p)) + 
          (xinaRow(board[24],board[15],board[6],p)) + 
          (xinaRow(board[24],board[12],board[0],p)) + 
          (xinaRow(board[24],board[13],board[2],p)) + 
          (xinaRow(board[24],board[16],board[8],p)));
      break;
    case 25:
      sum += ((xinaRow(board[19],board[22],board[25],p)) + 
          (xinaRow(board[24],board[25],board[26],p)) + 
          (xinaRow(board[25],board[16],board[7],p)) + 
          (xinaRow(board[25],board[13],board[1],p)));
      break;
    case 26:
      sum += ((xinaRow(board[18],board[22],board[26],p)) + 
          (xinaRow(board[24],board[25],board[26],p)) + 
          (xinaRow(board[20],board[23],board[26],p)) + 
          (xinaRow(board[26],board[17],board[8],p)) + 
          (xinaRow(board[26],board[13],board[0],p)) + 
          (xinaRow(board[26],board[14],board[2],p)) + 
          (xinaRow(board[26],board[16],board[6],p)));
      break;
      default:
  }
  console.log(board);
  console.log("pieces: " + howManyPieces(board));
  console.log(sum);
  return sum;
}
