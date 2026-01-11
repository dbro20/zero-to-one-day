import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../hooks/useAuth';
import { ProjectForm } from '../components/ProjectForm';

export function Submit() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
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
          <svg className="w-20 h-20 mx-auto mb-6 text-[var(--coral)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 20h20" strokeLinecap="round"/>
            <path d="M4 17l2-10h12l2 10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 7V3" strokeLinecap="round"/>
            <path d="M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="text-2xl font-bold text-[var(--navy)] mb-3">Ready to Ship?</h1>
          <p className="text-[var(--navy-light)] mb-6">Sign in with Google to submit your project and join the fleet.</p>
          <button
            onClick={signInWithGoogle}
            className="btn-coral inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Board with Google
          </button>
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
