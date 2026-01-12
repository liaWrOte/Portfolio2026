import React from "react";  
import IconGrid from "../../containers/iconGrid";
import ProjectView from "../ProjectView/ProjectView";  

const ExplorerView = ({ node, view }) => {
  console.log('EXPLORER_VIEW', view, node);
  if (!node) return null;

  if (view === 'explorer') {
    return <IconGrid items={node.children} />;
  }

  if (view === 'project') {
    return <ProjectView node={node} />;
  }

  return null;
}   

export default ExplorerView;