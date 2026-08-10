const CATEGORY_SLUGS: Record<string, { fr: string; en: string }> = {
  'Développement': { fr: 'développement', en: 'development' },
  'Brand Design':  { fr: 'brand-design',  en: 'brand-design' },
};

const SLUG_TO_CATEGORY: Record<string, string> = {
  'développement': 'Développement',
  'development':   'Développement',
  'brand-design':  'Brand Design',
};

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-àâäéèêëîïôöùûüÿçñ]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function categoryToSlug(category: string, lang: 'fr' | 'en'): string {
  return CATEGORY_SLUGS[category]?.[lang] ?? slugify(category);
}

export function slugToCategory(slug: string): string | null {
  return SLUG_TO_CATEGORY[slug] ?? null;
}
