'use client';

import { motion } from 'framer-motion';

export default function TestMotion() {
  return (
    <motion.div 
      className="w-20 h-20 bg-purple-600 rounded-lg"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      Test
    </motion.div>
  );
}
