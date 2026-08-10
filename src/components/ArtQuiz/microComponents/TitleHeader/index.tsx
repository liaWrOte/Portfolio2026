import React from 'react';
import { useTranslation } from '../../../../contexts/LanguageContext';
const TitleHeader = () => {
  const { t } = useTranslation();
  return <h2 className="main-font-display">{t('quiz_level')}</h2>;
};
export default TitleHeader;
