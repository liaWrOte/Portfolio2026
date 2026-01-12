import React from "react";  
import IconGrid from "../../containers/iconGrid";
import ProjectView from "../ProjectView/ProjectView";  

const ExplorerView = ({ node, view }) => {
  console.log('EXPLORER_VIEW', view, node);
  if (!node) return null;

  return <IconGrid items={node.children} />;

}   

export default ExplorerView;