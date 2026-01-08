import React from 'react'; 

export default function TreeNode({ node, openFolder, openProject }) {

  console.log(openFolder, openProject);
  const handleClick = () => {
    if (node.type === 'folder') openFolder(node.id);
    if (node.type === 'project') openProject(node.projectId);
  };

  return (
    <li>
      <span onClick={handleClick}>
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
            />
          ))}
        </ul>
      )}
    </li>
  );
}
