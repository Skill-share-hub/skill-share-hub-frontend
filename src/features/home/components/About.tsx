import { motion } from "framer-motion";
import { Lightbulb, Share2, TrendingUp } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section
      id="about"
      className="relative py-24 px-6 lg:px-20 bg-transparent overflow-hidden"
    >

      {/* Subtle Texture Pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="aboutDots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#145537" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aboutDots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1f2937] mb-6 tracking-tight">
            About SkillShare Hub
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            SkillShare Hub is a collaborative learning platform where people can
            learn practical skills and share knowledge with others building a
            stronger community together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-10"
        >

          {/* Learn */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-8 rounded-2xl bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_8px_30px_rgba(20,85,55,0.08)] hover:border-white transition-all duration-300 text-center flex flex-col items-center group"
          >
            <div className="w-16 h-16 bg-[#145537]/5 rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#145537] group-hover:bg-[#145537]/10 transition-colors">
              <Lightbulb className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#1f2937] mb-3">Learn</h3>

            <p className="text-gray-600 leading-relaxed">
              People can explore and learn real-world skills from practitioners.
            </p>
          </motion.div>

          {/* Share */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-8 rounded-2xl bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_8px_30px_rgba(20,85,55,0.08)] hover:border-white transition-all duration-300 text-center flex flex-col items-center group"
          >
            <div className="w-16 h-16 bg-[#145537]/5 rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#145537] group-hover:bg-[#145537]/10 transition-colors">
              <Share2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#1f2937] mb-3">Share</h3>

            <p className="text-gray-600 leading-relaxed">
              Anyone can share knowledge and help others grow in their careers.
            </p>
          </motion.div>

          {/* Grow */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="p-8 rounded-2xl bg-white/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_8px_30px_rgba(20,85,55,0.08)] hover:border-white transition-all duration-300 text-center flex flex-col items-center group"
          >
            <div className="w-16 h-16 bg-[#145537]/5 rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#145537] group-hover:bg-[#145537]/10 transition-colors">
              <TrendingUp className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-[#1f2937] mb-3">Grow</h3>

            <p className="text-gray-600 leading-relaxed">
              Learning together builds skills, confidence, and new opportunities.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}