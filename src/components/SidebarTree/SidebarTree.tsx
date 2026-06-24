import React from 'react';
// Import components
import TreeNode from '../../containers/treeNode';
const SidebarTree = ({ fileSystem, currentPath, openFolder, openProject }) => {
  const fs = fileSystem;
  let treeNodeLevel = 0;
  if (!fs) return null;
  return (
    <ul className="sidebar-tree">
      <TreeNode
        node={fs}
        nodeLevel={treeNodeLevel}
        currentPath={currentPath}
        openFolder={openFolder}
        openProject={openProject}
      />
    </ul>
  );
};
export default SidebarTree;
