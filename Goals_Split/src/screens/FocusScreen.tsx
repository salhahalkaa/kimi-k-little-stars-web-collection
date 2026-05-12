import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, Square } from 'lucide-react';

interface FocusScreenProps {
  onExit: () => void;
}

const FocusScreen: React.FC<FocusScreenProps> = ({ onExit }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined = undefined;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else {
      window.clearInterval(interval);
    }
    return () => window.clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="focus-screen">
      <header className="focus-header">
        <button onClick={onExit} className="exit-btn"><X size={24} /></button>
        <span className="mode-label">Deep Work</span>
      </header>

      <div className="focus-content">
        <div className="timer-container">
          <svg className="timer-svg" viewBox="0 0 100 100">
            <circle className="timer-bg" cx="50" cy="50" r="45" />
            <motion.circle 
              className="timer-progress" 
              cx="50" cy="50" r="45"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="timer-text">
            <span className="time">{formatTime(timeLeft)}</span>
            <span className="task-hint">Logo Sketching</span>
          </div>
        </div>

        <div className="controls">
          <button 
            className={`control-btn ${isActive ? 'active' : ''}`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
          </button>
          <button className="stop-btn" onClick={() => { setTimeLeft(25 * 60); setIsActive(false); }}>
            <Square size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="focus-footer">
        <p>Stay focused. You're doing great.</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .focus-screen {
          background: #0a0a0c;
          height: 100vh;
          width: 100%;
          color: white;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
        }
        .focus-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .exit-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mode-label {
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-size: 12px;
          color: #767586;
        }
        .focus-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 60px;
        }
        .timer-container {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timer-svg {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .timer-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.05);
          stroke-width: 4;
        }
        .timer-progress {
          fill: none;
          stroke: #4648d4;
          stroke-width: 4;
          stroke-linecap: round;
          filter: drop-shadow(0 0 8px rgba(70, 72, 212, 0.5));
        }
        .timer-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .time {
          font-size: 64px;
          font-weight: 800;
          font-variant-numeric: tabular-nums;
        }
        .task-hint {
          font-size: 16px;
          color: #767586;
          font-weight: 500;
        }
        .controls {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .control-btn {
          width: 80px;
          height: 80px;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0c;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .control-btn:active {
          transform: scale(0.9);
        }
        .stop-btn {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .focus-footer {
          text-align: center;
          margin-top: auto;
          color: #767586;
          font-weight: 500;
        }
      `}} />
    </div>
  );
};

export default FocusScreen;
