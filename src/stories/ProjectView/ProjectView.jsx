import React from "react";  
import IconGrid from "../IconGrid/IconGrid";
import ProjectView from "./ProjectView";  

const ExplorerView = ({ node }) => {
  if (!node) return null;

  if (node.type === 'folder') {
    return <IconGrid items={node.children} />;
  }

  if (node.type === 'project') {
    return <ProjectView project={node} />;
  }

  return null;
}   

export default ExplorerView;