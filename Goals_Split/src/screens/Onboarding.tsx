import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('');

  const steps = [
    {
      title: "Big goals become achievable.",
      subtitle: "Welcome to Goals Split. We help you turn overwhelming dreams into simple, daily wins.",
      button: "Let's start",
      icon: <Sparkles className="text-primary" size={48} />
    },
    {
      title: "What is your big goal?",
      subtitle: "Don't overthink it. Just one thing you want to achieve.",
      input: true,
      placeholder: "e.g. Launch my startup",
      button: "Continue"
    },
    {
      title: "Why does it matter?",
      subtitle: "Connecting your goal to a purpose keeps you consistent.",
      input: true,
      placeholder: "e.g. To gain financial freedom",
      button: "Get my plan"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="onboarding-screen">
      <div className="onboarding-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="step-container"
          >
            {steps[step].icon && (
              <motion.div 
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="icon-box"
              >
                {steps[step].icon}
              </motion.div>
            )}
            
            <h1 className="title">{steps[step].title}</h1>
            <p className="subtitle">{steps[step].subtitle}</p>

            {steps[step].input && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="input-wrapper"
              >
                <input 
                  type="text" 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder={steps[step].placeholder}
                  className="glass-input"
                  autoFocus
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="footer">
          <div className="progress-dots">
            {steps.map((_, i) => (
              <div key={i} className={`dot ${i === step ? 'active' : ''}`} />
            ))}
          </div>
          
          <button onClick={handleNext} className="btn-primary w-full">
            {steps[step].button} <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .onboarding-screen {
          padding: 40px 24px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .onboarding-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
        }
        .step-container {
          text-align: center;
        }
        .icon-box {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }
        .title {
          font-size: 32px;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .subtitle {
          color: #767586;
          margin-bottom: 32px;
        }
        .input-wrapper {
          width: 100%;
        }
        .glass-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.4);
          border: 0.5px solid rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          padding: 18px 24px;
          border-radius: 20px;
          font-size: 18px;
          color: #1b1b23;
          outline: none;
          transition: all 0.3s ease;
        }
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 0 4px rgba(70, 72, 212, 0.1);
        }
        .footer {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: auto;
        }
        .progress-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .dot {
          width: 6px;
          height: 6px;
          background: #e0e0e0;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .dot.active {
          width: 24px;
          border-radius: 3px;
          background: #4648d4;
        }
        .w-full {
          width: 100%;
        }
        .text-primary {
          color: #4648d4;
        }
      `}} />
    </div>
  );
};

export default Onboarding;
