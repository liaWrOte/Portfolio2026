import React from 'react';
import TreeNode from '../../containers/treeNode';

const SidebarTree = (fileSystem, openFolder, openProject) => {
  const fs = fileSystem.fileSystem;
  console.log('SIDEBAR TREE ', fileSystem.fileSystem);

  if (!fs) return null;

  return (
    <ul className="sidebar-tree">
      <TreeNode 
        node={fs}
        // openFolder={openFolder(fs.id)}
        // openProject={openProject(fs.id)}
      />
    </ul>
  );
}

export default SidebarTree;
