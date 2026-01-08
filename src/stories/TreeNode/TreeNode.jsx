import React from 'react'; 

export default function TreeNode({ node, openFolder, openProject, nodeLevel }) {

  console.log(openFolder, openProject);
  const handleClick = () => {
    if (node.type === 'folder') openFolder(node.id);
    if (node.type === 'project') openProject(node.projectId);
  };

  nodeLevel++;

  return (
    <li>
      <span onClick={handleClick}>
        {[...Array(nodeLevel)].map((_, i) => (
          i > 0 ? <span key={i}>&nbsp;</span> : null
        ))}
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
              nodeLevel={nodeLevel}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
