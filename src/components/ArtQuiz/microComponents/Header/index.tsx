import React from 'react';
import GoBack from '../goBack';
import TitleHeader from '../TitleHeader';
import Skip from '../Skip';

const Header = () => {
  return (
    <div className="flex">
      <GoBack />
      <TitleHeader />
      <Skip />
    </div>
  );
};

export default Header;
