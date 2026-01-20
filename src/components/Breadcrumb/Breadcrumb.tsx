import React from 'react';
import './breadcrumb.scss';
import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';

// Breadcrumb component for navigation
const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPath, fileSystem, openFolder }) => {
  const buildBreadcrumb = (): BreadcrumbItem[] => {
    const breadcrumb: BreadcrumbItem[] = [];
    let current = fileSystem;
    
    currentPath.forEach((pathId: string, index: number) => {
      if (current && current.id === pathId) {
        breadcrumb.push({
          id: pathId,
          name: current.name,
          isLast: index === currentPath.length - 1
        });
        current = current.children?.find((child: any) => 
          child.id === currentPath[index + 1]
        );
      }
    });
    
    return breadcrumb;
  };

  const breadcrumbItems = buildBreadcrumb();

  return (
    <div className="breadcrumb">
      {breadcrumbItems.map((item: BreadcrumbItem, index: number) => (
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
