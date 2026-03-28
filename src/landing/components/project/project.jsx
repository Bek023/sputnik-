import { useState, useEffect } from "react";
import { api, resolveImageUrl } from "../../../api";

const staticProjects = [
  {
    title: "Commercial Installation",
    description: "Modern office building electrical setup",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    link: "#",
  },
  {
    title: "Smart Home System",
    description: "Complete smart home automation",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    link: "#",
  },
  {
    title: "Industrial Wiring",
    description: "Heavy-duty industrial electrical work",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    link: "#",
  },
];

const ProjectCard = ({ project }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-gray-900 transition-transform duration-300 hover:-translate-y-2">
    <img
      src={resolveImageUrl(project.image)}
      alt={project.title}
      className="h-64 w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
    />

    <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-white/10 border-t border-white/20">
      <div className="absolute inset-0 bg-linear-to-tr from-blue-400/10 via-transparent to-orange-400/10 opacity-50" />

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
        <p className="text-gray-200 text-sm mb-4">{project.description}</p>

        <a
          href={project.link || "#"}
          className="inline-flex items-center text-white font-semibold text-sm hover:underline"
        >
          View Project
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
);

const ProjectGrid = () => {
  const [projects, setProjects] = useState(staticProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchProjects() {
      try {
        const data = await api.projects.getAll();
        if (!cancelled && data?.length > 0) {
          setProjects([...staticProjects, ...data]);
        }
      } catch {
        const fallback = JSON.parse(localStorage.getItem("admin_projects") || "[]");
        if (!cancelled && fallback.length > 0) {
          setProjects([...staticProjects, ...fallback]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="project" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Bizning Loyihalar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="col-span-full text-center text-gray-500 py-8">Yuklanmoqda...</p>
          ) : (
            projects.map((project, index) => (
              <ProjectCard key={project.id ?? index} project={project} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
