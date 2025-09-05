// EmployeesByCompanyReport.js - Verifique a importação do CSS
import React, { useMemo } from 'react';
import { Download, Building, Users, ArrowLeft, PieChart } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/ReportTemplate.css'; // Certifique-se que está assim

const EmployeesByCompanyReport = () => {
  const { employees } = useEmployees();
  const navigate = useNavigate();

  const companyData = useMemo(() => {
    const activeEmployees = employees.filter(emp => emp.status === 'ativo');
    const companies = {};
    
    activeEmployees.forEach(emp => {
      if (!companies[emp.empresa]) {
        companies[emp.empresa] = 0;
      }
      companies[emp.empresa]++;
    });
    
    return Object.entries(companies)
      .sort((a, b) => b[1] - a[1])
      .map(([empresa, quantidade]) => ({ empresa, quantidade }));
  }, [employees]);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Relatório de Colaboradores por Empresa', 14, 15);
    doc.setFontSize(12);
    doc.text(`Data do relatório: ${new Date().toLocaleDateString('pt-BR')}`, 14, 22);
    doc.text(`Total de colaboradores: ${companyData.reduce((acc, curr) => acc + curr.quantidade, 0)}`, 14, 29);
    
    const tableData = companyData.map((item, index) => [
      index + 1,
      item.empresa,
      item.quantidade,
      `${((item.quantidade / companyData.reduce((acc, curr) => acc + curr.quantidade, 0)) * 100).toFixed(1)}%`
    ]);
    
    doc.autoTable({
      startY: 40,
      head: [['#', 'Empresa', 'Quantidade', 'Percentual']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [44, 90, 160],
        textColor: 255
      }
    });
    
    doc.save('relatorio_empresas.pdf');
  };

  return (
    <div className="report-template">
      <div className="page-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/reports')}>
            <ArrowLeft size={20} />
          </button>
          <div className="header-title">
            <Building size={28} />
            <h1>Colaboradores por Empresa</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={generatePDF}>
          <Download size={18} />
          Gerar PDF
        </button>
      </div>

      <div className="report-content">
        <div className="stats-summary">
          <div className="stat-card">
            <PieChart size={24} />
            <h3>Total de Empresas</h3>
            <span className="stat-value">{companyData.length}</span>
          </div>
          <div className="stat-card">
            <Users size={24} />
            <h3>Total de Colaboradores</h3>
            <span className="stat-value">
              {companyData.reduce((acc, curr) => acc + curr.quantidade, 0)}
            </span>
          </div>
        </div>

        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Empresa</th>
                <th>Quantidade</th>
                <th>Percentual</th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((item, index) => (
                <tr key={item.empresa}>
                  <td>{index + 1}</td>
                  <td>{item.empresa}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    {((item.quantidade / companyData.reduce((acc, curr) => acc + curr.quantidade, 0)) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesByCompanyReport;