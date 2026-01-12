import React from "react";  

const ProjectView = ({ node }) => {
  console.log('PROJECT VIEW NODE', node);
  if (!node) return null;

  return node.name;

}   

export default ProjectView;