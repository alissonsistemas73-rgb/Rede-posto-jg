// VacationForm.js
import React, { useState } from 'react';
import { Save, Calendar, X } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import '../styles/VacationForm.css';

const VacationForm = ({ onClose, editData }) => {
  const [formData, setFormData] = useState({
    colaboradorId: editData?.colaboradorId || '',
    periodoAquisitivoInicio: editData?.periodoAquisitivo?.inicio || '',
    periodoAquisitivoTermino: editData?.periodoAquisitivo?.termino || '',
    feriasInicio: editData?.ferias?.inicio || '',
    feriasTermino: editData?.ferias?.termino || '',
    dias: editData?.dias || '',
    valor: editData?.valor || ''
  });

  const { employees } = useEmployees();
  const activeEmployees = employees.filter(emp => emp.status === 'ativo');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateDays = () => {
    if (formData.feriasInicio && formData.feriasTermino) {
      const start = new Date(formData.feriasInicio);
      const end = new Date(formData.feriasTermino);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setFormData(prev => ({ ...prev, dias: diffDays }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados das férias:', formData);
    alert('Férias programadas com sucesso!');
    onClose();
  };

  return (
    <div className="vacation-form-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{editData ? 'Editar Férias' : 'Programar Férias'}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Colaborador *</label>
              <select
                name="colaboradorId"
                value={formData.colaboradorId}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione o colaborador</option>
                {activeEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nome} - {emp.cargo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Início do Período Aquisitivo *</label>
              <input
                type="date"
                name="periodoAquisitivoInicio"
                value={formData.periodoAquisitivoInicio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Término do Período Aquisitivo *</label>
              <input
                type="date"
                name="periodoAquisitivoTermino"
                value={formData.periodoAquisitivoTermino}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Início das Férias *</label>
              <input
                type="date"
                name="feriasInicio"
                value={formData.feriasInicio}
                onChange={handleInputChange}
                onBlur={calculateDays}
                required
              />
            </div>
            <div className="form-group">
              <label>Término das Férias *</label>
              <input
                type="date"
                name="feriasTermino"
                value={formData.feriasTermino}
                onChange={handleInputChange}
                onBlur={calculateDays}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Dias de Férias *</label>
              <input
                type="number"
                name="dias"
                value={formData.dias}
                onChange={handleInputChange}
                required
                min="1"
                max="30"
              />
            </div>
            <div className="form-group">
              <label>Valor das Férias (R$) *</label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleInputChange}
                step="0.01"
                required
                min="0"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={18} />
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VacationForm;