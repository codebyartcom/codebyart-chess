import React, { useEffect, useRef } from 'react';

interface MoveHistoryProps {
  history: string[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ history }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Group moves into pairs (White, Black)
  const movePairs = [];
  for (let i = 0; i < history.length; i += 2) {
    movePairs.push({
      num: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1] || '',
    });
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden flex flex-col h-full max-h-[300px] lg:max-h-[600px]">
      <div className="bg-slate-900/50 p-3 border-b border-slate-700">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Move History</h3>
      </div>
      <div ref={scrollRef} className="overflow-y-auto flex-1 p-2">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-slate-500 text-xs">
              <th className="pb-2 pl-2 w-10">#</th>
              <th className="pb-2 w-20">White</th>
              <th className="pb-2">Black</th>
            </tr>
          </thead>
          <tbody>
            {movePairs.map((pair) => (
              <tr key={pair.num} className="odd:bg-slate-700/20 even:bg-transparent hover:bg-slate-700/40 transition-colors">
                <td className="py-1 pl-2 text-slate-500 font-mono">{pair.num}.</td>
                <td className="py-1 text-slate-200 font-medium">{pair.white}</td>
                <td className="py-1 text-slate-200 font-medium">{pair.black}</td>
              </tr>
            ))}
             {history.length === 0 && (
                <tr>
                    <td colSpan={3} className="text-center py-8 text-slate-600 italic">No moves yet. Start the game!</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoveHistory;
