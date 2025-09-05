import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={closeSidebar} />
      <div className="main-content">
        <Header 
          user={user} 
          toggleSidebar={toggleSidebar}
        />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;