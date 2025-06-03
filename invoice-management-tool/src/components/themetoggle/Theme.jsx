import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import './ThemeToggle.css';

export default function ThemeToggle({ className = '' }) {
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
    <motion.button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`theme-toggle-icon ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {isDarkMode ? (
        <MoonIcon className="h-6 w-6 text-gray-200" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-500" />
      )}
    </motion.button>
  );
}
