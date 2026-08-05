import React from 'react';
import { FileSystemNode } from '../../types';
import './icon-grid.scss';
import folderClosed2Icon from '../assets/img/icons/folder_closed_2_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';
import { backendUrl } from '../../middlewares/env';
interface IconGridProps {
  items: FileSystemNode[];
  openFolder: (id: string) => void;
  openProject: (id: string) => void;
}
const IconGrid: React.FC<IconGridProps> = ({ items, openFolder, openProject }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="icon-grid">
      {items.map((item: FileSystemNode) => (
        <div
          key={item.id}
          className="item"
          onClick={() => (item.type === 'folder' ? openFolder(item.id) : openProject(item.id))}
        >
          {item.type === 'folder' || !item.logo?.data?.attributes?.url ? (
            <img
              src={item.type === 'folder' ? folderClosed2Icon : fileIcon}
              alt={item.type === 'folder' ? 'Folder' : 'File'}
            />
          ) : (
            <img
              src={`${backendUrl}${item.logo.data.attributes.url}`}
              alt={item.logo.data.attributes.alternativeText || item.name}
              className="project-logo"
            />
          )}
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};
export default IconGrid;
