import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/shared/SectionHeading";
import FinalCTA from "@/components/home/FinalCTA";

const WorkPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="section-dark section-padding pt-32 md:pt-40">
          <div className="container-main">
            <SectionHeading
              badge="Our Work"
              title="Projects that speak for themselves"
              description="Real problems, real solutions, real results. Explore our case studies."
              dark
            />
          </div>
        </section>

        <section className="section-light section-padding">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link to={`/work/${project.slug}`} className="card-light block h-full group">
                    <div className="w-full h-48 rounded-xl bg-gradient-to-br from-varcheck-accent/20 to-varcheck-accent-dark/10 mb-6 flex items-center justify-center">
                      <span className="font-mono text-xs text-varcheck-accent uppercase tracking-widest">{project.category}</span>
                    </div>
                    <h3 className="font-display text-display-md text-varcheck-light-text">{project.title}</h3>
                    <p className="mt-2 font-body text-sm text-varcheck-light-muted leading-relaxed line-clamp-2">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="font-mono text-xs text-varcheck-accent bg-varcheck-accent/10 px-2 py-1 rounded">{t}</span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 font-body text-sm font-medium text-varcheck-accent group-hover:gap-3 transition-all">
                      View case study <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default WorkPage;
