import React from "react";  

const ProjectView = ({ node }) => {
  
  if (!node) return null;

  return node.name;

}   

export default ProjectView;