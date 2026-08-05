import React from 'react';
import './breadcrumb.scss';
import { BreadcrumbProps, BreadcrumbItem, FileSystemItem } from './Breadcrumb.types';
import { useTranslation } from '../../contexts/LanguageContext';
import ScrambleText from '../ScrambleText/ScrambleText';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPath = [], fileSystem, openFolder }) => {
  const { t, getLocalizedContent } = useTranslation();

  const translateFolderName = (node: FileSystemItem): string => {
    // First try to use localized content from Strapi
    const localizedContent = getLocalizedContent(node, 'name');
    if (localizedContent && localizedContent !== node.name) {
      return localizedContent;
    }

    // Then try static translations
    const folderKey = `folder_${node.name.toLowerCase().replace(/\s+/g, '_')}`;
    const translated = t(folderKey);
    // If no translation exists, return the original name
    return translated !== folderKey ? translated : node.name;
  };

  const buildBreadcrumb = (): BreadcrumbItem[] => {
    const breadcrumb: BreadcrumbItem[] = [];
    let current = fileSystem;

    if (!currentPath || !fileSystem) return breadcrumb;

    currentPath.forEach((pathId: string, index: number) => {
      if (current && current.id === pathId) {
        const translatedName = translateFolderName(current);
        breadcrumb.push({
          id: pathId,
          name: translatedName,
          isLast: index === currentPath.length - 1
        });
        current = current.children?.find((child) => child.id === currentPath[index + 1]);
      }
    });

    return breadcrumb;
  };

  const breadcrumbItems = buildBreadcrumb();

  return (
    <div className="breadcrumb">
      {breadcrumbItems.map((item: BreadcrumbItem, index: number) => (
        <span key={item.id}>
          {index > 0 && ' > '}
          {item.isLast ? (
            <ScrambleText text={item.name} className="breadcrumb-current" />
          ) : (
            <button className="breadcrumb-link" onClick={() => openFolder(item.id)}>
              <ScrambleText text={item.name} />
            </button>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
