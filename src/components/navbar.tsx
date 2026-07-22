import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-16 bg-transparent flex justify-between items-center px-6 lg:px-8 border-b border-transparent sticky top-0 z-50 transition-colors duration-300"
    >
      <Link href="/" className="flex items-center gap-2 group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-center"
        >
          <img src="/logo.png" alt="Convertly Logo" className="w-6 h-6 object-contain" />
        </motion.div>
        <h1 className="text-xl font-medium font-serif tracking-tight text-ink group-hover:text-primary/90 transition-colors">
          Convertly
        </h1>
      </Link>
      <nav className="flex gap-6 text-primary justify-center items-center font-medium">
        <ModeToggle />
      </nav>
    </motion.div>
  );
}