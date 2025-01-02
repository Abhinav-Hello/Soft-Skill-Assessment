import { create } from 'zustand';
import { CandidateSession } from '../types/assessment';

interface AssessmentStore {
  sessions: CandidateSession[];
  currentSession: CandidateSession | null;
  setCurrentSession: (session: CandidateSession | null) => void;
  addSession: (session: CandidateSession) => void;
  addRecording: (sessionId: string, recording: { url: string; duration: number }) => void;
}

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  sessions: [],
  currentSession: null,
  setCurrentSession: (session) => set({ currentSession: session }),
  addSession: (session) =>
    set((state) => ({ sessions: [...state.sessions, session] })),
  addRecording: (sessionId, recording) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              recordings: [
                ...session.recordings,
                {
                  id: crypto.randomUUID(),
                  ...recording,
                  timestamp: Date.now(),
                },
              ],
            }
          : session
      ),
    })),
}));