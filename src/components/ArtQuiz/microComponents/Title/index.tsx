import React from 'react';
import { useTranslation } from '../../../../contexts/LanguageContext';
import './index.scss';
const Title = () => {
  const { t } = useTranslation();
  return (
    <div className="title-home">
      <p className="big-text">{t('quiz_hi')}</p>
    </div>
  );
};
export default Title;
