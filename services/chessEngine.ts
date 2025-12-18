import { Chess, Move } from 'chess.js';

// --- Evaluation Heuristics ---

const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Piece-Square Tables (Simplified for brevity but effective)
// These encourage pieces to move to better squares (e.g., Knights to center, Pawns forward)
const PAWN_PST = [
  0,  0,  0,  0,  0,  0,  0,  0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5,  5, 10, 25, 25, 10,  5,  5,
  0,  0,  0, 20, 20,  0,  0,  0,
  5, -5,-10,  0,  0,-10, -5,  5,
  5, 10, 10,-20,-20, 10, 10,  5,
  0,  0,  0,  0,  0,  0,  0,  0
];

const KNIGHT_PST = [
  -50,-40,-30,-30,-30,-30,-40,-50,
  -40,-20,  0,  0,  0,  0,-20,-40,
  -30,  0, 10, 15, 15, 10,  0,-30,
  -30,  5, 15, 20, 20, 15,  5,-30,
  -30,  0, 15, 20, 20, 15,  0,-30,
  -30,  5, 10, 15, 15, 10,  5,-30,
  -40,-20,  0,  5,  5,  0,-20,-40,
  -50,-40,-30,-30,-30,-30,-40,-50
];

const BISHOP_PST = [
  -20,-10,-10,-10,-10,-10,-10,-20,
  -10,  0,  0,  0,  0,  0,  0,-10,
  -10,  0,  5, 10, 10,  5,  0,-10,
  -10,  5,  5, 10, 10,  5,  5,-10,
  -10,  0, 10, 10, 10, 10,  0,-10,
  -10, 10, 10, 10, 10, 10, 10,-10,
  -10,  5,  0,  0,  0,  0,  5,-10,
  -20,-10,-10,-10,-10,-10,-10,-20
];

const MIRROR_SQUARE = [
  56, 57, 58, 59, 60, 61, 62, 63,
  48, 49, 50, 51, 52, 53, 54, 55,
  40, 41, 42, 43, 44, 45, 46, 47,
  32, 33, 34, 35, 36, 37, 38, 39,
  24, 25, 26, 27, 28, 29, 30, 31,
  16, 17, 18, 19, 20, 21, 22, 23,
  8,  9, 10, 11, 12, 13, 14, 15,
  0,  1,  2,  3,  4,  5,  6,  7
];

function evaluateBoard(game: Chess): number {
  let totalEvaluation = 0;
  const board = game.board();

  // Iterate through 8x8 board
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const squareIndex = i * 8 + j;
        // Use basic material value
        let value = PIECE_VALUES[piece.type];
        
        // Add positional value
        let positionBonus = 0;
        const isWhite = piece.color === 'w';
        
        // Adjust index for Black to mirror the board
        const pstIndex = isWhite ? squareIndex : MIRROR_SQUARE[squareIndex];

        switch (piece.type) {
          case 'p': positionBonus = PAWN_PST[pstIndex]; break;
          case 'n': positionBonus = KNIGHT_PST[pstIndex]; break;
          case 'b': positionBonus = BISHOP_PST[pstIndex]; break;
          // Simple centrality bonus for others
          default: positionBonus = 0; break; 
        }

        const absoluteValue = value + positionBonus;
        totalEvaluation += isWhite ? absoluteValue : -absoluteValue;
      }
    }
  }
  return totalEvaluation;
}

// --- Minimax Engine ---

function minimax(
  game: Chess, 
  depth: number, 
  alpha: number, 
  beta: number, 
  isMaximizingPlayer: boolean
): number {
  if (depth === 0 || game.isGameOver()) {
    return -evaluateBoard(game); // Negate because eval function is from White's perspective, but engine plays Black usually
  }

  const moves = game.moves();

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evalValue = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evalValue);
      alpha = Math.max(alpha, evalValue);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evalValue = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evalValue);
      beta = Math.min(beta, evalValue);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export const getBestMove = async (
  fen: string,
  validMoves: string[],
  difficulty: 'novice' | 'expert' | 'grandmaster'
): Promise<{ move: string }> => {
  // We use a Promise to not block the main thread immediately, 
  // though JS is single threaded. In a full app, this should be in a Web Worker.
  return new Promise((resolve) => {
    setTimeout(() => {
      const game = new Chess(fen);
      const moves = game.moves();
      
      if (moves.length === 0) {
        resolve({ move: '' });
        return;
      }

      // NOVICE: Random move
      if (difficulty === 'novice') {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        resolve({ move: randomMove });
        return;
      }

      // SET DEPTH
      let depth = 2; // Expert
      if (difficulty === 'grandmaster') depth = 3; 

      let bestMove = '';
      let bestValue = -Infinity;
      let alpha = -Infinity;
      let beta = Infinity;

      // Shuffle moves to add variety if evaluations are equal
      moves.sort(() => Math.random() - 0.5);

      for (const move of moves) {
        game.move(move);
        // Engine is typically Black in this setup, so it wants to Maximize ITS score.
        // If evalBoard returns positive for White, Engine (Black) sees it as negative.
        // We call minimax for the opponent (minimizing)
        const boardValue = minimax(game, depth - 1, alpha, beta, false);
        game.undo();

        if (boardValue > bestValue) {
          bestValue = boardValue;
          bestMove = move;
        }
      }

      resolve({ move: bestMove || moves[0] });
    }, 50); // Small delay to allow UI to render "thinking" state if needed
  });
};
