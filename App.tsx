/*
 * Copyright (c) CodeByArt
 * Designed by techiekamal21 (Github)
 */
import React, { useState, useEffect, useCallback } from 'react';
import { Chess, Square, Move } from 'chess.js';
import ChessBoard from './components/ChessBoard';
import GameControls from './components/GameControls';
import MoveHistory from './components/MoveHistory';
import { getBestMove } from './services/chessEngine';
import { EngineConfig, BoardTheme } from './types';

const App: React.FC = () => {
  // Game Logic State
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen()); 
  
  // UI State
  const [boardTheme, setBoardTheme] = useState<BoardTheme>('classic');
  const [lastMove, setLastMove] = useState<{from: string, to: string} | null>(null);
  const [engineConfig, setEngineConfig] = useState<EngineConfig>({
    enabled: true,
    difficulty: 'expert',
    isThinking: false
  });

  const makeMove = useCallback((move: { from: string; to: string; promotion?: string }) => {
    try {
      const result = game.move(move);
      if (result) {
        setFen(game.fen());
        setLastMove({ from: move.from, to: move.to });
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }, [game]);

  const onBoardMove = (from: Square, to: Square) => {
    // Human move
    if (game.isGameOver() || (engineConfig.enabled && engineConfig.isThinking)) return;

    // Check promotion (auto-queen for simplicity)
    const moveAttempt = { from, to, promotion: 'q' };
    
    const possibleMoves = game.moves({ verbose: true }) as Move[];
    const isLegal = possibleMoves.some(m => m.from === from && m.to === to);
    
    if (isLegal) {
       makeMove(moveAttempt);
    }
  };

  // Engine Turn
  useEffect(() => {
    if (!engineConfig.enabled || game.isGameOver() || game.turn() === 'w') return;

    const triggerEngine = async () => {
      setEngineConfig(prev => ({ ...prev, isThinking: true }));
      
      const validMoves = game.moves();
      if (validMoves.length > 0) {
        const { move } = await getBestMove(game.fen(), validMoves, engineConfig.difficulty);
        
        game.move(move); 
        setFen(game.fen());
        
        const history = game.history({ verbose: true });
        const last = history[history.length - 1];
        setLastMove({ from: last.from, to: last.to });
        setEngineConfig(prev => ({ ...prev, isThinking: false }));
      } else {
         setEngineConfig(prev => ({ ...prev, isThinking: false }));
      }
    };

    triggerEngine();
  }, [fen, engineConfig.enabled]); 

  // Helper for highlighting
  const validMovesForPiece = useCallback((square: Square) => {
    return game.moves({ square, verbose: true }) as Move[];
  }, [game, fen]);

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setLastMove(null);
    setEngineConfig(prev => ({ ...prev, isThinking: false }));
  };

  const undoMove = () => {
    game.undo();
    if (engineConfig.enabled) {
      // If playing Computer, undo twice (human + computer)
      game.undo();
    }
    setFen(game.fen());
    setLastMove(null); 
  };

  // Status Text
  let status = '';
  if (game.isCheckmate()) {
    status = `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins.`;
  } else if (game.isDraw()) {
    status = 'Draw!';
  } else if (game.inCheck()) {
    status = 'Check!';
  } else {
    status = `${game.turn() === 'w' ? "White" : "Black"}'s Turn`;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="px-4 py-3 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
               C
             </div>
             <h1 className="text-xl font-bold tracking-tight text-slate-100">CodeByArt Chess</h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
             <span className="bg-slate-700 px-2 py-1 rounded">v2.0</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Board */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <ChessBoard 
              game={game}
              boardTheme={boardTheme}
              orientation="white"
              onMove={onBoardMove}
              lastMove={lastMove}
              validMovesForPiece={validMovesForPiece}
            />
            {/* Mobile History View */}
            <div className="block lg:hidden w-full mt-6">
               <MoveHistory history={game.history()} />
            </div>
          </div>

          {/* Right Column: Controls & History */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <GameControls 
              onReset={resetGame}
              onUndo={undoMove}
              engineConfig={engineConfig}
              setEngineConfig={setEngineConfig}
              boardTheme={boardTheme}
              setBoardTheme={setBoardTheme}
              gameStatus={status}
            />
            
            <div className="hidden lg:block flex-1 h-full min-h-[400px]">
              <MoveHistory history={game.history()} />
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 text-xs text-slate-500 text-center">
               <p className="font-semibold text-slate-400">&copy; CodeByArt</p>
               <p className="mt-1">Designed by <a href="https://github.com/techiekamal21" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">techiekamal21</a></p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;