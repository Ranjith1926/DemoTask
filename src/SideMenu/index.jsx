import React from 'react';
import { useImmer } from 'use-immer';
import { LogOut, User, LayoutDashboard, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE, BASE_ROUTE, PROFILE_ROUTE } from '../_main/routeConstants';
import './style.css';

function SideMenu({ onToggle }) {
  const navigate = useNavigate();
  const [menuState, updateMenuState] = useImmer({ isOpen: false });

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate(BASE_ROUTE);
  };

  const toggleMenu = () => {
    updateMenuState(draft => { draft.isOpen = !draft.isOpen; });
    onToggle(!menuState.isOpen);
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      <div className={`side-menu ${menuState.isOpen ? 'open' : 'closed'}`}>
        <ul>
          <li onClick={() => navigate(DASHBOARD_ROUTE)}>
            <LayoutDashboard size={20} /> {menuState.isOpen && <span>Dashboard</span>}
          </li>
          <li onClick={() => navigate(PROFILE_ROUTE)}>
            <User size={20} /> {menuState.isOpen && <span>Profile</span>}
          </li>
          <li onClick={handleLogout} className="logout">
            <LogOut size={20} /> {menuState.isOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideMenu;
