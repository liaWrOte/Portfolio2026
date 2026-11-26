import React from 'react';
import { FileSystemNode } from '../../types';
import './icon-grid.scss';
import folderClosed2Icon from '../assets/img/icons/folder_closed_2_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';
import { mediaUrl } from '../../middlewares/env';
interface IconGridProps {
  items: FileSystemNode[];
  openFolder: (id: string) => void;
  openProject: (id: string) => void;
}
const IconGrid: React.FC<IconGridProps> = ({ items, openFolder, openProject }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="icon-grid">
      {items.map((item: FileSystemNode) => {
        const handleActivate = () =>
          item.type === 'folder' ? openFolder(item.id) : openProject(item.id);
        return (
          <div
            key={item.id}
            className="item"
            role="button"
            tabIndex={0}
            aria-label={item.name}
            onClick={handleActivate}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleActivate(); }
            }}
          >
            {item.type === 'folder' || !item.logo?.data?.attributes?.url ? (
              <img
                src={item.type === 'folder' ? folderClosed2Icon : fileIcon}
                alt=""
                aria-hidden="true"
              />
            ) : (
              <img
                src={mediaUrl(item.logo.data.attributes.url) || ''}
                alt=""
                aria-hidden="true"
                className="project-logo"
              />
            )}
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};
export default IconGrid;
