import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronRight, Zap, Star } from 'lucide-react';

interface DashboardProps {
  onSelectGoal: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectGoal }) => {
  const activeGoals = [
    { id: '1', title: 'Launch Startup', progress: 34, color: '#4648d4', milestone: 'Brand Identity' },
    { id: '2', title: 'Lose 10kg', progress: 65, color: '#8127cf', milestone: 'Consistent Cardio' },
  ];

  const dailyTasks = [
    { id: 't1', title: 'Sketch 3 logo concepts', completed: false },
    { id: 't2', title: '30 min HIIT session', completed: true },
    { id: 't3', title: 'Draft value proposition', completed: false },
  ];

  return (
    <div className="dashboard-screen">
      <header className="header">
        <div className="user-greeting">
          <p className="greeting-small">Good evening,</p>
          <h1 className="greeting-large">Keep the momentum.</h1>
        </div>
        <button className="profile-btn">
          <div className="avatar">JD</div>
        </button>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Active Goals</h2>
          <button className="add-btn"><Plus size={20} /></button>
        </div>
        <div className="goals-scroll">
          {activeGoals.map((goal) => (
            <motion.div 
              key={goal.id} 
              className="goal-card glass-card"
              whileHover={{ y: -5 }}
              onClick={() => onSelectGoal(goal.id)}
            >
              <div className="goal-info">
                <div className="progress-ring-mini" style={{ '--progress': goal.progress, '--color': goal.color } as React.CSSProperties}>
                  <span className="progress-text">{goal.progress}%</span>
                </div>
                <div className="goal-text">
                  <h3>{goal.title}</h3>
                  <p>Next: {goal.milestone}</p>
                </div>
              </div>
              <ChevronRight size={18} className="chevron" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Daily Focus</h2>
          <span className="task-count">{dailyTasks.filter(t => t.completed).length}/3 Done</span>
        </div>
        <div className="tasks-container glass-card">
          {dailyTasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="check-circle">
                {task.completed && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Star size={12} fill="currentColor" /></motion.div>}
              </div>
              <span className="task-title">{task.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="insight-section">
        <div className="insight-card glass-card">
          <div className="insight-icon"><Zap size={20} /></div>
          <div className="insight-content">
            <p className="insight-title">Smart Insight</p>
            <p className="insight-text">You're 12% closer to your marathon goal than last week. Great consistency!</p>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-screen {
          padding: 24px 20px 100px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .greeting-small {
          font-size: 14px;
          color: #767586;
        }
        .greeting-large {
          font-size: 24px;
          margin: 0;
        }
        .avatar {
          width: 40px;
          height: 40px;
          background: var(--primary-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 14px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .section-header h2 {
          font-size: 18px;
          font-weight: 700;
        }
        .add-btn {
          background: rgba(70, 72, 212, 0.1);
          border: none;
          color: #4648d4;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .goals-scroll {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .goal-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 16px;
        }
        .goal-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .progress-ring-mini {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: conic-gradient(var(--color) calc(var(--progress) * 1%), #e0e0e0 0);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .progress-ring-mini::after {
          content: '';
          position: absolute;
          width: 38px;
          height: 38px;
          background: white;
          border-radius: 50%;
        }
        .progress-text {
          position: relative;
          z-index: 1;
          font-size: 10px;
          font-weight: 800;
        }
        .goal-text h3 {
          font-size: 16px;
          margin-bottom: 2px;
        }
        .goal-text p {
          font-size: 12px;
          color: #767586;
        }
        .chevron {
          color: #c0c0c0;
        }
        .task-count {
          font-size: 12px;
          font-weight: 600;
          color: #4648d4;
          background: rgba(70, 72, 212, 0.1);
          padding: 4px 10px;
          border-radius: 12px;
        }
        .tasks-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .task-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
        }
        .check-circle {
          width: 22px;
          height: 22px;
          border: 1.5px solid #e0e0e0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4648d4;
        }
        .task-item.completed .check-circle {
          border-color: #4648d4;
          background: rgba(70, 72, 212, 0.05);
        }
        .task-item.completed .task-title {
          text-decoration: line-through;
          color: #c0c0c0;
        }
        .task-title {
          font-size: 15px;
          font-weight: 500;
        }
        .insight-card {
          display: flex;
          gap: 16px;
          background: linear-gradient(135deg, rgba(70, 72, 212, 0.05) 0%, rgba(129, 39, 207, 0.05) 100%);
        }
        .insight-icon {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4648d4;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .insight-title {
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 2px;
        }
        .insight-text {
          font-size: 13px;
          color: #767586;
        }
      `}} />
    </div>
  );
};

export default Dashboard;
