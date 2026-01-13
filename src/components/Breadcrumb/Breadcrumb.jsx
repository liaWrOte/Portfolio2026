import React from 'react';
import './breadcrumb.scss';

// Breadcrumb component for navigation
const Breadcrumb = ({ currentPath, fileSystem, openFolder }) => {
  const buildBreadcrumb = () => {
    const breadcrumb = [];
    let current = fileSystem;
    
    currentPath.forEach((pathId, index) => {
      if (current && current.id === pathId) {
        breadcrumb.push({
          id: pathId,
          name: current.name,
          isLast: index === currentPath.length - 1
        });
        current = current.children?.find(child => 
          child.id === currentPath[index + 1]
        );
      }
    });
    
    return breadcrumb;
  };

  const breadcrumbItems = buildBreadcrumb();

  return (
    <div className="breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <span key={item.id}>
          {index > 0 && ' > '}
          {item.isLast ? (
            <span className="breadcrumb-current">{item.name}</span>
          ) : (
            <button 
              className="breadcrumb-link"
              onClick={() => openFolder(item.id)}
            >
              {item.name}
            </button>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
