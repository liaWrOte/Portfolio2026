import React from 'react';
import PropTypes from 'prop-types';

import './stolify-svg.scss';

const StolifySvg = () => {

  return (
    <svg
      id="stolify-svg"
      data-name="Calque 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 247 190.77"
    >
      <g id="Calque_1-2" data-name="Calque 1">
        <rect className="cls-6" x="27.64" y="13.35" width="215.36" height="166.07"/>
        <g id="disk">
          <circle className="cls-7" cx="95.39" cy="95.39" r="95.39"/>
          <circle className="cls-2" cx="95.39" cy="95.39" r="26.38"/>
          <circle className="cls-1" cx="95.39" cy="95.39" r="4.43"/>
        </g>
        <g id="reader">
          <polyline className="cls-4" points="216.31 38.58 175.69 124.72 147.31 143.06"/>
          <line className="cls-5" x1="127.79" y1="152.62" x2="138.53" y2="147.36"/>
          <line className="cls-3" x1="138.53" y1="147.31" x2="149.28" y2="142.06"/>
        </g>
      </g>
    </svg>
  );
};

StolifySvg.propTypes = {
  /**
   * Show items StolifySvg of firt level
   */
  displayStolifySvg: PropTypes.bool.isRequired,
  /**
   * Show items StolifySvg of second level
   */
  displayStolifySvgItem: PropTypes.bool,

};

StolifySvg.defaultProps = {
  displayStolifySvg: false,
  displayStolifyItem: false,
};

export default StolifySvg;
