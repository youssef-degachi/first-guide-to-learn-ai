export function slugify(value) {
  return String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

export function plainText(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>|]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function headings(markdown) {
  let insideFence = false;
  const seen = new Map();
  const result = [];
  for (const line of markdown.split('\n')) {
    if (/^\s*```/.test(line)) insideFence = !insideFence;
    if (insideFence) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const title = match[2].replace(/[*`]/g, '');
    const base = slugify(title);
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    result.push({ title, id: count ? `${base}-${count}` : base, level: match[1].length });
  }
  return result;
}

export function searchContent(items, query) {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return items.map(item => {
    const title = item.title.toLowerCase();
    const summary = (item.summary || item.description || '').toLowerCase();
    const text = (item.searchText || '').toLowerCase();
    if (!tokens.every(token => title.includes(token) || summary.includes(token) || text.includes(token))) return null;
    const score = tokens.reduce((sum, token) => sum + (title.includes(token) ? 10 : 0) + (summary.includes(token) ? 3 : 0), 0);
    return { ...item, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

export function cleanProgress(value, validIds) {
  const valid = new Set(validIds);
  const item = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const ids = field => Array.isArray(item[field]) ? [...new Set(item[field].filter(id => typeof id === 'string' && valid.has(id)))] : [];
  const notes = item.notes && typeof item.notes === 'object' && !Array.isArray(item.notes)
    ? Object.fromEntries(Object.entries(item.notes).filter(([id, note]) => valid.has(id) && typeof note === 'string').map(([id, note]) => [id, note.slice(0, 10000)])) : {};
  return { completed: ids('completed'), saved: ids('saved'), notes, lastLesson: valid.has(item.lastLesson) ? item.lastLesson : null };
}

export function parseRoute(hash) {
  try {
    const path = decodeURIComponent(hash.replace(/^#/, '') || '/');
    const segments = path.replace(/^\//, '').split('/');
    if (segments.length > 2) return { kind: 'not-found', id: '' };
    const [kind, id] = segments;
    if (!kind) return { kind: 'home', id: '' };
    if (['roadmap', 'resources', 'about', 'saved'].includes(kind) && !id) return { kind, id: '' };
    if (['learn', 'resources', 'roadmap'].includes(kind) && id) return { kind, id };
    return { kind: 'not-found', id: '' };
  } catch { return { kind: 'not-found', id: '' }; }
}
