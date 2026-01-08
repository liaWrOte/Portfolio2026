import React from "react";  
import IconGrid from "../IconGrid/IconGrid";
import ProjectView from "../ProjectView/ProjectView";  

const ExplorerView = ({ node, view }) => {
  if (!node) return null;

  if (view === 'explorer') {
    return <IconGrid items={node.children} />;
  }

  if (view === 'project') {
    return <ProjectView />;
  }

  return null;
}   

export default ExplorerView;