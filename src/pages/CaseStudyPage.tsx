import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FinalCTA from "@/components/home/FinalCTA";

const CaseStudyPage = () => {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="section-dark min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-display-xl text-varcheck-dark-text">Project not found</h1>
            <Link to="/work" className="mt-4 inline-flex items-center gap-2 text-varcheck-accent font-body">
              <ArrowLeft size={16} /> Back to work
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="section-dark section-padding pt-32 md:pt-40">
          <div className="container-main">
            <Link to="/work" className="inline-flex items-center gap-2 text-varcheck-dark-muted hover:text-varcheck-accent font-body text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> All Projects
            </Link>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="font-mono text-xs text-varcheck-accent uppercase tracking-widest">{project.category}</span>
              <h1 className="text-display-2xl text-varcheck-dark-text mt-4">{project.title}</h1>
              <p className="mt-6 font-body text-lg text-varcheck-dark-muted max-w-2xl leading-relaxed">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs text-varcheck-accent bg-varcheck-dark-surface border border-varcheck-dark-border px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-light section-padding">
          <div className="container-main max-w-3xl space-y-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-display-lg text-varcheck-light-text mb-4">The Problem</h2>
              <p className="font-body text-base text-varcheck-light-muted leading-relaxed">{project.problem}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-display-lg text-varcheck-light-text mb-4">Our Solution</h2>
              <p className="font-body text-base text-varcheck-light-muted leading-relaxed">{project.solution}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-display-lg text-varcheck-light-text mb-6">Results</h2>
              <div className="space-y-4">
                {project.results.map((r) => (
                  <div key={r} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-varcheck-accent flex-shrink-0 mt-0.5" />
                    <span className="font-body text-base text-varcheck-light-text">{r}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default CaseStudyPage;
