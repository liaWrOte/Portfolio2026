import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './desktop-top-bar.scss';

/**
 * Primary UI component for user interaction
 */
export const DesktopTopBar = ({ primary, backgroundColor, size, label, srcImg, ...props }) => {
  const locale = 'fr-FR';
  const [today, setDate] = useState(new Date());

  useEffect(() => {
      const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  const hour = today.toLocaleTimeString(locale, {hour: '2-digit', minute:'2-digit'});

  return (
    <div className="desktop-top-bar-container">
      <div className="desktop-top-bar">
        <span className="identity">Sandrine M'ZE</span>
        <span className="time">{hour}</span>
      </div>
    </div>
  );
};

DesktopTopBar.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * DesktopTopBar contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * image
   */
  srcImg: PropTypes.string

};

DesktopTopBar.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  label: 'Projets'
};
