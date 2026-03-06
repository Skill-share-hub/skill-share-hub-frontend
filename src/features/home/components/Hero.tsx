import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-20 pt-16 lg:pt-24 pb-16 lg:pb-20 bg-transparent overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-[#145537]/5 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-[#145537]/5 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />

      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1.5" fill="#145537" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="max-w-xl mt-6 lg:mt-0">

            {/* HEADING */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-[#1f2937] tracking-tight"
            >
              Learn Skills <br />
              Share Knowledge <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#145537] to-[#2a8b5e]">
                Grow Together
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base lg:text-lg text-gray-600 mt-5 mb-6 leading-relaxed"
            >
              SkillShare Hub is a collaborative learning platform where people
              learn practical skills, share knowledge, and grow together through
              community-driven learning.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/explore"
                className="px-6 py-3 bg-[#145537] text-white text-sm lg:text-base font-medium rounded-full shadow-[0_4px_14px_0_rgba(20,85,55,0.39)] hover:shadow-[0_6px_20px_rgba(20,85,55,0.23)] hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                Explore Courses
              </Link>

              <Link
                to="/signup"
                className="px-6 py-3 border border-[#145537]/20 text-[#145537] bg-white/50 backdrop-blur-sm text-sm lg:text-base font-medium rounded-full hover:bg-[#145537]/5 hover:border-[#145537]/40 transition-all duration-200 text-center"
              >
                Become Tutor
              </Link>
            </motion.div>
          </div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[240px] sm:h-[280px] lg:h-[440px] xl:h-[520px] w-full group"
          >
            {/* Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#145537]/20 to-transparent rounded-3xl blur-2xl transform scale-105 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/60">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Collaborative Learning"
                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}