import React, { useState } from 'react';
import { Upload, FileText, User, Calendar, Save } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeDismissal.css';

const EmployeeDismissal = () => {
  const [formData, setFormData] = useState({
    dataDemissao: '',
    colaboradorId: '',
    motivo: '',
    documentos: null
  });

  const { employees, updateEmployeeStatus } = useEmployees();
  const navigate = useNavigate();

  // Filtra apenas colaboradores ativos
  const colaboradoresAtivos = employees.filter(emp => emp.status === 'ativo');

  const motivos = [
    'Pedido de demissão',
    'Dispensa sem justa causa',
    'Dispensa com justa causa',
    'Término de contrato',
    'Aposentadoria',
    'Falecimento'
  ];

  // Função para formatar CPF
  const formatarCPF = (cpf) => {
    if (!cpf) return 'Não informado';
    cpf = cpf.toString().replace(/\D/g, '');
    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  };

  // Função para extrair apenas o nome da empresa (sem CNPJ)
  const getNomeEmpresa = (empresa) => {
    if (!empresa) return 'Não informada';
    
    // Remove o CNPJ se existir (tudo após o último hífen)
    const nomeSemCNPJ = empresa.split(' - ')[0];
    return nomeSemCNPJ || empresa;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, documentos: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const colaboradorId = parseInt(formData.colaboradorId);
    const colaborador = employees.find(emp => emp.id === colaboradorId);
    
    if (!colaborador) {
      alert('Colaborador não encontrado!');
      return;
    }

    // Atualiza o status do colaborador para inativo
    updateEmployeeStatus(colaboradorId, 'inativo');

    console.log('Demissão processada:', {
      colaborador: colaborador.nome,
      dataDemissao: formData.dataDemissao,
      motivo: formData.motivo
    });
    
    alert(`Colaborador ${colaborador.nome} demitido com sucesso!`);
    
    // Limpa o formulário e redireciona
    setFormData({
      dataDemissao: '',
      colaboradorId: '',
      motivo: '',
      documentos: null
    });
    
    navigate('/employees');
  };

  const handleCancel = () => {
    if (window.confirm('Deseja cancelar o processo de demissão?')) {
      navigate('/employees');
    }
  };

  return (
    <div className="employee-dismissal">
      <div className="page-header">
        <h1>Demissão de Colaborador</h1>
      </div>

      <form onSubmit={handleSubmit} className="dismissal-form">
        <div className="form-section">
          <h2>
            <User size={20} />
            Dados da Demissão
          </h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>Data de Demissão *</label>
              <input
                type="date"
                name="dataDemissao"
                value={formData.dataDemissao}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Colaborador *</label>
              <select
                name="colaboradorId"
                value={formData.colaboradorId}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione o colaborador</option>
                {colaboradoresAtivos.map(col => (
                  <option key={col.id} value={col.id}>
                    {col.nome} - CPF: {formatarCPF(col.cpf)} - Empresa: {getNomeEmpresa(col.empresa)}
                  </option>
                ))}
              </select>
              {colaboradoresAtivos.length === 0 && (
                <span className="info-message">
                  Nenhum colaborador ativo encontrado.
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Motivo *</label>
              <select
                name="motivo"
                value={formData.motivo}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione o motivo</option>
                {motivos.map(motivo => (
                  <option key={motivo} value={motivo}>{motivo}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Documentos da Demissão</label>
              <div className="file-upload">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Upload size={18} />
                <span>{formData.documentos ? formData.documentos.name : 'Selecionar arquivos'}</span>
              </div>
              <small>Documentos necessários: Termo de rescisão, quitadas, etc.</small>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={colaboradoresAtivos.length === 0}
          >
            <Save size={18} />
            Confirmar Demissão
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeDismissal;