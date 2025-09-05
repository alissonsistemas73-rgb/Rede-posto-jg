// ContractForm.js
import React, { useState } from 'react';
import { Save, X, Upload } from 'lucide-react';
import '../styles/ContractForm.css';

const ContractForm = ({ onClose, editData }) => {
  const [formData, setFormData] = useState({
    tipo: editData?.tipo || '',
    empresa: editData?.empresa || '',
    locatario: editData?.locatario || '',
    inicio: editData?.inicio || '',
    vencimento: editData?.vencimento || '',
    valor: editData?.valor || '',
    documento: null
  });

  const tiposContrato = [
    'Locação',
    'Serviços',
    'Prestação de Serviços',
    'Trabalho',
    'Confidencialidade'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, documento: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do contrato:', formData);
    alert('Contrato criado com sucesso!');
    onClose();
  };

  return (
    <div className="contract-form-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editData ? 'Editar Contrato' : 'Novo Contrato'}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo de Contrato *</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione o tipo</option>
                {tiposContrato.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Empresa *</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                required
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Locatário/Contratado *</label>
              <input
                type="text"
                name="locatario"
                value={formData.locatario}
                onChange={handleInputChange}
                required
                placeholder="Nome do locatário/contratado"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data de Início *</label>
              <input
                type="date"
                name="inicio"
                value={formData.inicio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Data de Vencimento *</label>
              <input
                type="date"
                name="vencimento"
                value={formData.vencimento}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Valor do Contrato (R$)</label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Documento do Contrato</label>
              <div className="file-upload">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx"
                />
                <Upload size={18} />
                <span>{formData.documento ? formData.documento.name : 'Selecionar arquivo'}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={18} />
              Salvar Contrato
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractForm;