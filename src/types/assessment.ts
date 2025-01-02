export interface AssessmentResult {
  confidence: number;
  facialScore: number;
  voiceScore: number;
  bodyLanguageScore: number;
  timestamp: number;
}

export interface CandidateSession {
  id: string;
  name: string;
  email: string;
  recordings: Array<{
    id: string;
    url: string;
    duration: number;
    timestamp: number;
    results?: AssessmentResult;
  }>;
}