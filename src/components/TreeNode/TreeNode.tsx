import React from 'react';

// styles
import './treenode.scss';

import folderClosedIcon2 from '../assets/img/icons/folder_closed_2_icon.svg';
import folderOpenIcon from '../assets/img/icons/folder_open_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';

export default function TreeNode({ node, openFolder, openProject, nodeLevel = 0, currentPath }) {
  // IsActive class for selected node
  const isActive = currentPath.includes(node.id);

  // Dispatch of called function on click
  const handleClick = () => {
    if (node.type === 'folder') openFolder(node.id);
    if (node.type === 'project') openProject(node.id);
  };

  return (
    <li>
      {/* TreeNode element */}
      <span
        onClick={handleClick}
        style={{
          fontWeight: isActive ? 'bold' : 'normal',
          background: isActive ? '#e0e0e0' : 'transparent',
          cursor: 'pointer'
        }}
        className="treenode"
      >
        {[...Array(nodeLevel)].map((_, i) => (i > 0 ? <span key={i}>&nbsp;</span> : null))}
        {node.type === 'folder' ? (
          isActive ? (
            <img src={folderOpenIcon} alt="Logo" className="treenode-icons" />
          ) : (
            <img src={folderClosedIcon2} alt="Logo" className="treenode-icons" />
          )
        ) : (
          <img src={fileIcon} alt="Logo" className="treenode-icons" />
        )}
        &nbsp;{node.name}
      </span>

      {/* Recursive TreeNode children */}
      {node.children && (
        <ul>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              openFolder={openFolder}
              openProject={openProject}
              nodeLevel={nodeLevel + 1}
              currentPath={currentPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
