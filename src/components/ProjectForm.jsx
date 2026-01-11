import { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export function ProjectForm({ user, existingProject, onSuccess }) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (existingProject) {
      setProjectName(existingProject.projectName || '');
      setDescription(existingProject.description || '');
      setWebsiteUrl(existingProject.websiteUrl || '');
      setGithubUrl(existingProject.githubUrl || '');
    }
  }, [existingProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim() || !description.trim()) return;

    setSaving(true);
    try {
      const projectRef = doc(db, 'projects', user.uid);
      await setDoc(projectRef, {
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        projectName: projectName.trim(),
        description: description.trim(),
        websiteUrl: websiteUrl.trim() || null,
        githubUrl: githubUrl.trim() || null,
        createdAt: existingProject?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to sink your ship? This cannot be undone.')) return;

    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'projects', user.uid));
      setProjectName('');
      setDescription('');
      setWebsiteUrl('');
      setGithubUrl('');
      onSuccess?.();
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="projectName" className="block text-sm font-semibold text-[var(--navy)] mb-2">
          Project Name *
        </label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
          className="input-retro w-full"
          placeholder="S.S. Awesome Project"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-[var(--navy)] mb-2">
          Description *
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="input-retro w-full resize-none"
          placeholder="Tell us about your voyage... What did you build? What problems does it solve?"
        />
      </div>

      <div>
        <label htmlFor="websiteUrl" className="block text-sm font-semibold text-[var(--navy)] mb-2">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--coral)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Website URL
          </span>
        </label>
        <input
          type="url"
          id="websiteUrl"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className="input-retro w-full"
          placeholder="https://myproject.com"
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-semibold text-[var(--navy)] mb-2">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="var(--navy)" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub URL
          </span>
        </label>
        <input
          type="url"
          id="githubUrl"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="input-retro w-full"
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={saving || !projectName.trim() || !description.trim()}
          className="btn-coral flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
              </svg>
              Setting Sail...
            </span>
          ) : existingProject ? 'Update Ship' : 'Launch Ship'}
        </button>

        {existingProject && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg border-3 border-[var(--navy)] shadow-[4px_4px_0_var(--navy)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--navy)] transition-all disabled:opacity-50"
          >
            {deleting ? 'Sinking...' : 'Sink Ship'}
          </button>
        )}
      </div>
    </form>
  );
}
