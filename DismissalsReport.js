import React from 'react';
import { Download, UserX, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReportTemplate.css';

const DismissalsReport = () => {
  const navigate = useNavigate();

  const generatePDF = () => {
    alert('Funcionalidade de geração de PDF de demissões será implementada em breve!');
  };

  return (
    <div className="report-template">
      <div className="page-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/reports')}>
            <ArrowLeft size={20} />
          </button>
          <div className="header-title">
            <UserX size={28} />
            <h1>Relatório de Demissões</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={generatePDF}>
          <Download size={18} />
          Gerar PDF
        </button>
      </div>

      <div className="report-content">
        <div className="empty-state">
          <UserX size={48} />
          <h3>Relatório em Desenvolvimento</h3>
          <p>O relatório de demissões está sendo implementado.</p>
        </div>
      </div>
    </div>
  );
};

export default DismissalsReport;