import React from "react";
import { FileSystemNode } from '../../types';
import folderClosed2Icon from '../assets/img/icons/folder_closed_2_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';

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

      {items.map((item: FileSystemNode) => (
        <div
          key={item.id}
          className="item"
          onClick={() =>
            item.type === 'folder'
              ? openFolder(item.id)
              : openProject(item.id)
          }
        >
          <img 
            src={item.type === 'folder' ? folderClosed2Icon : fileIcon} 
            alt={item.type === 'folder' ? 'Folder' : 'File'}
          />
          <span>{item.name}</span>
        </div>
      ))}

    </div>

  );
}   

export default IconGrid;