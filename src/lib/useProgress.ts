import { useCallback, useEffect, useState } from 'react';
import { cleanProgress } from './content-utils.mjs';
import { course } from './course';
import { brand } from '../config';
import type { Progress } from '../types';

const validIds = course.lessons.map(l => l.id);
function load(): { progress: Progress; available: boolean } {
  let raw: string | null;
  try { raw = window.localStorage.getItem(brand.storageKey); }
  catch { return { progress: cleanProgress({}, validIds), available: false }; }
  try { return { progress: cleanProgress(raw ? JSON.parse(raw) : {}, validIds), available: true }; }
  catch { return { progress: cleanProgress({}, validIds), available: true }; }
}

export function useProgress() {
  const [initial] = useState(load);
  const [progress, setProgress] = useState<Progress>(initial.progress);
  const [available, setAvailable] = useState(initial.available);
  useEffect(() => {
    try { localStorage.setItem(brand.storageKey, JSON.stringify(progress)); setAvailable(true); }
    catch { setAvailable(false); }
  }, [progress]);
  const toggleComplete = useCallback((id: string) => setProgress(p => ({ ...p, completed: p.completed.includes(id) ? p.completed.filter(v=>v!==id) : [...p.completed,id] })), []);
  const toggleSave = useCallback((id: string) => setProgress(p => ({ ...p, saved: p.saved.includes(id) ? p.saved.filter(v=>v!==id) : [...p.saved,id] })), []);
  const visit = useCallback((id: string) => setProgress(p => p.lastLesson === id ? p : { ...p, lastLesson: id }), []);
  const note = useCallback((id: string, value: string) => setProgress(p => ({ ...p, notes: { ...p.notes, [id]: value.slice(0,10000) } })), []);
  const reset = useCallback(() => setProgress(cleanProgress({}, validIds)), []);
  return { progress, available, toggleComplete, toggleSave, visit, note, reset };
}
export type ProgressStore = ReturnType<typeof useProgress>;
