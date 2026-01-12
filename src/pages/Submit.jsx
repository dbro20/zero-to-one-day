import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';
import { ProjectForm } from '../components/ProjectForm';

export function Submit() {
  const { user, loading: authLoading } = useAuth();
  const [existingProject, setExistingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExistingProject = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const projectDoc = await getDoc(doc(db, 'projects', user.uid));
        if (projectDoc.exists()) {
          setExistingProject({ id: projectDoc.id, ...projectDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchExistingProject();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <svg className="w-16 h-16 sailing text-[var(--coral)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 20h20" strokeLinecap="round"/>
          <path d="M4 17l2-10h12l2 10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7V3" strokeLinecap="round"/>
          <path d="M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="mt-4 text-[var(--navy-light)] font-medium">Preparing the dock...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="card-retro p-10 max-w-md text-center">
          <svg className="w-20 h-20 mx-auto mb-6 text-[var(--navy-light)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 20h20" strokeLinecap="round"/>
            <path d="M4 17l2-10h12l2 10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 7V3" strokeLinecap="round"/>
            <path d="M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="text-2xl font-bold text-[var(--navy)] mb-3">Submissions Closed</h1>
          <p className="text-[var(--navy-light)]">Project submissions for Zero to One Day are now closed. Thanks to everyone who participated!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="card-retro p-8">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-[var(--coral)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 20h20" strokeLinecap="round"/>
              <path d="M4 17l2-10h12l2 10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7V3" strokeLinecap="round"/>
              <path d="M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className="text-2xl font-bold text-[var(--navy)]">
              {existingProject ? 'Update Your Ship' : 'Launch Your Ship'}
            </h1>
          </div>
          <p className="text-[var(--navy-light)] mb-8">
            {existingProject
              ? 'Make changes to your project submission.'
              : 'Tell us about what you built during Zero to One Day!'}
          </p>

          <ProjectForm
            user={user}
            existingProject={existingProject}
            onSuccess={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
}
