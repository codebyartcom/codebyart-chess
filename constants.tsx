import React from 'react';
import { BoardTheme, ThemeColors } from './types';

// Using standard chess piece SVGs
export const PIECE_SVGS: Record<string, React.ReactNode> = {
  wP: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  wN: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" /><path d="M24 18c.38 2.32-2.41 5.11-4.5 6-4.55 1.42-7.39-1.27-9.5-6.5-1.46-3.62-2.42-7.38-6-9.5-1.5-.89-1.63-2.66-.5-3.5C6 2.5 13 4 22 10" fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" /><path d="M9.5 25.5A4.5 4.5 0 1 1 5 21a4.5 4.5 0 0 1 4.5 4.5" fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" /><path d="M15 15.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0" fill="#000" stroke="#000" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  wB: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 36c3.39-.47 2.88-2.56.5-4 .96-1.2 2.06-2.53 3.5-4 1.2-1.22 2.9-2.03 4-4 .67-1.2 1.56-3.13 2.5-6 .24-.76 1.84-4.8 1.5-5.5-.9-1.88-2.54-1.88-2.5-3.5.02-.99.5-1.99 1.5-2.5 1.23-.63 2.76-.32 3.5 1 .74-1.32 2.27-1.63 3.5-1 1 .51 1.48 1.51 1.5 2.5.04 1.62-1.6 1.62-2.5 3.5-.34.7 1.26 4.74 1.5 5.5.94 2.87 1.83 4.8 2.5 6 1.1 1.97 2.8 2.78 4 4 1.44 1.47 2.54 2.8 3.5 4-2.38 1.44-2.89 3.53.5 4" /><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2" /><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" /></g></svg>,
  wR: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5c1.71 2.89 2.5 5.45 2.5 6.5H11.5c0-1.05.79-3.61 2.5-6.5V17" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M11 14h23" /></g></svg>,
  wQ: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM10.5 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM38.5 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z" /><path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 1 2.5.5 4-1.5 1.5 1.5 1.5 2.5 1.5l1 2h23l1-2c1 0 4 0 2.5-1.5-.5-1.5-.5-1.5.5-4 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" /><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" /></g></svg>,
  wK: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" /><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 5.5-8 12h-11c-3-6.5-4-13-8-12-3 6 6 10.5 6 10.5v7z" /></g></svg>,
  bP: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  bN: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /><path d="M24 18c.38 2.32-2.41 5.11-4.5 6-4.55 1.42-7.39-1.27-9.5-6.5-1.46-3.62-2.42-7.38-6-9.5-1.5-.89-1.63-2.66-.5-3.5C6 2.5 13 4 22 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /><path d="M9.5 25.5A4.5 4.5 0 1 1 5 21a4.5 4.5 0 0 1 4.5 4.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /><path d="M15 15.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  bB: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 36c3.39-.47 2.88-2.56.5-4 .96-1.2 2.06-2.53 3.5-4 1.2-1.22 2.9-2.03 4-4 .67-1.2 1.56-3.13 2.5-6 .24-.76 1.84-4.8 1.5-5.5-.9-1.88-2.54-1.88-2.5-3.5.02-.99.5-1.99 1.5-2.5 1.23-.63 2.76-.32 3.5 1 .74-1.32 2.27-1.63 3.5-1 1 .51 1.48 1.51 1.5 2.5.04 1.62-1.6 1.62-2.5 3.5-.34.7 1.26 4.74 1.5 5.5.94 2.87 1.83 4.8 2.5 6 1.1 1.97 2.8 2.78 4 4 1.44 1.47 2.54 2.8 3.5 4-2.38 1.44-2.89 3.53.5 4" /><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2" /><path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" fill="#fff" /></g></svg>,
  bR: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5c1.71 2.89 2.5 5.45 2.5 6.5H11.5c0-1.05.79-3.61 2.5-6.5V17" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M11 14h23" /></g></svg>,
  bQ: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM10.5 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM38.5 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" fill="#fff" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z" /><path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 1 2.5.5 4-1.5 1.5 1.5 1.5 2.5 1.5l1 2h23l1-2c1 0 4 0 2.5-1.5-.5-1.5-.5-1.5.5-4 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" /><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" /></g></svg>,
  bK: <svg viewBox="0 0 45 45" className="w-full h-full drop-shadow-sm"><g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" /><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 5.5-8 12h-11c-3-6.5-4-13-8-12-3 6 6 10.5 6 10.5v7z" /></g></svg>,
};

export const THEMES: Record<BoardTheme, ThemeColors> = {
  classic: {
    light: 'bg-[#f0d9b5]',
    dark: 'bg-[#b58863]',
    highlight: 'bg-yellow-200/50',
    moveHint: 'bg-black/10',
  },
  slate: {
    light: 'bg-slate-300',
    dark: 'bg-slate-600',
    highlight: 'bg-blue-400/50',
    moveHint: 'bg-blue-900/20',
  },
  emerald: {
    light: 'bg-emerald-100',
    dark: 'bg-emerald-600',
    highlight: 'bg-yellow-300/50',
    moveHint: 'bg-emerald-900/20',
  },
};
