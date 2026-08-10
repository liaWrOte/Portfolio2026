import React from 'react';
import TreeNode from '../../containers/treeNode';
import './sidebar-tree.scss';

const SidebarTree = ({ fileSystem, currentPath, openFolder, openProject }) => {
  if (!fileSystem) return null;
  return (
    <ul className="sidebar-tree">
      <TreeNode
        node={fileSystem}
        nodeLevel={0}
        currentPath={currentPath}
        openFolder={openFolder}
        openProject={openProject}
      />
    </ul>
  );
};

export default SidebarTree;
