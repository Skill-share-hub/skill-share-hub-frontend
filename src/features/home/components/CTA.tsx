import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-16 px-6 lg:px-20 bg-transparent relative z-10">

      <div className="max-w-3xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl px-8 py-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#1f2937] mb-4">
            Start Learning Something New
          </h2>

          <p className="text-gray-600 mb-8">
            Explore skills, share knowledge, and grow with the community.
          </p>

          <Link
            to="/login"
            className="inline-block px-8 py-3.5 bg-[#145537] text-white font-medium rounded-full hover:bg-[#0f402a] shadow-[0_4px_14px_0_rgba(20,85,55,0.39)] hover:shadow-[0_6px_20px_rgba(20,85,55,0.23)] transition-all duration-200 hover:-translate-y-0.5"
          >
            Get Started
          </Link>

        </motion.div>

      </div>

    </section>
  );
}