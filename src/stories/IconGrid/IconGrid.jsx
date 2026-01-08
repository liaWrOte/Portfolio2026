import React from "react";  

const IconGrid = ({ items, openFolder, openProject }) => {

  console.log(items);
  if (!items) return null;

  return (
    <div className="icon-grid">
      {items.map(item => (
        <div
          key={item.id}
          className="icon"
          onDoubleClick={() =>
            item.type === 'folder'
              ? openFolder(item.id)
              : openProject(item.projectId)
          }
        >
          <div>{item.type === 'folder' ? '📁' : '📄'}</div>
          <div>{item.name}</div>
        </div>
      ))}
    </div>
  );
}   

export default IconGrid;