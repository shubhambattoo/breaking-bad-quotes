import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <nav>
        <a href="/" className="brand">
          <img src={require('./../assets/logo.png')} alt="walter white" />

          <h1>
            <span>B</span>reaking <span>B</span>ad Quotes
          </h1>
        </a>
      </nav>
    </header>
  );
};

export default Header;
