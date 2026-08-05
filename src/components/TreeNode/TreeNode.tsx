import React from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import ScrambleText from '../ScrambleText/ScrambleText';

// styles
import './treenode.scss';

import folderClosedIcon2 from '../assets/img/icons/folder_closed_2_icon.svg';
import folderOpenIcon from '../assets/img/icons/folder_open_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';

export default function TreeNode({ node, openFolder, openProject, nodeLevel = 0, currentPath }) {
  const { t } = useTranslation();

  const isActive = currentPath.includes(node.id);

  const handleClick = () => {
    if (node.type === 'folder') openFolder(node.id);
    if (node.type === 'project') openProject(node.id);
  };

  const getDisplayName = () => {
    if (node.type === 'folder') {
      const key = `folder_${node.name.toLowerCase().replace(/\s+/g, '_')}`;
      const translated = t(key);
      return translated !== key ? translated : node.name;
    }
    return node.name;
  };

  return (
    <li style={{ marginTop: nodeLevel === 0 ? '1rem' : 0 }}>
      <span
        onClick={handleClick}
        className={`treenode${isActive ? ' treenode--active' : ''}`}
      >
        {node.type === 'folder' ? (
          isActive ? (
            <img src={folderOpenIcon} alt="Logo" className="treenode-icons" />
          ) : (
            <img src={folderClosedIcon2} alt="Logo" className="treenode-icons" />
          )
        ) : (
          <img src={fileIcon} alt="Logo" className="treenode-icons" />
        )}
        &nbsp;<ScrambleText text={getDisplayName()} />
      </span>

      {node.children && (
        <ul>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              openFolder={openFolder}
              openProject={openProject}
              nodeLevel={nodeLevel + 1}
              currentPath={currentPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
