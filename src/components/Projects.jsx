import React from 'react';
import { TbExternalLink } from "react-icons/tb";
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "College Management System",
    description:
      "A complete web-based solution for managing student records, attendance, and faculty data. Developed with a modern tech stack and role-based access for admin, staff, and students.",
    images: ["/assets/cms-1.png", "/assets/cms-2.png"],
    link: "https://github.com/pranavop45/College-Management-System"
  },
  {
    id: 2,
    title: "AI Powered Portfolio",
    description:
      "An advanced personal portfolio with an integrated AI Assistant, real-time APIs, and 3D UI animations — enabling dynamic interactions and smart responses.",
    images: ["/assets/portfolio-1.png", "/assets/portfolio-2.png"],
    link: "https://github.com/pranavop45/portfolio-ai-assistance"
  },
  {
    id: 3,
    title: "Snake & Ladders – Stylish UI Game",
    description:
      "A clean and modern Snake & Ladders browser game with a stylish UI, smooth animations, and responsive board design. Built using HTML, CSS, and JavaScript with a polished user experience.",
    images: ["/assets/project-3-1.png", "/assets/project-3-2.png"],
    link: "https://github.com/pranavop45/snakes-and-ladders-pranav-edition"
  }
];

export default function Projects() {
  return (
    <div className="bg-black px-5 lg:px-28 py-8 my-8 lg:py-16 lg:my-16" id="projects">
      <h2 className="text-2xl lg:text-4xl text-center text-white">
        My <span className="font-extrabold">Projects</span>
      </h2>


<div className="bg-black/10 border border-white/10 rounded-xl p-4 my-6 text-sm backdrop-blur-md">
  <p className="text-white/80 leading-relaxed">
    <strong className="text-white">📌 Important Note — Read</strong><br /><br />
    The projects shown here are just <strong>lightweight demo samples</strong> of my work.
    My real advanced projects — including security tools, automation systems, reverse-engineering
    utilities, AI integrations, custom bypass frameworks, and internal applications — are
    <strong>private for security reasons</strong>.
    <br /><br />
    So don’t judge my skill level by these basic projects 😄🔥
    I work across:
    <br />
    • Full-stack development (Frontend + Backend)<br />
    • Android/Application dev<br />
    • AI Assistants (like Rio 🤖)<br />
    • Cybersecurity & automation<br />
    • Reverse engineering & mod development<br />
    • High-performance tools & systems<br /><br />
    These public projects are just previews — my real work is far more <strong>advanced,
    complex, and powerful</strong> 🚀
    <br /><br />
  </p>
</div>


      <div className="lg:mt-16 mt-8 lg:space-y-24 space-y-14 lg:pb-6 pb-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex flex-col lg:flex-row items-start gap-12 ${
              index % 2 === 0 ? "" : "lg:flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 10,
              delay: index * 0.15
            }}
            viewport={{ once: true }}
          >
            {/* Top Image */}
            <div className="lg:w-1/2 w-full flex flex-col gap-6">
              <img
                src={project.images[0]}
                alt={`${project.title} preview`}
                className="w-full rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="lg:w-1/2 w-full flex flex-col justify-center lg:pl-10">
              <h2 className="font-extrabold text-white text-3xl lg:text-5xl mb-2">
                {String(project.id).padStart(2, "0")}
              </h2>
              <p className="font-bold text-white text-xl lg:text-3xl mb-4">
                {project.title}
              </p>
              <p className="font-light text-sm/6 lg:text-base text-[#A1A1AA] leading-relaxed mb-4">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-[#00FF88] transition-colors"
              >
                <TbExternalLink size={20} />
                View Project
              </a>

              {/* Second image — below View Project */}
              <div className="mt-6">
                <img
                  src={project.images[1]}
                  alt={`${project.title} extra`}
                  className="w-full rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
