import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { UserPlus, BookOpen, TrendingUp, Users, Video, Wallet, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Account", description: "Sign up and build your learning profile." },
  { icon: BookOpen, title: "Explore Courses", description: "Browse skill courses shared by tutors." },
  { icon: Video, title: "Join Live Sessions", description: "Attend live workshops and interactive classes." },
  { icon: Users, title: "Collaborate", description: "Study with others in group learning environments." },
  { icon: Wallet, title: "Earn Credits", description: "Gain credits through participation and engagement." },
  { icon: TrendingUp, title: "Grow Skills", description: "Improve knowledge and unlock new opportunities." }
];

export default function HowItWorks() {
  const controls = useAnimation();
  const x = useRef(0);

  const startAutoScroll = () => {
    controls.start({
      x: [x.current, x.current - 2000],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity
      }
    });
  };

  useEffect(() => {
    startAutoScroll();
  }, []);

  const handleDragStart = () => {
    controls.stop();
  };

  const handleDragEnd = (_: any, info: any) => {
    x.current += info.offset.x;
    startAutoScroll();
  };

  const scrollLeft = () => {
    x.current += 300;
    controls.start({ x: x.current, transition: { duration: 0.4 } });
  };

  const scrollRight = () => {
    x.current -= 300;
    controls.start({ x: x.current, transition: { duration: 0.4 } });
  };

  return (
    <section className="py-24 bg-transparent overflow-hidden">

      <div className="text-center mb-16 px-6 relative z-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#1f2937]">
          How It Works
        </h2>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Learn, teach, collaborate, and grow your skills through an interactive learning ecosystem.
        </p>
      </div>

      <div className="relative z-10">

        {/* arrows */}
        <button
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-white/60 p-3 rounded-full hover:bg-white transition-colors text-[#145537]"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-white/60 p-3 rounded-full hover:bg-white transition-colors text-[#145537]"
        >
          <ChevronRight size={22} />
        </button>

        <motion.div
          className="flex gap-8 px-12 w-max cursor-grab active:cursor-grabbing pb-8 pt-4"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -3000, right: 300 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {[...steps, ...steps, ...steps].map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="w-72 bg-white/60 backdrop-blur-md p-7 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_8px_30px_rgba(20,85,55,0.08)] hover:border-white transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#145537]/5 flex items-center justify-center rounded-xl mb-4 group-hover:bg-[#145537]/10 transition-colors text-[#145537]">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold text-[#1f2937] mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </motion.div>

      </div>

    </section>
  );
}