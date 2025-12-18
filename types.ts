import { Square, Move, PieceSymbol, Color } from 'chess.js';

export interface GameState {
  fen: string;
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  turn: Color;
  history: string[];
  captured: { w: PieceSymbol[]; b: PieceSymbol[] };
}

export interface EngineConfig {
  enabled: boolean;
  difficulty: 'novice' | 'expert' | 'grandmaster';
  isThinking: boolean;
}

export type BoardTheme = 'classic' | 'slate' | 'emerald';

export interface ThemeColors {
  light: string;
  dark: string;
  highlight: string;
  moveHint: string;
}
