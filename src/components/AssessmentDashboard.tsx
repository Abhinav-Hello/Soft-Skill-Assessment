import React from 'react';
import { BarChart3, Camera, User } from 'lucide-react';
import { useAssessmentStore } from '../store/assessmentStore';

export const AssessmentDashboard: React.FC = () => {
  const { sessions, currentSession } = useAssessmentStore();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Candidates</h3>
              <p className="text-2xl font-bold">{sessions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Camera className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Interviews</h3>
              <p className="text-2xl font-bold">
                {sessions.reduce((acc, session) => acc + session.recordings.length, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Avg. Confidence Score</h3>
              <p className="text-2xl font-bold">78%</p>
            </div>
          </div>
        </div>
      </div>

      {currentSession && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Current Session</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Candidate</p>
              <p className="font-semibold">{currentSession.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold">{currentSession.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Recordings</p>
              <p className="font-semibold">{currentSession.recordings.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};