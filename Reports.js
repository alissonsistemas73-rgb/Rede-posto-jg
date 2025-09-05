import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, Users, Calendar, FileText, 
  Building, Clock, DollarSign, TrendingUp 
} from 'lucide-react';
import '../styles/Reports.css';

const Reports = () => {
  const reportOptions = [
    {
      title: 'Tempo de Admissão',
      description: 'Relatório de colaboradores com mais tempo de empresa',
      icon: Clock,
      path: '/reports/admission-time',
      color: '#2c5aa0'
    },
    {
      title: 'Colaboradores por Empresa',
      description: 'Distribuição de colaboradores por empresa',
      icon: Building,
      path: '/reports/employees-by-company',
      color: '#28a745'
    },
    {
      title: 'Folha de Pagamento',
      description: 'Relatório completo da folha de pagamento',
      icon: DollarSign,
      path: '/reports/payroll',
      color: '#ffc107'
    },
    {
      title: 'Férias Programadas',
      description: 'Relatório de férias agendadas e pendentes',
      icon: Calendar,
      path: '/reports/vacations',
      color: '#dc3545'
    },
    {
      title: 'Contratos por Status',
      description: 'Relatório de contratos ativos, alertas e vencidos',
      icon: FileText,
      path: '/reports/contracts-status',
      color: '#6f42c1'
    },
    {
      title: 'Cargos e Salários',
      description: 'Análise de cargos e faixas salariais',
      icon: TrendingUp,
      path: '/reports/positions-salary',
      color: '#20c997'
    },
    {
      title: 'Turnover',
      description: 'Taxa de rotatividade de colaboradores',
      icon: Users,
      path: '/reports/turnover',
      color: '#fd7e14'
    },
    {
      title: 'Demissões',
      description: 'Relatório de desligamentos por período',
      icon: Users,
      path: '/reports/dismissals',
      color: '#e83e8c'
    }
  ];

  return (
    <div className="reports">
      <div className="page-header">
        <div className="header-title">
          <BarChart3 size={28} />
          <h1>Relatórios</h1>
        </div>
        <p>Selecione o tipo de relatório que deseja gerar</p>
      </div>

      <div className="reports-grid">
        {reportOptions.map((report, index) => {
          const Icon = report.icon;
          return (
            <Link key={index} to={report.path} className="report-card">
              <div className="report-icon" style={{ backgroundColor: report.color + '20', color: report.color }}>
                <Icon size={24} />
              </div>
              <div className="report-content">
                <h3>{report.title}</h3>
                <p>{report.description}</p>
              </div>
              <div className="report-arrow">
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Reports;