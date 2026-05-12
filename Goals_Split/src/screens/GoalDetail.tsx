import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MoreHorizontal, Sparkles, CheckCircle2, Circle } from 'lucide-react';

interface GoalDetailProps {
  goalId: string | null;
  onBack: () => void;
}

const GoalDetail: React.FC<GoalDetailProps> = ({ goalId: _goalId, onBack }) => {
  const milestones = [
    { 
      id: 'm1', 
      title: 'Brand Identity', 
      completed: 2, 
      total: 5,
      tasks: [
        { id: 't1', title: 'Logo Sketching', done: true },
        { id: 't2', title: 'Color Palette Selection', done: true },
        { id: 't3', title: 'Typography Research', done: false },
        { id: 't4', title: 'Brand Voice Definition', done: false },
        { id: 't5', title: 'Mockup Creation', done: false },
      ]
    },
    { 
      id: 'm2', 
      title: 'Product Research', 
      completed: 0, 
      total: 3,
      tasks: [
        { id: 't6', title: 'Competitor Analysis', done: false },
        { id: 't7', title: 'User Interviews', done: false },
        { id: 't8', title: 'Market Trends', done: false },
      ]
    }
  ];

  return (
    <div className="goal-detail-screen">
      <header className="header">
        <button onClick={onBack} className="back-btn"><ArrowLeft size={22} /></button>
        <button className="more-btn"><MoreHorizontal size={22} /></button>
      </header>

      <div className="goal-header">
        <h1 className="goal-title">Launch Startup</h1>
        <div className="overall-progress">
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: '34%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="progress-stats">
            <span className="percentage">34%</span>
            <span className="remaining">22 tasks remaining</span>
          </div>
        </div>
      </div>

      <div className="ai-breakdown-card glass-card">
        <div className="ai-content">
          <div className="ai-icon"><Sparkles size={20} /></div>
          <div className="ai-text">
            <h3>AI Breakdown</h3>
            <p>I can help you break 'Brand Identity' into smaller actionable steps.</p>
          </div>
        </div>
        <button className="ai-btn">Analyze</button>
      </div>

      <div className="milestones-section">
        <h2>Milestones</h2>
        <div className="milestones-list">
          {milestones.map((m) => (
            <div key={m.id} className="milestone-group">
              <div className="milestone-header">
                <div className="milestone-title-row">
                  <h3>{m.title}</h3>
                  <span className="milestone-count">{m.completed}/{m.total}</span>
                </div>
              </div>
              <div className="milestone-tasks">
                {m.tasks.map((task) => (
                  <div key={task.id} className="task-row">
                    <div className="task-status">
                      {task.done ? <CheckCircle2 size={18} className="icon-done" /> : <Circle size={18} className="icon-todo" />}
                    </div>
                    <span className={`task-name ${task.done ? 'done' : ''}`}>{task.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .goal-detail-screen {
          padding: 24px 20px 100px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .back-btn, .more-btn {
          background: none;
          border: none;
          color: #767586;
          cursor: pointer;
        }
        .goal-header {
          margin-top: 8px;
        }
        .goal-title {
          font-size: 32px;
          margin-bottom: 20px;
        }
        .progress-bar-container {
          height: 12px;
          background: rgba(70, 72, 212, 0.1);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 8px;
        }
        .progress-bar-fill {
          height: 100%;
          background: var(--primary-gradient);
          border-radius: 6px;
        }
        .progress-stats {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 600;
        }
        .percentage {
          color: #4648d4;
        }
        .remaining {
          color: #767586;
        }
        .ai-breakdown-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: linear-gradient(135deg, rgba(70, 72, 212, 0.1) 0%, rgba(129, 39, 207, 0.1) 100%);
          border: 0.5px solid rgba(255, 255, 255, 0.5);
        }
        .ai-content {
          display: flex;
          gap: 12px;
        }
        .ai-icon {
          color: #4648d4;
        }
        .ai-text h3 {
          font-size: 16px;
          margin-bottom: 4px;
        }
        .ai-text p {
          font-size: 13px;
          color: #767586;
          line-height: 1.4;
        }
        .ai-btn {
          background: white;
          border: none;
          padding: 10px;
          border-radius: 12px;
          font-weight: 700;
          color: #4648d4;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(70, 72, 212, 0.1);
        }
        .milestones-section h2 {
          font-size: 20px;
          margin-bottom: 16px;
        }
        .milestones-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .milestone-header {
          margin-bottom: 12px;
        }
        .milestone-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .milestone-title-row h3 {
          font-size: 17px;
          color: #1b1b23;
        }
        .milestone-count {
          font-size: 12px;
          font-weight: 700;
          color: #767586;
        }
        .milestone-tasks {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 4px;
        }
        .task-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 4px 0;
        }
        .icon-done {
          color: #4648d4;
        }
        .icon-todo {
          color: #e0e0e0;
        }
        .task-name {
          font-size: 15px;
          color: #464554;
        }
        .task-name.done {
          text-decoration: line-through;
          color: #c0c0c0;
        }
      `}} />
    </div>
  );
};

export default GoalDetail;
