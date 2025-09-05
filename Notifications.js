import React, { useState, useEffect } from 'react';
import { Bell, Clock, AlertCircle, CheckCircle, FileText, UserCheck } from 'lucide-react';
import '../styles/Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Dados de exemplo para notificações
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'contract',
        title: 'Contrato próximo do vencimento',
        message: 'Contrato da Empresa ABC vence em 5 dias',
        time: '2 horas atrás',
        read: false,
        icon: FileText,
        color: '#ffc107'
      },
      {
        id: 2,
        type: 'admission',
        title: 'Novo colaborador admitido',
        message: 'João Silva foi admitido hoje',
        time: '5 horas atrás',
        read: false,
        icon: UserCheck,
        color: '#28a745'
      },
      {
        id: 3,
        type: 'warning',
        title: 'Documento pendente',
        message: 'Faltam documentos do colaborador Maria Santos',
        time: '1 dia atrás',
        read: true,
        icon: AlertCircle,
        color: '#dc3545'
      },
      {
        id: 4,
        type: 'reminder',
        title: 'Lembrete de férias',
        message: 'Pedro Oliveira tem férias programadas para próxima semana',
        time: '2 dias atrás',
        read: true,
        icon: Clock,
        color: '#2c5aa0'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications">
      <div className="page-header">
        <div className="header-title">
          <Bell size={28} />
          <h1>Notificações</h1>
          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary" onClick={markAllAsRead}>
            Marcar todas como lidas
          </button>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <Bell size={48} />
            <h3>Nenhuma notificação</h3>
            <p>Você não tem notificações no momento.</p>
          </div>
        ) : (
          notifications.map(notification => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="notification-icon" style={{ color: notification.color }}>
                  <Icon size={20} />
                </div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                {!notification.read && (
                  <div className="unread-dot"></div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;