import { create } from 'zustand';

export const useSessionStore = create<SessionState>((set, get) => ({
    intervals: [], // in mins
    intervalsTitle: [],
    currentIndex: 0,
    remaining: 0,
    isRunning: false,
    timer: null,
    remainingOverAll: 0,

    startSession: (intervals) => {
        const { isRunning } = get();
        if (isRunning) return;
        const firstInterval = intervals[0];
        set({
            intervals,          // Save the full intervals array in state
            currentIndex: 0,    // Start at the first interval
            remaining: firstInterval, // Set how much time is left (in seconds)
            isRunning: true,    // Mark the session as active
          });
        
        const timer = setInterval(() => get().tick(), 1000);
        set({timer});
    },

    tick: () => {
        const{ remaining, nextInterval} = get();
        if (remaining <= 1){
            nextInterval();
        } else {
            set((state) => ({remaining: state.remaining - 1}));
            set((state) => ({remainingOverAll: state.remainingOverAll - 1}));
        }
    },

    nextInterval: () => {
        const{intervals, currentIndex, timer} = get();

        if (timer) clearInterval(timer);
        
        const nextIndex = currentIndex + 1;
        if (nextIndex >= intervals.length) {
            set({isRunning: false, timer: null, remaining: 0})
        } else {
            const newTime = intervals[nextIndex];
            const newTimer = setInterval(() => get().tick(), 1000);
            set({remaining: newTime,
                currentIndex: nextIndex,
                isRunning: true,
                timer: newTimer
            })
        }
    },

    pauseSession: () => {
        const{ timer } = get();
        if(timer) clearInterval(timer);
        set({
            isRunning: false,
            timer: null
        });
    },

    resumeSession: () => {
        const { isRunning } = get();
        if (!isRunning) {
            const timer = setInterval(() => get().tick(), 1000);
            set({
                isRunning: true,
                timer
            })
        }
    },

    addInterval: (mins: number, title: string) => {
        const{intervals, intervalsTitle, remainingOverAll} = get();
        intervals.push(mins * 60);
        intervalsTitle.push(title);
        set({
            intervals, intervalsTitle, remainingOverAll: remainingOverAll + mins * 60
        })
    }
}));    