import React from 'react';
import IconGrid from '../../containers/iconGrid';
const ExplorerView = ({ node }) => {
  if (!node) return null;
  return <IconGrid items={node.children} />;
};
export default ExplorerView;
