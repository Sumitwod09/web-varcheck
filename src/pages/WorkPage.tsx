import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircle } from '@fortawesome/free-solid-svg-icons';

import { PROJECTS } from "@/lib/projects";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Sparkle = ({ className }: { className?: string }) => (
  <svg
    className={`absolute w-6 h-6 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0C12 5.52285 16.4772 10 22 10C16.4772 10 12 14.4772 12 20C12 14.4772 7.52285 10 2 10C7.52285 10 12 5.52285 12 0Z"
      fill="currentColor"
    />
  </svg>
);

const WorkPage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-[#0A0A0F] min-h-screen pt-24 pb-16 selection:bg-varcheck-accent/30">
        
        {/* Stats Bar */}
        <section className="border-b border-white/5 bg-[#111118]/50 backdrop-blur-md sticky top-[72px] z-40">
          <div className="container-main py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-mono tracking-wide text-varcheck-dark-muted">
              <div className="flex items-center gap-2">
                <span className="text-varcheck-accent font-bold text-lg">3</span> Projects Delivered
              </div>
              <span className="hidden md:block text-white/10">•</span>
              <div className="flex items-center gap-2">
                <span className="text-varcheck-accent font-bold text-lg">3</span> Industries
              </div>
              <span className="hidden md:block text-white/10">•</span>
              <div className="flex items-center gap-2">
                <span className="text-varcheck-accent font-bold text-lg">&lt; 3</span> Weeks avg. delivery
              </div>
              <span className="hidden md:block text-white/10">•</span>
              <div className="flex items-center gap-2">
                <span className="text-varcheck-accent font-bold text-lg">100%</span> on Vercel
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-20 left-10 md:left-20 text-white/20 animate-pulse">
            <Sparkle />
          </div>
          <div className="absolute bottom-10 right-10 md:right-20 text-varcheck-accent/40 animate-pulse" style={{ animationDelay: '1s' }}>
            <Sparkle className="w-8 h-8" />
          </div>
          
          <div className="container-main max-w-4xl mx-auto text-center mt-12 mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 tracking-tight"
              style={{ fontFamily: "'Syne', var(--font-display)" }}
            >
              Selected Work
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-varcheck-dark-muted font-body"
              style={{ fontFamily: "'Outfit', var(--font-body)" }}
            >
              Three clients. Three different problems. <br className="hidden md:block" />
              <span className="text-white font-medium">One approach: build it right.</span>
            </motion.p>
          </div>

          <div className="container-main max-w-5xl mx-auto space-y-24">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Accent Border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-varcheck-accent rounded-l-2xl z-20"></div>

                <div className="bg-[#111118] border border-white/5 shadow-2xl rounded-2xl overflow-hidden flex flex-col relative z-10 hover:border-varcheck-accent/30 transition-colors duration-500">
                  
                  {/* Hero Image */}
                  <div className="w-full relative aspect-video md:aspect-[21/9] bg-black overflow-hidden border-b border-white/5">
                    <img 
                      src={project.heroImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-60"></div>
                  </div>

                  <div className="p-8 md:p-12">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.categories.map((cat, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-varcheck-accent/10 border border-varcheck-accent/20 text-varcheck-accent text-xs font-semibold uppercase tracking-wider">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h2 
                      className="text-3xl md:text-4xl font-display font-bold text-white mb-8"
                      style={{ fontFamily: "'Syne', var(--font-display)" }}
                    >
                      {project.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                      <div className="md:col-span-7 space-y-8">
                        {/* The Journey */}
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-3 border-b border-white/10 pb-2 inline-block">The Journey</h3>
                          <p 
                            className="text-varcheck-dark-muted leading-relaxed text-[1.05rem]"
                            style={{ fontFamily: "'Outfit', var(--font-body)" }}
                          >
                            {project.journey}
                          </p>
                        </div>
                        
                        {/* Tech Stack */}
                        <div>
                          <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider text-white/50">Tech Stack</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span key={t} className="font-mono text-xs text-white/70 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-5">
                        {/* Impact */}
                        <div className="bg-black/20 rounded-xl p-6 border border-white/5 h-full">
                          <h3 className="text-white text-lg font-semibold mb-5 flex items-center gap-2">
                            <Sparkle className="w-5 h-5 text-varcheck-accent relative" />
                            Impact
                          </h3>
                          <ul className="space-y-4">
                            {project.impact.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faCircle} className="text-varcheck-accent mt-1.5 text-[8px]" />
                                <span className="text-varcheck-dark-muted text-sm md:text-base leading-snug">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* View Live Site Button */}
                    <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-varcheck-accent hover:text-white transition-all duration-300 group/btn"
                      >
                        View Live Site
                        <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#0A0A0F] py-24 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh opacity-20"></div>
          <div className="container-main relative z-10 text-center">
            <h2 
              className="text-4xl md:text-6xl font-display font-bold text-white mb-8"
              style={{ fontFamily: "'Syne', var(--font-display)" }}
            >
              Have a project in mind?
            </h2>
            <a 
              href="https://wa.me/919727743042" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-varcheck-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-varcheck-accent-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:-translate-y-1"
            >
              Let's Build It Right
              <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
          <Sparkle className="absolute right-20 top-20 text-varcheck-accent/30 w-12 h-12" />
        </section>

      </main>
      <Footer />
    </>
  );
};

export default WorkPage;
