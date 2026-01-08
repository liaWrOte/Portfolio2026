export const getCurrentNode = state => {
  let node = state.fileSystem;
  state.navigation.currentPath.forEach(id => {
    node = node.children?.find(child => child.id === id);
  });
  return node;
};

export const getProjectById = (state, id) => {
  const walk = node => {
    if (!node) return null;
    if (node.type === 'project' && node.projectId === id) return node;
    for (const child of node.children || []) {
      const found = walk(child);
      if (found) return found;
    }
    return null;
  };
  return walk(state.fileSystem);
};
