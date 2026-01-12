import React from 'react'; 

export default function TreeNode({
  node,
  openFolder,
  openProject,
  nodeLevel = 0,
  currentPath,
}) {
  const isActive = currentPath.includes(node.id);

  const handleClick = () => {
    if (node.type === 'folder') openFolder(node.id);
    if (node.type === 'project') openProject(node.id);
  };

  return (
    <li>
      <span
        onClick={handleClick}
        style={{
          fontWeight: isActive ? 'bold' : 'normal',
          background: isActive ? '#e0e0e0' : 'transparent',
          cursor: 'pointer',
        }}
      >
        {[...Array(nodeLevel)].map((_, i) =>
          i > 0 ? <span key={i}>&nbsp;</span> : null
        )}
        {node.type === 'folder' ? '📁' : '📄'} {node.name}
      </span>

      {node.children && (
        <ul>
          {node.children.map(child => (
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

