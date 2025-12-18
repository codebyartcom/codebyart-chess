import React from 'react';
import { RefreshCw, RotateCcw, Cpu } from 'lucide-react';
import { EngineConfig, BoardTheme } from '../types';

interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  engineConfig: EngineConfig;
  setEngineConfig: React.Dispatch<React.SetStateAction<EngineConfig>>;
  boardTheme: BoardTheme;
  setBoardTheme: (theme: BoardTheme) => void;
  gameStatus: string;
}

const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onUndo,
  engineConfig,
  setEngineConfig,
  boardTheme,
  setBoardTheme,
  gameStatus
}) => {
  return (
    <div className="flex flex-col gap-4 bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700">
      
      {/* Game Status Banner */}
      <div className="text-center p-2 bg-slate-900/50 rounded-lg border border-slate-700/50">
        <h2 className="text-lg font-bold text-slate-100 mb-1">Status</h2>
        <div className="text-emerald-400 font-mono text-sm font-semibold">{gameStatus}</div>
        {engineConfig.isThinking && (
          <div className="mt-2 flex items-center justify-center gap-2 text-blue-300 text-xs animate-pulse">
             <Cpu size={14} /> Computer is thinking...
          </div>
        )}
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 p-3 rounded-lg text-white font-medium transition-colors shadow-sm"
        >
          <RefreshCw size={18} /> New Game
        </button>
        <button 
          onClick={onUndo}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-white font-medium transition-colors border border-slate-600"
        >
          <RotateCcw size={18} /> Undo
        </button>
      </div>

      <div className="h-px bg-slate-700" />

      {/* Engine Settings */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Cpu size={16} /> Opponent
          </span>
          <button 
            onClick={() => setEngineConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${engineConfig.enabled ? 'bg-emerald-600 text-white' : 'bg-slate-600 text-slate-300'}`}
          >
            {engineConfig.enabled ? 'Computer' : 'Human'}
          </button>
        </div>
        
        {engineConfig.enabled && (
           <div className="grid grid-cols-3 gap-2">
             {(['novice', 'expert', 'grandmaster'] as const).map(level => (
               <button
                 key={level}
                 onClick={() => setEngineConfig(prev => ({ ...prev, difficulty: level }))}
                 className={`py-1.5 text-xs rounded-md border font-medium transition-all ${engineConfig.difficulty === level ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'border-slate-600 text-slate-500 hover:border-slate-500 hover:text-slate-400'}`}
               >
                 {level.charAt(0).toUpperCase() + level.slice(1)}
               </button>
             ))}
           </div>
        )}
      </div>

       <div className="h-px bg-slate-700" />

      {/* Theme Settings */}
      <div>
        <span className="text-sm font-semibold text-slate-300 block mb-2">Board Theme</span>
        <div className="flex gap-2">
          {(['classic', 'slate', 'emerald'] as const).map(theme => (
            <button
              key={theme}
              onClick={() => setBoardTheme(theme)}
              className={`flex-1 h-8 rounded border-2 transition-all ${boardTheme === theme ? 'border-white scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-80'}`}
              style={{ background: theme === 'classic' ? '#b58863' : theme === 'slate' ? '#475569' : '#059669' }}
              aria-label={theme}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default GameControls;
