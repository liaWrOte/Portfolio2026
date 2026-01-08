import React from 'react';
import TreeNode from '../../containers/treeNode';

const SidebarTree = (fileSystem, openFolder, openProject) => {
  const fs = fileSystem.fileSystem;
  console.log('SIDEBAR TREE ', fileSystem.fileSystem);

  let treeNodeLevel = 0
  if (!fs) return null;

  return (
    <ul className="sidebar-tree">
      <TreeNode 
        node={fs}
        nodeLevel={treeNodeLevel}
        // openFolder={openFolder(fs.id)}
        // openProject={openProject(fs.id)}
      />
    </ul>
  );
}

export default SidebarTree;
