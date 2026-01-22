import React from 'react'; 

export default function TreeNode({
  node,
  openFolder,
  openProject,
  nodeLevel = 0,
  currentPath,
}) {

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
          cursor: 'pointer',
        }}
      >
        {[...Array(nodeLevel)].map((_, i) =>
          i > 0 ? <span key={i}>&nbsp;</span> : null
        )}
        {node.type === 'folder' ? '📁' : '📄'} {node.name}
      </span>

      {/* Recursive TreeNode children */}
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

