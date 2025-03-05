import React from 'react';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import { ErrorBoundary } from '../components/atoms';
import SideMenu from '../SideMenu';
import './style.css';

function Wrap({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useImmer(true);

  return (
    <ErrorBoundary>
      <div className={`main ${isMenuOpen ? 'menu-open' : ''}`}>
        <SideMenu onToggle={(open) => setIsMenuOpen(() => open)} />
        <div className='wrap-container'>{children}</div>
      </div>
    </ErrorBoundary>
  );
}

Wrap.propTypes = {
  children: PropTypes.node,
};

export default Wrap;