import { useState } from 'react';
import './index.css';
import { motion, AnimatePresence } from 'framer-motion';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import GoalDetail from './screens/GoalDetail';
import FocusScreen from './screens/FocusScreen';
import BottomNav from './components/BottomNav';

export type Screen = 'onboarding' | 'dashboard' | 'goal-detail' | 'focus' | 'timeline' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={() => setCurrentScreen('dashboard')} />;
      case 'dashboard':
        return <Dashboard 
          onSelectGoal={(id) => {
            setSelectedGoalId(id);
            setCurrentScreen('goal-detail');
          }} 
        />;
      case 'goal-detail':
        return <GoalDetail 
          goalId={selectedGoalId} 
          onBack={() => setCurrentScreen('dashboard')} 
        />;
      case 'focus':
        return <FocusScreen onExit={() => setCurrentScreen('dashboard')} />;
      default:
        return <Dashboard onSelectGoal={() => {}} />;
    }
  };

  return (
    <div className="app-container">
      <div className="mesh-gradient">
        <div className="mesh-ball mesh-1"></div>
        <div className="mesh-ball mesh-2"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.main
          key={currentScreen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          {renderScreen()}
        </motion.main>
      </AnimatePresence>

      {currentScreen !== 'onboarding' && (
        <BottomNav 
          activeTab={currentScreen} 
          onTabChange={(tab) => setCurrentScreen(tab as Screen)} 
        />
      )}
    </div>
  );
}

export default App;
