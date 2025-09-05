import React, { useState } from 'react';
import { Plus, Calendar, Clock, Download, Edit, Trash2, Bell } from 'lucide-react';
import '../styles/Certificates.css';

const Certificates = () => {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      nome: 'Certificado Digital',
      dataVencimento: '2024-12-31',
      tipo: 'A1',
      descricao: 'Certificado digital da empresa principal'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    dataEmissao: '',
    tipo: 'A1',
    descricao: ''
  });

  const calcularVencimento = (tipo, dataEmissao) => {
    const data = new Date(dataEmissao);
    if (tipo === 'A1') {
      data.setFullYear(data.getFullYear() + 1);
    } else if (tipo === 'A3') {
      data.setFullYear(data.getFullYear() + 3);
    }
    return data.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataVencimento = calcularVencimento(formData.tipo, formData.dataEmissao);
    
    const newCertificate = {
      id: Date.now(),
      ...formData,
      dataVencimento,
      notificacao: true
    };

    setCertificates(prev => [...prev, newCertificate]);
    setShowForm(false);
    setFormData({ nome: '', dataEmissao: '', tipo: 'A1', descricao: '' });
  };

  const checkVencimentoProximo = (dataVencimento) => {
    const umMes = 30 * 24 * 60 * 60 * 1000;
    const dataVenc = new Date(dataVencimento);
    const hoje = new Date();
    return (dataVenc - hoje) <= umMes;
  };

  return (
    <div className="certificates">
      <div className="page-header">
        <h1>Gestão de Certificados</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Novo Certificado
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Adicionar Certificado</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Certificado *</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Emissão *</label>
                  <input
                    type="date"
                    value={formData.dataEmissao}
                    onChange={(e) => setFormData({...formData, dataEmissao: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Tipo *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                    required
                  >
                    <option value="A1">A1 - 1 ano</option>
                    <option value="A3">A3 - 3 anos</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    rows="3"
                  />
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

      <div className="certificates-grid">
        {certificates.map(cert => (
          <div key={cert.id} className="certificate-card">
            <div className="certificate-header">
              <h3>{cert.nome}</h3>
              <div className="certificate-actions">
                <button className="btn-icon" title="Editar">
                  <Edit size={16} />
                </button>
                <button className="btn-icon btn-danger" title="Excluir">
                  <Trash2 size={16} />
                </button>
                {checkVencimentoProximo(cert.dataVencimento) && (
                  <span className="notification-badge">
                    <Bell size={14} />
                    Vencimento próximo
                  </span>
                )}
              </div>
            </div>

            <div className="certificate-details">
              <div className="detail">
                <span>Tipo:</span>
                <span className={`badge ${cert.tipo}`}>
                  {cert.tipo} - {cert.tipo === 'A1' ? '1 ano' : '3 anos'}
                </span>
              </div>
              <div className="detail">
                <span>Emissão:</span>
                <span>{new Date(cert.dataEmissao).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="detail">
                <span>Vencimento:</span>
                <span className={checkVencimentoProximo(cert.dataVencimento) ? 'warning' : ''}>
                  {new Date(cert.dataVencimento).toLocaleDateString('pt-BR')}
                </span>
              </div>
              {cert.descricao && (
                <div className="detail">
                  <span>Descrição:</span>
                  <span>{cert.descricao}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;