"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MotionSection({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  );
}
