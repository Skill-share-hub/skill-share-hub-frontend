import { motion } from "framer-motion";
import { BookOpen, Users, Presentation, MonitorPlay } from "lucide-react";

const featuresData = [
  {
    icon: <BookOpen className="w-8 h-8 text-[#145537]" />,
    title: "Skill Based Learning",
    description: "Learn practical skills from real people."
  },
  {
    icon: <Users className="w-8 h-8 text-[#145537]" />,
    title: "Teach and Share Knowledge",
    description: "Anyone can contribute knowledge and build credibility."
  },
  {
    icon: <MonitorPlay className="w-8 h-8 text-[#145537]" />,
    title: "Collaborative Learning",
    description: "Learn through interaction, discussion, and shared resources."
  },
  {
    icon: <Presentation className="w-8 h-8 text-[#145537]" />,
    title: "Workshops and Live Sessions",
    description: "Interactive sessions with experienced tutors."
  }
];

export default function Features() {
  return (
    <section className="relative py-20 px-6 lg:px-20 bg-transparent overflow-hidden">

      {/* Texture Pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="featureDots" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#145537" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#featureDots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1f2937] mb-4 tracking-tight">
            Platform Features
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_8px_30px_rgba(20,85,55,0.08)] hover:border-white transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-[#145537]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#145537]/10 transition-colors">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-[#1f2937] mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}