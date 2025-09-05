import React, { useState } from 'react';
import { Plus, Calendar, Building, FileText, Upload, Bell, Edit, Trash2 } from 'lucide-react';
import '../styles/Insurances.css';

const Insurances = () => {
  const [insurances, setInsurances] = useState([
    {
      id: 1,
      tipo: 'vida',
      empresa: 'POSTO 2 DE JULHO',
      seguradora: 'Porto Seguro',
      inicio: '2024-01-01',
      fim: '2024-12-31',
      apolice: null
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo: 'vida',
    empresa: '',
    seguradora: '',
    inicio: '',
    fim: '',
    apolice: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInsurance = {
      id: Date.now(),
      ...formData
    };

    setInsurances(prev => [...prev, newInsurance]);
    setShowForm(false);
    setFormData({ tipo: 'vida', empresa: '', seguradora: '', inicio: '', fim: '', apolice: null });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, apolice: file }));
    }
  };

  const checkVencimentoProximo = (dataFim) => {
    const umMes = 30 * 24 * 60 * 60 * 1000;
    const dataFimDate = new Date(dataFim);
    const hoje = new Date();
    return (dataFimDate - hoje) <= umMes;
  };

  return (
    <div className="insurances">
      <div className="page-header">
        <h1>Gestão de Seguros</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Novo Seguro
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar Seguro</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Seguro *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                    required
                  >
                    <option value="vida">Seguro de Vida</option>
                    <option value="empresarial">Seguro Empresarial</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nome da Empresa *</label>
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Seguradora *</label>
                  <input
                    type="text"
                    value={formData.seguradora}
                    onChange={(e) => setFormData({...formData, seguradora: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Início da Vigência *</label>
                  <input
                    type="date"
                    value={formData.inicio}
                    onChange={(e) => setFormData({...formData, inicio: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Fim da Vigência *</label>
                  <input
                    type="date"
                    value={formData.fim}
                    onChange={(e) => setFormData({...formData, fim: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Apólice do Seguro</label>
                  <div className="file-upload">
                    <input type="file" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
                    <Upload size={18} />
                    <span>{formData.apolice ? formData.apolice.name : 'Selecionar arquivo'}</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="insurances-grid">
        {insurances.map(insurance => (
          <div key={insurance.id} className="insurance-card">
            <div className="insurance-header">
              <h3>
                {insurance.tipo === 'vida' ? 'Seguro de Vida' : 'Seguro Empresarial'} - {insurance.empresa}
              </h3>
              <div className="insurance-actions">
                <button className="btn-icon" title="Editar">
                  <Edit size={16} />
                </button>
                <button className="btn-icon btn-danger" title="Excluir">
                  <Trash2 size={16} />
                </button>
                {checkVencimentoProximo(insurance.fim) && (
                  <span className="notification-badge">
                    <Bell size={14} />
                    Vencimento próximo
                  </span>
                )}
              </div>
            </div>

            <div className="insurance-details">
              <div className="detail">
                <span>Seguradora:</span>
                <span>{insurance.seguradora}</span>
              </div>
              <div className="detail">
                <span>Período:</span>
                <span>
                  {new Date(insurance.inicio).toLocaleDateString('pt-BR')} a {' '}
                  {new Date(insurance.fim).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="detail">
                <span>Status:</span>
                <span className={checkVencimentoProximo(insurance.fim) ? 'warning' : 'success'}>
                  {checkVencimentoProximo(insurance.fim) ? 'Vencimento próximo' : 'Vigente'}
                </span>
              </div>
              {insurance.apolice && (
                <div className="detail">
                  <span>Apólice:</span>
                  <span className="file-link">
                    <FileText size={14} />
                    {insurance.apolice.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insurances;