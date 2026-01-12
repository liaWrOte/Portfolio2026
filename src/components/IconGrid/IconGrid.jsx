import React from "react";  

const IconGrid = ({ items, openFolder, openProject, isIconGrid }) => {

  if (!items) return null;

  return (
    <div className="icon-grid">
      { isIconGrid && <div className="icon-grid-label">Icon Grid View</div> }
      {items.map(item => (
        <div
          key={item.id}
          className="icon"
          onClick={() =>
            item.type === 'folder'
              ? openFolder(item.id)
              : openProject(item.id)
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