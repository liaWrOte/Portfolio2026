// utils/buildFileSystemFromProjects.js
export function buildFileSystemFromProjects(projects) {
  const root = {
    id: 'root',
    name: 'Projets',
    type: 'folder',
    children: [],
  };

  const foldersMap = {};

  projects.forEach(project => {
    const category = project.attributes.type || 'Autres';

    if (!foldersMap[category]) {
      foldersMap[category] = {
        id: category,
        name: category,
        type: 'folder',
        children: [],
      };
      root.children.push(foldersMap[category]);
    }

    foldersMap[category].children.push({
      id: project.id,
      name: project.attributes.title,
      type: 'project',
      techno: project.attributes.techno,
      role: project.attributes.role,
      pitch: project.attributes.pitch,
      link: project.attributes.link,
      date: project.attributes.date,
      createdAt: project.attributes.createdAt,
      updatedAt: project.attributes.updatedAt,
      publishedAt: project.attributes.publishedAt,
    });
  });

  return root;
}
