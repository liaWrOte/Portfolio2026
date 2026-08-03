import React from 'react';
import TreeNode from '../../containers/treeNode';
import fileIcon from '../assets/img/icons/file_icon.svg';
import emailIcon from '../assets/img/icons/email_icon.svg';
import './sidebar-tree.scss';

const SidebarTree = ({ fileSystem, currentPath, openFolder, openProject, openWindow }) => {
  const fs = fileSystem;
  if (!fs) return null;
  return (
    <ul className="sidebar-tree">
      <TreeNode
        node={fs}
        nodeLevel={0}
        currentPath={currentPath}
        openFolder={openFolder}
        openProject={openProject}
      />
      <li style={{ marginTop: '1rem' }}>
        <span className="treenode" onClick={() => openWindow('resume')}>
          <img src={fileIcon} alt="resume" className="treenode-icons" />
          &nbsp;resume.pdf
        </span>
      </li>
      <li style={{ marginTop: '0.25rem' }}>
        <span className="treenode" onClick={() => openWindow('contact_me')}>
          <img src={emailIcon} alt="contact" className="treenode-icons" />
          &nbsp;contact.me
        </span>
      </li>
    </ul>
  );
};

export default SidebarTree;
