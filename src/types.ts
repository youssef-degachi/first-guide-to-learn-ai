export interface Heading { title: string; id: string; level: number }
export interface ContentItem {
  id: string; title: string; summary: string; updated: string; body: string;
  headings: Heading[]; download: string; searchText: string; type: 'lesson' | 'resource';
}
export interface Lesson extends ContentItem {
  type: 'lesson'; module: string; order: number; sequence: number; minutes: number; level: string; objectives: string[]; lab: number;
}
export interface Resource extends ContentItem { type: 'resource'; category: string; original: string }
export interface Chapter { id: string; number: string; title: string; shortTitle: string; description: string; outcome: string; icon: string; color: string }
export interface Course { title: string; description: string; researchSnapshot: string; edition: string; modules: Chapter[]; lessons: Lesson[]; resources: Resource[] }
export interface Progress { completed: string[]; saved: string[]; notes: Record<string,string>; lastLesson: string | null }
