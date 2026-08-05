import React from 'react';
import './breadcrumb.scss';
import { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';
import { useTranslation } from '../../contexts/LanguageContext';
import ScrambleText from '../ScrambleText/ScrambleText';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentPath = [], fileSystem, openFolder }) => {
  const { t, getLocalizedContent } = useTranslation();

  const translateFolderName = (node: any): string => {
    // D'abord essayer d'utiliser le contenu localisé depuis Strapi
    const localizedContent = getLocalizedContent(node, 'name');
    if (localizedContent && localizedContent !== node.name) {
      return localizedContent;
    }

    // Ensuite essayer les traductions statiques
    const folderKey = `folder_${node.name.toLowerCase().replace(/\s+/g, '_')}`;
    const translated = t(folderKey);
    // Si la traduction n'existe pas, retourner le nom original
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
        current = current.children?.find((child: any) => child.id === currentPath[index + 1]);
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
