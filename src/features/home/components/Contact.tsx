import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 lg:px-20 bg-transparent">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#1f2937] tracking-tight">
                        Contact Us
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold text-[#1f2937] mb-4">Get in Touch</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            We'd love to hear from you. Reach out for collaboration, feedback, or support and our team will get back to you as soon as possible.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-white/60 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] text-[#145537] shrink-0 border border-white/60 group-hover:bg-white transition-colors">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#1f2937] mb-1">Email</h4>
                                    <a href="mailto:skillsharehub@gmail.com" className="text-gray-600 hover:text-[#145537] transition">
                                        skillsharehub@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-white/60 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] text-[#145537] shrink-0 border border-white/60 group-hover:bg-white transition-colors">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#1f2937] mb-1">Office</h4>
                                    <span className="text-gray-600">Global Remote Team</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-white/60 backdrop-blur-md rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.04)] text-[#145537] shrink-0 border border-white/60 group-hover:bg-white transition-colors">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#1f2937] mb-1">Phone</h4>
                                    <span className="text-gray-600">+1 (555) 000-0000</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
                    >
                        <form
                            action="mailto:skillsharehub@gmail.com"
                            method="GET"
                            encType="text/plain"
                            className="space-y-6"
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="subject"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-xl border border-white/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#145537] focus:border-transparent outline-none transition bg-white/50 focus:bg-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 rounded-xl border border-white/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#145537] focus:border-transparent outline-none transition bg-white/50 focus:bg-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="body"
                                    name="body"
                                    rows={4}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-xl border border-white/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-[#145537] focus:border-transparent outline-none transition bg-white/50 focus:bg-white resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-[#145537] hover:bg-[#0f402a] text-white font-medium rounded-xl shadow-[0_4px_14px_0_rgba(20,85,55,0.39)] hover:shadow-[0_6px_20px_rgba(20,85,55,0.23)] transition-all duration-200"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
