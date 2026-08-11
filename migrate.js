/**
 * Migration script: local Strapi (SQLite) → Railway Strapi (PostgreSQL)
 * Run with: node migrate.js
 * Prerequisites: local Strapi must be running on http://localhost:1337
 */

const axios = require('axios');
const FormData = require('form-data');
const path = require('path');

const LOCAL_URL = 'http://127.0.0.1:1337';
const RAILWAY_URL = 'https://strapi-portfolio2026-production.up.railway.app';
const RAILWAY_TOKEN = '';

const railwayApi = axios.create({
  baseURL: RAILWAY_URL,
  headers: { Authorization: `Bearer ${RAILWAY_TOKEN}` }
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function uploadMedia(relativeUrl, retries = 3) {
  if (!relativeUrl) return null;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const fullUrl = LOCAL_URL + relativeUrl;
      const response = await axios.get(fullUrl, { responseType: 'arraybuffer' });
      const filename = path.basename(relativeUrl).split('?')[0];
      const form = new FormData();
      form.append('files', Buffer.from(response.data), { filename });
      const uploadRes = await railwayApi.post('/api/upload', form, {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });
      console.log(`  ✓ Uploaded: ${filename}`);
      await sleep(1000);
      return uploadRes.data[0].id;
    } catch (err) {
      if (attempt < retries) {
        console.warn(`  ↻ Retry ${attempt}/${retries} for ${path.basename(relativeUrl)}...`);
        await sleep(3000 * attempt);
      } else {
        console.error(`  ✗ Failed to upload ${relativeUrl}:`, err.message);
        return null;
      }
    }
  }
}

async function migrateParagraphs(paragraphs) {
  if (!paragraphs || paragraphs.length === 0) return [];
  const result = [];
  for (const p of paragraphs) {
    const migratedImages = [];
    for (const img of (p.images || [])) {
      const fileUrl = img.file?.data?.attributes?.url;
      const newFileId = await uploadMedia(fileUrl);
      migratedImages.push({ file: newFileId, caption: img.caption || null });
    }
    result.push({
      Title: p.Title || null,
      Description: p.Description || null,
      images: migratedImages
    });
  }
  return result;
}

async function fetchLocalProjects(locale) {
  const res = await axios.get(`${LOCAL_URL}/api/projects`, {
    params: {
      locale,
      'pagination[pageSize]': 100,
      'populate[logo][populate]': '*',
      'populate[thumbnail][populate]': '*',
      'populate[paragraph][populate][images][populate]': '*',
      'populate[localizations]': '*'
    }
  });
  return res.data.data;
}

async function migrate() {
  console.log('🚀 Starting migration...\n');

  // Detect primary locale: try fr-FR, then fr, then en
  console.log('📥 Fetching projects from local Strapi...');
  let projects = await fetchLocalProjects('fr-FR');
  let primaryLocale = 'fr-FR';
  if (projects.length === 0) {
    projects = await fetchLocalProjects('fr');
    primaryLocale = 'fr';
  }
  if (projects.length === 0) {
    projects = await fetchLocalProjects('en');
    primaryLocale = 'en';
  }
  console.log(`   Found ${projects.length} projects (locale: ${primaryLocale})\n`);

  const idMap = {}; // local_id → railway_id

  for (const project of projects) {
    const a = project.attributes;
    console.log(`→ Migrating [${primaryLocale.toUpperCase()}]: ${a.title}`);
    const logoId = await uploadMedia(a.logo?.data?.attributes?.url);
    const thumbnailId = await uploadMedia(a.thumbnail?.data?.attributes?.url);
    const paragraphs = await migrateParagraphs(a.paragraph);
    try {
      const res = await railwayApi.post('/api/projects', {
        data: {
          title: a.title, type: a.type, techno: a.techno, role: a.role,
          pitch: a.pitch, link: a.link, date: a.date,
          logo: logoId, thumbnail: thumbnailId, paragraph: paragraphs,
          locale: primaryLocale,
          publishedAt: a.publishedAt || new Date().toISOString()
        }
      });
      idMap[project.id] = res.data.data.id;
      console.log(`  ✓ Created (local #${project.id} → railway #${res.data.data.id})\n`);
    } catch (err) {
      console.error(`  ✗ Failed:`, err.response?.data || err.message, '\n');
    }
  }

  // Migrate the other locale if any localizations exist
  const otherLocale = (primaryLocale === 'fr' || primaryLocale === 'fr-FR') ? 'en' : 'fr-FR';
  const otherProjects = await fetchLocalProjects(otherLocale);
  if (otherProjects.length > 0) {
    console.log(`📥 Found ${otherProjects.length} ${otherLocale.toUpperCase()} localizations\n`);
    for (const project of otherProjects) {
      const a = project.attributes;
      const primaryLocalization = a.localizations?.data?.[0];
      const railwayPrimaryId = idMap[primaryLocalization?.id];
      if (!railwayPrimaryId) {
        console.warn(`  ⚠ No matching primary project for: "${a.title}"\n`);
        continue;
      }
      console.log(`→ Migrating [${otherLocale.toUpperCase()}]: ${a.title}`);
      const logoId = await uploadMedia(a.logo?.data?.attributes?.url);
      const thumbnailId = await uploadMedia(a.thumbnail?.data?.attributes?.url);
      const paragraphs = await migrateParagraphs(a.paragraph);
      try {
        await railwayApi.post(`/api/projects/${railwayPrimaryId}/localizations`, {
          title: a.title, type: a.type, techno: a.techno, role: a.role,
          pitch: a.pitch, link: a.link, date: a.date,
          logo: logoId, thumbnail: thumbnailId, paragraph: paragraphs,
          locale: otherLocale,
          publishedAt: a.publishedAt || new Date().toISOString()
        });
        console.log(`  ✓ Created ${otherLocale.toUpperCase()} localization\n`);
      } catch (err) {
        console.error(`  ✗ Failed:`, err.response?.data || err.message, '\n');
      }
    }
  }

  console.log('✅ Migration complete!');
  console.log('⚠️  Revoke the Railway API token you shared in chat.');
}

migrate().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
