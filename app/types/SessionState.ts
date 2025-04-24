type SessionState = {
    intervals: number[];
    intervalsTitle: string[]
    currentIndex: number;
    remaining: number;
    remainingOverAll: number
    isRunning: boolean;
    timer: NodeJS.Timeout | null; // Holds the reference to the timer
    startSession: (intervals: number[]) => void; // Start session with intervals
    pauseSession: () => void;    // Pause session
    resumeSession: () => void;   // Resume session
    tick: () => void;            // Handle tick for remaining time
    nextInterval: () => void;    // Move to the next interval
    addInterval: (mins: number, title: string) => void;
  };
  // TODO add array of string to hold interval's name