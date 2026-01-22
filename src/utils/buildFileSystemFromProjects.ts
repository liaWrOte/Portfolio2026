// utils/buildFileSystemFromProjects.ts
import { Project, FileSystemNode } from '../types';

export function buildFileSystemFromProjects(projects: Project[]): FileSystemNode {
  const root: FileSystemNode = {
    id: 'root',
    name: 'Projets',
    type: 'folder',
    children: []
  };
  
  const foldersMap: Record<string, FileSystemNode> = {};
  
  projects.forEach((project: Project) => {
    const category = project.attributes.type || 'Autres';
    
    if (!foldersMap[category]) {
      foldersMap[category] = {
        id: category,
        name: category,
        type: 'folder',
        children: []
      };
      root.children!.push(foldersMap[category]);
    }
    
    foldersMap[category].children!.push({
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
