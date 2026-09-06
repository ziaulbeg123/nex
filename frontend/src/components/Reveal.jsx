import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children }) => (
  <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-yellow-500/80 mb-4">
    {children}
  </p>
);
