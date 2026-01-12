import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { ProjectCard } from './ProjectCard';

export function ProjectGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const projectList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Prioritize specific creators at the top
        const priorityCreators = ['Dylan Brodeur', 'Wayne Chang', 'Dilly Dally', 'Steen', 'Greg Skriloff'];
        const sortedProjects = [...projectList].sort((a, b) => {
          const aIndex = priorityCreators.indexOf(a.creatorName);
          const bIndex = priorityCreators.indexOf(b.creatorName);
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });
        setProjects(sortedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="w-16 h-16 sailing text-[var(--coral)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h20" strokeLinecap="round"/>
          <path d="M4 17l2-10h12l2 10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7V3" strokeLinecap="round"/>
          <path d="M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="mt-4 text-[var(--navy-light)] font-medium">Loading fleet...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="card-retro p-12 text-center">
        <svg className="w-20 h-20 mx-auto mb-4 text-[var(--sky)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <h3 className="text-xl font-bold text-[var(--navy)] mb-2">No ships have set sail yet!</h3>
        <p className="text-[var(--navy-light)]">Be the first captain to launch a project.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div
          key={project.id}
          style={{ animationDelay: `${index * 100}ms` }}
          className="animate-fade-in"
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
