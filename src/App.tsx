import React, { useEffect } from 'react';
import { VideoRecorder } from './components/VideoRecorder';
import { AssessmentDashboard } from './components/AssessmentDashboard';
import { useAssessmentStore } from './store/assessmentStore';

function App() {
  const { setCurrentSession } = useAssessmentStore();

  useEffect(() => {
    // Initialize a demo session
    const demoSession = {
      id: crypto.randomUUID(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      recordings: [],
    };
    setCurrentSession(demoSession);
  }, [setCurrentSession]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Soft Skills Assessment System
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <AssessmentDashboard />
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Interview Recording</h2>
            <VideoRecorder sessionId="demo-session" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;