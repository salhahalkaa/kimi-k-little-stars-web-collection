import React from 'react';
import { Home, Target, Zap, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'focus', icon: Zap, label: 'Focus' },
    { id: 'timeline', icon: Clock, label: 'Timeline' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id || (activeTab === 'goal-detail' && tab.id === 'dashboard');
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="icon-wrapper">
                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="nav-dot"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
              <span className="nav-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bottom-nav {
          position: sticky;
          bottom: 24px;
          left: 20px;
          right: 20px;
          margin: 0 20px 24px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 0.5px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 12px 10px;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
          z-index: 100;
        }
        .nav-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .nav-item {
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #767586;
          cursor: pointer;
          position: relative;
          transition: color 0.3s ease;
          flex: 1;
        }
        .nav-item.active {
          color: #4648d4;
        }
        .icon-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .nav-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .nav-dot {
          position: absolute;
          bottom: -8px;
          width: 4px;
          height: 4px;
          background: #4648d4;
          border-radius: 50%;
        }
      `}} />
    </nav>
  );
};

export default BottomNav;
