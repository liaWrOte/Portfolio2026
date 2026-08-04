import { MainState, Project, FileSystemNode } from '../types';

const getActiveFileSystem = (state: MainState): FileSystemNode | undefined => {
  return state.language === 'en' && state.fileSystemEn ? state.fileSystemEn : state.fileSystem;
};

export const getCurrentNode = (state: MainState) => {
  const activeFs = getActiveFileSystem(state);
  if (!activeFs) return null;
  let node: FileSystemNode | undefined = activeFs;
  // Le currentPath est dans state.navigation.currentPath
  // Prendre seulement le dernier élément du chemin pour le projet actuel
  const pathIds = state.navigation?.currentPath?.filter((id: string) => id !== 'root') || [];
  const currentId = pathIds[pathIds.length - 1];
  if (!currentId) return activeFs;
  // Si c'est un ID numérique, chercher récursivement
  if (!isNaN(Number(currentId))) {
    const findProjectRecursively = (
      searchNode: FileSystemNode | undefined
    ): FileSystemNode | undefined => {
      if (!searchNode) return undefined;
      // Chercher dans les enfants directs
      const found = searchNode.children?.find((child: FileSystemNode) => child.id === currentId);
      if (found) return found;
      // Chercher récursivement dans les sous-dossiers
      for (const child of searchNode.children || []) {
        if (child.type === 'folder') {
          const result = findProjectRecursively(child);
          if (result) return result;
        }
      }
      return undefined;
    };
    node = findProjectRecursively(node);
  } else {
    node = node?.children?.find((child: FileSystemNode) => child.id === currentId);
  }
  return node || null;
};
export const getProjectById = (state: MainState, id: string): Project | null => {
  const activeFs = getActiveFileSystem(state);
  if (!activeFs) return null;
  const walk = (node: FileSystemNode): Project | null => {
    if (node.type === 'project' && node.id === id) {
      return {
        id: node.id,
        attributes: {
          title: node.name || '',
          type: node.category || '',
          techno: node.techno || '',
          role: node.role || '',
          pitch: node.pitch || '',
          link: node.link || '',
          date: node.date || '',
          createdAt: node.createdAt || '',
          updatedAt: node.updatedAt || '',
          publishedAt: node.publishedAt || ''
        }
      };
    }
    if (node.children) {
      for (const child of node.children) {
        const found = walk(child);
        if (found) return found;
      }
    }
    return null;
  };
  return walk(activeFs);
};
