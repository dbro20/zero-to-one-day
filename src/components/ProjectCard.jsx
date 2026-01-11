import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProjectCard({ project }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isOwner = user?.uid === project.userId;

  const handleClick = () => {
    if (isOwner) {
      navigate('/submit');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`card-retro overflow-hidden transition-all ${
        isOwner
          ? 'cursor-pointer hover:translate-y-[-4px] hover:shadow-[8px_8px_0_var(--navy)]'
          : 'hover:translate-y-[-2px]'
      }`}
    >
      <div className="p-6">
        {/* Header with avatar */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={project.photoURL}
            alt={project.displayName}
            className="w-12 h-12 rounded-full border-3 border-[var(--navy)]"
          />
          <div>
            <span className="font-semibold text-[var(--navy)]">{project.displayName}</span>
            {isOwner && (
              <div className="flex items-center gap-1 text-xs text-[var(--coral)]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Click to edit
              </div>
            )}
          </div>
        </div>

        {/* Project name */}
        <h3 className="text-xl font-bold text-[var(--navy)] mb-2">{project.projectName}</h3>

        {/* Description */}
        <p className="text-[var(--navy-light)] text-sm mb-4 line-clamp-3">{project.description}</p>

        {/* Links */}
        <div className="flex gap-3 pt-3 border-t-2 border-dashed border-[var(--cream-dark)]">
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--coral)] hover:text-[var(--coral-dark)] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--navy)] hover:text-[var(--navy-light)] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
