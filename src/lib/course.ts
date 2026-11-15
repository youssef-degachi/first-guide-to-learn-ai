import data from '../generated/content.json';
import type { Course } from '../types';

export const course = data as unknown as Course;
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const lessonUrl = (id: string) => `#/learn/${id}`;
export const resourceUrl = (id: string) => `#/resources/${id}`;
export const formatDate = (value: string) => new Date(`${value}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
