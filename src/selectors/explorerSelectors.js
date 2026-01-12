export const getCurrentNode = state => {
  let node = state.main.fileSystem;
  state.main.navigation.currentPath
    .filter(id => id !== 'root')
    .forEach(id => {
    if (!node || !node.children) return;
    node = node.children?.find(child => child.id === id);
  });
  return node;
};

export const getProjectById = (state, id) => {
  const walk = (node) => {
    if (!node) return null;

    if (node.id === state.main.window.activeId) return node;

    if (node.children) {
      for (const child of node.children) {
        const found = walk(child);
        if (found) return found;
      }
    }

    return null;
  };

  return walk(state.main.fileSystem);
};
