import React, { useState } from 'react';
import { Plus, Calendar, Download, Edit, Trash2 } from 'lucide-react';
import VacationForm from './VacationForm';
import '../styles/VacationManagement.css';

const VacationManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingVacation, setEditingVacation] = useState(null);
  const [vacations, setVacations] = useState([
    {
      id: 1,
      colaboradorId: '1',
      colaborador: 'João Silva',
      periodoAquisitivo: { inicio: '2023-01-01', termino: '2024-01-01' },
      ferias: { inicio: '2024-02-01', termino: '2024-02-30' },
      dias: 30,
      restam: 0,
      valor: 4500.00
    }
  ]);

  const handleEdit = (vacation) => {
    setEditingVacation(vacation);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir estas férias?')) {
      setVacations(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleSave = (vacationData) => {
    if (editingVacation) {
      setVacations(prev => prev.map(v => 
        v.id === editingVacation.id ? { ...v, ...vacationData } : v
      ));
      setEditingVacation(null);
    } else {
      const newVacation = {
        id: Date.now(),
        ...vacationData,
        restam: vacationData.dias
      };
      setVacations(prev => [...prev, newVacation]);
    }
    setShowForm(false);
  };

  return (
    <div className="vacation-management">
      <div className="page-header">
        <h1>Gestão de Férias</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Programar Férias
        </button>
      </div>

      {showForm && (
        <VacationForm
          onClose={() => {
            setShowForm(false);
            setEditingVacation(null);
          }}
          editData={editingVacation}
          onSave={handleSave}
        />
      )}

      <div className="vacations-list">
        {vacations.map(vacation => ( // CORRIGIDO: vacation (não vaction)
          <div key={vacation.id} className="vacation-card">
            <div className="vacation-header">
              <h3>{vacation.colaborador}</h3>
              <div className="vacation-actions">
                <button 
                  className="btn-icon"
                  onClick={() => handleEdit(vacation)}
                  title="Editar"
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="btn-icon btn-danger"
                  onClick={() => handleDelete(vacation.id)}
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
                <span className={`status-badge ${vacation.restam === 0 ? 'completed' : 'pending'}`}>
                  {vacation.restam === 0 ? 'Concluído' : 'Pendente'}
                </span>
              </div>
            </div>

            <div className="vacation-details">
              <div className="detail-row">
                <div className="detail">
                  <span>Período Aquisitivo:</span>
                  <span>
                    {new Date(vacation.periodoAquisitivo.inicio).toLocaleDateString()} a {' '}
                    {new Date(vacation.periodoAquisitivo.termino).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail">
                  <span>Data de Início:</span>
                  <span>{new Date(vacation.ferias.inicio).toLocaleDateString()}</span>
                </div>
                <div className="detail">
                  <span>Data de Término:</span>
                  <span>{new Date(vacation.ferias.termino).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail">
                  <span>Dias de Férias:</span>
                  <span>{vacation.dias} dias</span>
                </div>
                <div className="detail">
                  <span>Restam:</span>
                  <span>{vacation.restam} dias</span>
                </div>
                <div className="detail">
                  <span>Valor das Férias:</span>
                  <span>R$ {vacation.valor.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="vacation-actions">
              <button className="btn btn-secondary">
                <Download size={16} />
                Relatório
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacationManagement;