import React from 'react';
import { Users, FileText, Calendar, AlertCircle, Clock, AlertTriangle } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { employees } = useEmployees();

  // Calcular estatísticas baseadas nos dados reais
  const activeEmployees = employees.filter(emp => emp.status === 'ativo').length;
  
  // Dados de exemplo para demonstração (em produção viriam de APIs)
  const stats = [
    { 
      title: 'Colaboradores Ativos', 
      value: activeEmployees, 
      icon: Users, 
      color: '#2c5aa0' 
    },
    { 
      title: 'Contratos Ativos', 
      value: 0,  // Zerado até implementar gestão de contratos
      icon: FileText, 
      color: '#28a745' 
    },
    { 
      title: 'Férias Programadas', 
      value: 0,  // Zerado até implementar gestão de férias
      icon: Calendar, 
      color: '#ffc107' 
    },
    { 
      title: 'Alertas Pendentes', 
      value: 0,  // Zerado inicialmente
      icon: AlertCircle, 
      color: '#dc3545' 
    }
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Visão geral do sistema de recursos humanos</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-content">
        <div className="card">
          <h2>
            <AlertTriangle size={20} style={{ marginRight: '10px', color: '#ffc107' }} />
            Próximos Vencimentos de Contrato
          </h2>
          <div className="contracts-list">
            {activeEmployees > 0 ? (
              <>
                <div className="contract-item">
                  <span>Contrato de Locação - Empresa ABC</span>
                  <span className="warning">Vence em 5 dias</span>
                </div>
                <div className="contract-item">
                  <span>Contrato de Serviços - Empresa XYZ</span>
                  <span className="warning">Vence em 12 dias</span>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>Nenhum contrato cadastrado</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <h2>
            <Users size={20} style={{ marginRight: '10px', color: '#2c5aa0' }} />
            Funcionários por Departamento
          </h2>
          <div className="department-stats">
            {activeEmployees > 0 ? (
              <>
                <div className="department-item">
                  <span>Operacional</span>
                  <span>{Math.floor(activeEmployees * 0.6)}</span>
                </div>
                <div className="department-item">
                  <span>Administrativo</span>
                  <span>{Math.floor(activeEmployees * 0.3)}</span>
                </div>
                <div className="department-item">
                  <span>Gerencial</span>
                  <span>{Math.floor(activeEmployees * 0.1)}</span>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>Nenhum colaborador cadastrado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;