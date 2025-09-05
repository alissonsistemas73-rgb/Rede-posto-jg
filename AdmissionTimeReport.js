// AdmissionTimeReport.js - Componente atualizado
import React, { useState, useMemo } from 'react';
import { Download, Calendar, Building, User, Clock, ArrowLeft, FileText } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/ReportTemplate.css';

// Função para formatar CPF
const formatarCPF = (cpf) => {
  if (!cpf) return 'Não informado';
  
  // Remove caracteres não numéricos
  cpf = cpf.toString().replace(/\D/g, '');
  
  // Aplica a formatação se tiver 11 dígitos
  if (cpf.length === 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  
  // Retorna o CPF sem formatação se não tiver 11 dígitos
  return cpf;
};

const AdmissionTimeReport = () => {
  const { employees } = useEmployees();
  const [selectedCompany, setSelectedCompany] = useState('');
  const navigate = useNavigate();

  const processedData = useMemo(() => {
    const activeEmployees = employees.filter(emp => emp.status === 'ativo');
    
    const companies = {};
    
    activeEmployees.forEach(emp => {
      if (!emp.empresa) return;
      
      // Extrair CNPJ da empresa se existir no formato "Nome - CNPJ"
      let empresaKey = emp.empresa;
      const cnpjMatch = emp.empresa.match(/- (\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/);
      if (cnpjMatch) {
        empresaKey = cnpjMatch[1]; // Usar apenas o CNPJ como chave
      }
      
      if (!companies[empresaKey]) {
        companies[empresaKey] = {
          nome: emp.empresa,
          colaboradores: []
        };
      }
      
      const admissionDate = new Date(emp.dataAdmissao);
      const today = new Date();
      const timeDiff = today - admissionDate;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const years = Math.floor(daysDiff / 365);
      const months = Math.floor((daysDiff % 365) / 30);
      
      companies[empresaKey].colaboradores.push({
        ...emp,
        tempoAdmissao: daysDiff,
        tempoFormatado: `${years} anos e ${months} meses`,
        cpfFormatado: formatarCPF(emp.cpf) // Adiciona CPF formatado
      });
    });
    
    // Ordenar colaboradores por tempo de admissão (decrescente)
    Object.keys(companies).forEach(empresaKey => {
      companies[empresaKey].colaboradores.sort((a, b) => b.tempoAdmissao - a.tempoAdmissao);
    });
    
    return companies;
  }, [employees]);

  const companies = Object.keys(processedData);
  const filteredData = selectedCompany ? { [selectedCompany]: processedData[selectedCompany] } : processedData;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Relatório de Tempo de Admissão por Empresa', 14, 15);
    doc.setFontSize(12);
    doc.text(`Data do relatório: ${new Date().toLocaleDateString('pt-BR')}`, 14, 22);
    
    let yPosition = 30;
    
    Object.entries(filteredData).forEach(([empresaKey, empresaData], index) => {
      if (yPosition > 250 && index > 0) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.text(`Empresa: ${empresaData.nome}`, 14, yPosition);
      yPosition += 10;
      
      const tableData = empresaData.colaboradores.map((colab, idx) => [
        idx + 1,
        colab.nome,
        formatarCPF(colab.cpf), // CPF formatado no PDF
        colab.cargo || 'Não informado',
        new Date(colab.dataAdmissao).toLocaleDateString('pt-BR'),
        colab.tempoFormatado
      ]);
      
      doc.autoTable({
        startY: yPosition,
        head: [['#', 'Nome', 'CPF', 'Cargo', 'Data Admissão', 'Tempo de Casa']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [44, 90, 160],
          textColor: 255
        },
        styles: {
          fontSize: 8,
          cellPadding: 3
        },
        margin: { top: yPosition }
      });
      
      yPosition = doc.lastAutoTable.finalY + 15;
    });
    
    doc.save('relatorio_tempo_admissao.pdf');
  };

  return (
    <div className="report-template">
      <div className="page-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/reports')}>
            <ArrowLeft size={20} />
          </button>
          <div className="header-title">
            <Clock size={28} />
            <h1>Relatório de Tempo de Admissão</h1>
          </div>
        </div>
        <button className="btn btn-primary" onClick={generatePDF}>
          <Download size={18} />
          Gerar PDF
        </button>
      </div>

      <div className="report-controls">
        <div className="form-group">
          <label>Filtrar por Empresa:</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="">Todas as Empresas</option>
            {companies.map(empresaKey => (
              <option key={empresaKey} value={empresaKey}>
                {processedData[empresaKey].nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="report-content">
        {Object.entries(filteredData).map(([empresaKey, empresaData]) => (
          <div key={empresaKey} className="company-section">
            <div className="company-header">
              <Building size={20} />
              <h2>{empresaData.nome}</h2>
              <span className="employee-count">{empresaData.colaboradores.length} colaboradores</span>
            </div>
            
            <div className="employees-list">
              {empresaData.colaboradores.map((colab, index) => (
                <div key={colab.id} className="employee-card">
                  <div className="employee-rank">{index + 1}º</div>
                  
                  <div className="employee-info">
                    <h3>
                      <User size={16} />
                      {colab.nome}
                    </h3>
                    <div className="employee-details">
                      <div className="detail-row">
                        <span className="detail-label">CPF:</span>
                        <span className="detail-value">{formatarCPF(colab.cpf)}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Cargo:</span>
                        <span className="detail-value">{colab.cargo || 'Não informado'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Admitido em:</span>
                        <span className="detail-value">
                          {new Date(colab.dataAdmissao).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="time-badge">
                          <Clock size={14} />
                          {colab.tempoFormatado}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionTimeReport;