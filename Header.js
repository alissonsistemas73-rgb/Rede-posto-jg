import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css';

const Header = ({ user, toggleSidebar }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1>RH System</h1>
      </div>
      
      <div className="header-right">
        <button className="icon-button">
          <Bell size={20} />
        </button>
        
        <div className="user-menu">
          <div className="user-info">
            <User size={18} />
            <span>{user?.name}</span>
            <span className="user-role">({user?.role})</span>
          </div>
          
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

// VERIFIQUE SE ESTÁ EXPORTANDO CORRETAMENTE COMO DEFAULT
export default Header;