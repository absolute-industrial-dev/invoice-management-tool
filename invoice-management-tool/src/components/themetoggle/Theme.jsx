import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="theme-toggle">
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`theme-toggle-button ${isDarkMode ? 'dark' : ''}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: isDarkMode ? '#1f2937' : '#facc15',
        }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="theme-toggle-indicator"
          animate={{
            x: isDarkMode ? 0 : 32,
            backgroundColor: isDarkMode ? '#d1d5db' : '#fef3c7',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {isDarkMode ? (
            <MoonIcon className="h-4 w-4 text-black" />
          ) : (
            <SunIcon className="h-4 w-4 text-yellow-600" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}