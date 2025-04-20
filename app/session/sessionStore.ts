import { create } from 'zustand';

export const useSessionStore = create<SessionState>(() => ({
    intervals: [],
    currentIndex: 0,
    remaining: 0,
    isRunning: true
}));