import React, { useState } from 'react';
import { Plus, Calendar, User, FileText, Upload, Bell, Edit, Trash2 } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import '../styles/Exams.css';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo: 'admissional',
    colaboradorId: '',
    dataExame: '',
    documentos: null
  });

  const { employees } = useEmployees();
  const colaboradoresAtivos = employees.filter(emp => emp.status === 'ativo');

  const handleSubmit = (e) => {
    e.preventDefault();
    const colaborador = employees.find(emp => emp.id === parseInt(formData.colaboradorId));
    
    const newExam = {
      id: Date.now(),
      ...formData,
      colaborador: colaborador?.nome,
      empresa: colaborador?.empresa
    };

    setExams(prev => [...prev, newExam]);
    setShowForm(false);
    setFormData({ tipo: 'admissional', colaboradorId: '', dataExame: '', documentos: null });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, documentos: file }));
    }
  };

  const checkExamePeriodicoProximo = (dataAdmissao) => {
    if (!dataAdmissao) return false;
    
    const onzeMeses = 11 * 30 * 24 * 60 * 60 * 1000;
    const dataAdm = new Date(dataAdmissao);
    const hoje = new Date();
    const diff = hoje - dataAdm;
    
    return diff >= onzeMeses && diff < (onzeMeses + (30 * 24 * 60 * 60 * 1000));
  };

  return (
    <div className="exams">
      <div className="page-header">
        <h1>Gestão de Exames</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Novo Exame
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Registrar Exame</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de Exame *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                    required
                  >
                    <option value="admissional">Exame Admissional</option>
                    <option value="demissional">Exame Demissional</option>
                    <option value="periodico">Exame Periódico</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Colaborador *</label>
                  <select
                    value={formData.colaboradorId}
                    onChange={(e) => setFormData({...formData, colaboradorId: e.target.value})}
                    required
                  >
                    <option value="">Selecione o colaborador</option>
                    {colaboradoresAtivos.map(col => (
                      <option key={col.id} value={col.id}>
                        {col.nome} - {col.cargo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data do Exame *</label>
                  <input
                    type="date"
                    value={formData.dataExame}
                    onChange={(e) => setFormData({...formData, dataExame: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Documentos</label>
                  <div className="file-upload">
                    <input type="file" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
                    <Upload size={18} />
                    <span>{formData.documentos ? formData.documentos.name : 'Selecionar arquivos'}</span>
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

      <div className="exams-section">
        <h2>Exames Registrados</h2>
        <div className="exams-grid">
          {exams.map(exam => (
            <div key={exam.id} className="exam-card">
              <div className="exam-header">
                <h3>
                  {exam.tipo === 'admissional' ? 'Exame Admissional' : 
                   exam.tipo === 'demissional' ? 'Exame Demissional' : 'Exame Periódico'}
                </h3>
                <span className="exam-date">
                  {new Date(exam.dataExame).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <div className="exam-details">
                <div className="detail">
                  <span>Colaborador:</span>
                  <span>{exam.colaborador}</span>
                </div>
                <div className="detail">
                  <span>Empresa:</span>
                  <span>{exam.empresa}</span>
                </div>
                {exam.documentos && (
                  <div className="detail">
                    <span>Documentos:</span>
                    <span className="file-link">
                      <FileText size={14} />
                      {exam.documentos.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="notifications-section">
        <h2>Notificações de Exames Periódicos</h2>
        <div className="notifications-grid">
          {colaboradoresAtivos.map(colaborador => {
            if (checkExamePeriodicoProximo(colaborador.dataAdmissao)) {
              return (
                <div key={colaborador.id} className="notification-card warning">
                  <Bell size={20} />
                  <div className="notification-content">
                    <h4>Exame Periódico Próximo</h4>
                    <p>
                      O colaborador {colaborador.nome} completa 11 meses de empresa em breve.
                      Exame periódico deve ser agendado para o 12º mês.
                    </p>
                    <span>Data de admissão: {new Date(colaborador.dataAdmissao).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Exams;