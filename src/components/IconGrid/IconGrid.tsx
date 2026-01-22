import React from "react";
import { FileSystemNode } from '../../types';

interface IconGridProps {
  items: FileSystemNode[];
  openFolder: (id: string) => void;
  openProject: (id: string) => void;
  isIconGrid?: boolean;
}

const IconGrid: React.FC<IconGridProps> = ({
  items,
  openFolder,
  openProject,
  isIconGrid
}) => {

  if (!items || items.length === 0) return null;

  return (

    <div className="icon-grid">

      { isIconGrid && <div className="icon-grid-label">Icon Grid View</div> }

      {items.map((item: FileSystemNode) => (
        <div
          key={item.id}
          className="icon"
          onClick={() =>
            item.type === 'folder'
              ? openFolder(item.id)
              : openProject(item.id)
          }
        >
          <span>{item.type === 'folder' ? '📁' : '📄'}</span>
          <span>{item.name}</span>
        </div>
      ))}

    </div>

  );
}   

export default IconGrid;