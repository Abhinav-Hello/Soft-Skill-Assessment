import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, StopCircle } from 'lucide-react';
import { useAssessmentStore } from '../store/assessmentStore';

interface VideoRecorderProps {
  sessionId: string;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({ sessionId }) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const addRecording = useAssessmentStore((state) => state.addRecording);

  const handleStartRecording = useCallback(() => {
    setRecordedChunks([]);
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current.addEventListener('dataavailable', ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      });
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  }, [webcamRef, setRecordedChunks]);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setTimeout(() => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        addRecording(sessionId, {
          url,
          duration: recordedChunks.length * 100, // Approximate duration
        });
        setRecordedChunks([]);
      }, 100);
    }
  }, [recordedChunks, sessionId, addRecording]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Webcam
        ref={webcamRef}
        audio
        muted
        className="w-full rounded-lg shadow-lg"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <Camera size={20} />
            Start Recording
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <StopCircle size={20} />
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};