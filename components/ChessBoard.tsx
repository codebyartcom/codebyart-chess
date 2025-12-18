import React, { useState, useEffect } from 'react';
import { Chess, Square, Move } from 'chess.js';
import { PIECE_SVGS, THEMES } from '../constants';
import { BoardTheme } from '../types';

interface ChessBoardProps {
  game: Chess;
  boardTheme: BoardTheme;
  onMove: (from: Square, to: Square) => void;
  orientation: 'white' | 'black';
  lastMove: { from: string; to: string } | null;
  validMovesForPiece: (square: Square) => Move[];
}

const ChessBoard: React.FC<ChessBoardProps> = ({ 
  game, 
  boardTheme, 
  onMove, 
  orientation, 
  lastMove,
  validMovesForPiece 
}) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);

  // Update possible moves when selection changes
  useEffect(() => {
    if (selectedSquare) {
      setPossibleMoves(validMovesForPiece(selectedSquare));
    } else {
      setPossibleMoves([]);
    }
  }, [selectedSquare, validMovesForPiece]);

  // Handle square click
  const handleSquareClick = (square: Square) => {
    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    if (selectedSquare) {
      const move = possibleMoves.find((m) => m.to === square);
      if (move) {
        onMove(selectedSquare, square);
        setSelectedSquare(null);
        return;
      }
    }

    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
    } else {
      setSelectedSquare(null);
    }
  };

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  
  const displayRanks = orientation === 'white' ? ranks : [...ranks].reverse();
  const displayFiles = orientation === 'white' ? files : [...files].reverse();

  const theme = THEMES[boardTheme];

  return (
    <div className="w-full max-w-[90vw] md:max-w-[600px] aspect-square relative select-none">
      {/* Outer Border Wrapper */}
      <div className="w-full h-full border-[12px] border-slate-700 rounded-sm shadow-2xl bg-slate-800">
        
        {/* Grid Container */}
        <div className="w-full h-full grid grid-cols-8 grid-rows-8">
          {displayRanks.map((rank, rIndex) => (
            displayFiles.map((file, fIndex) => {
              const square = `${file}${rank}` as Square;
              const piece = game.get(square);
              const isLight = (rIndex + fIndex) % 2 === 0;
              const isSelected = selectedSquare === square;
              const isPossibleMove = possibleMoves.some(m => m.to === square);
              const isLastMoveFrom = lastMove?.from === square;
              const isLastMoveTo = lastMove?.to === square;
              const isCheckSquare = piece?.type === 'k' && piece?.color === game.turn() && game.inCheck();

              let bgClass = isLight ? theme.light : theme.dark;
              
              if (isSelected) bgClass = theme.highlight;
              else if (isLastMoveFrom || isLastMoveTo) bgClass = theme.highlight;
              else if (isCheckSquare) bgClass = "bg-red-500/80";

              return (
                <div
                  key={square}
                  onClick={() => handleSquareClick(square)}
                  className={`relative flex items-center justify-center cursor-pointer ${bgClass}`}
                >
                  {/* Coordinates overlay (optional, subtle) */}
                  {fIndex === 0 && (
                    <span className={`absolute top-0.5 left-0.5 text-[8px] sm:text-[10px] leading-none font-bold ${isLight ? 'text-slate-600' : 'text-slate-200'} opacity-70`}>
                      {rank}
                    </span>
                  )}
                  {rIndex === 7 && (
                    <span className={`absolute bottom-0.5 right-0.5 text-[8px] sm:text-[10px] leading-none font-bold ${isLight ? 'text-slate-600' : 'text-slate-200'} opacity-70`}>
                      {file}
                    </span>
                  )}

                  {/* Move Indicators */}
                  {isPossibleMove && !piece && (
                    <div className={`w-[25%] h-[25%] rounded-full ${theme.moveHint}`} />
                  )}
                  {isPossibleMove && piece && (
                    <div className={`absolute inset-0 border-[6px] border-black/10 rounded-full`} />
                  )}

                  {/* Piece */}
                  {piece && (
                    <div className="w-full h-full p-[8%] z-10 hover:scale-105 transition-transform duration-100 ease-out">
                      {PIECE_SVGS[`${piece.color}${piece.type.toUpperCase()}`]}
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
