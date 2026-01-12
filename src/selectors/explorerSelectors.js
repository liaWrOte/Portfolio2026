export const getCurrentNode = state => {
  let node = state.main.fileSystem;
  console.log('NODE BEFORE', node);
  // console.log('state', state);
  // console.log('state.main.navigation.currentPath', state.main.navigation.currentPath);
  state.main.navigation.currentPath
    .filter(id => id !== 'root')
    .forEach(id => {
    if (!node || !node.children) return;
    node = node.children?.find(child => child.id === id);
  });
  console.log('NODE AFTER', node);
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
