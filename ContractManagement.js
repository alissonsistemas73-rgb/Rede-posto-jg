// ContractManagement.js (atualizado)
import React, { useState } from 'react';
import { Plus, Search, FileText, AlertCircle, Calendar, Edit, Trash2 } from 'lucide-react';
import ContractForm from './ContractForm';
import '../styles/ContractManagement.css';

const ContractManagement = () => {
  const [activeTab, setActiveTab] = useState('ativos');
  const [showForm, setShowForm] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  
  const [contracts, setContracts] = useState([
    { id: 1, tipo: 'Locação', empresa: 'Empresa ABC', locatario: 'João Silva', inicio: '2023-01-01', vencimento: '2024-01-01', status: 'ativo' },
    { id: 2, tipo: 'Serviços', empresa: 'Empresa XYZ', locatario: 'Maria Santos', inicio: '2023-03-15', vencimento: '2023-12-15', status: 'alerta' },
    { id: 3, tipo: 'Locação', empresa: 'Empresa DEF', locatario: 'Pedro Oliveira', inicio: '2022-06-01', vencimento: '2023-11-30', status: 'vencido' }
  ]);

  const filteredContracts = contracts.filter(contract => {
    if (activeTab === 'ativos') return contract.status === 'ativo';
    if (activeTab === 'alertas') return contract.status === 'alerta';
    if (activeTab === 'vencidos') return contract.status === 'vencido';
    return true;
  });

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato?')) {
      setContracts(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleSave = (contractData) => {
    if (editingContract) {
      setContracts(prev => prev.map(c => 
        c.id === editingContract.id ? { ...c, ...contractData } : c
      ));
      setEditingContract(null);
    } else {
      const newContract = {
        id: Date.now(),
        ...contractData
      };
      setContracts(prev => [...prev, newContract]);
    }
    setShowForm(false);
  };

  return (
    <div className="contract-management">
      <div className="page-header">
        <h1>Gestão de Contratos</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Novo Contrato
        </button>
      </div>

      {showForm && (
        <ContractForm
          onClose={() => {
            setShowForm(false);
            setEditingContract(null);
          }}
          editData={editingContract}
          onSave={handleSave}
        />
      )}

      <div className="contracts-tabs">
        <button 
          className={activeTab === 'ativos' ? 'active' : ''}
          onClick={() => setActiveTab('ativos')}
        >
          <FileText size={18} />
          Contratos Ativos
        </button>
        <button 
          className={activeTab === 'alertas' ? 'active' : ''}
          onClick={() => setActiveTab('alertas')}
        >
          <AlertCircle size={18} />
          Próximos do Vencimento
        </button>
        <button 
          className={activeTab === 'vencidos' ? 'active' : ''}
          onClick={() => setActiveTab('vencidos')}
        >
          <Calendar size={18} />
          Vencidos
        </button>
      </div>

      <div className="contracts-list">
        {filteredContracts.map(contract => (
          <div key={contract.id} className={`contract-card ${contract.status}`}>
            <div className="contract-header">
              <h3>{contract.tipo} - {contract.empresa}</h3>
              <span className={`status-badge ${contract.status}`}>
                {contract.status === 'ativo' && 'Ativo'}
                {contract.status === 'alerta' && 'Alerta'}
                {contract.status === 'vencido' && 'Vencido'}
              </span>
            </div>
            
            <div className="contract-details">
              <div className="detail">
                <span>Locatário:</span>
                <span>{contract.locatario}</span>
              </div>
              <div className="detail">
                <span>Início:</span>
                <span>{new Date(contract.inicio).toLocaleDateString()}</span>
              </div>
              <div className="detail">
                <span>Vencimento:</span>
                <span>{new Date(contract.vencimento).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="contract-actions">
              <button 
                className="btn-icon"
                onClick={() => handleEdit(contract)}
                title="Editar"
              >
                <Edit size={16} />
              </button>
              <button 
                className="btn-icon btn-danger"
                onClick={() => handleDelete(contract.id)}
                title="Excluir"
              >
                <Trash2 size={16} />
              </button>
              <button className="btn btn-secondary">Visualizar</button>
              <button className="btn btn-primary">Renovar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractManagement;