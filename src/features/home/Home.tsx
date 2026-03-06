import Navbar from "../navbar/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Contact from "./components/Contact";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <div
            className="relative text-[#1f2937] min-h-screen font-sans overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f3faf6 40%, #e8f6ee 100%)'
            }}
        >
            {/* Global Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
                {/* Radial Gradients */}
                <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at top right, rgba(20,85,55,0.08), transparent 40%)' }}></div>
                <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at bottom left, rgba(20,85,55,0.06), transparent 45%)' }}></div>

                {/* Mesh Texture */}
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#145537 1px, transparent 1px), linear-gradient(90deg, #145537 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>

                {/* Noise Texture */}
                <div className="absolute inset-0 z-0 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            </div>

            <div className="relative z-10">
                <Navbar />
                <main>
                    <Hero />
                    <Features />
                    <About />
                    <HowItWorks />
                    <Contact />
                    <CTA />
                </main>
                <Footer />
            </div>
        </div>
    );
}