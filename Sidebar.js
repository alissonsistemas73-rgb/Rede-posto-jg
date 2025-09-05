import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, FileText, Calendar, 
  FileSignature, UserPlus, UserX, Settings, Bell,
  BarChart3, Shield, Stethoscope, FileCheck
} from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/notifications', icon: Bell, label: 'Notificações' },
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'Colaboradores' },
    { path: '/admission', icon: UserPlus, label: 'Admissão' },
    { path: '/dismissal', icon: UserX, label: 'Demissão' },
    { path: '/contracts', icon: FileSignature, label: 'Contratos' },
    { path: '/vacations', icon: Calendar, label: 'Férias' },
    { path: '/certificates', icon: FileCheck, label: 'Certificados' },
    { path: '/insurances', icon: Shield, label: 'Seguros' },
    { path: '/exams', icon: Stethoscope, label: 'Exames' },
    { path: '/reports', icon: BarChart3, label: 'Relatórios' },
    { path: '/users', icon: Settings, label: 'Usuários' },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={toggleSidebar}
      ></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>RH System</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;