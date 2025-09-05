import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, User, UserX } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeManagement.css';

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { employees, deleteEmployee } = useEmployees();
  const navigate = useNavigate();
  
  const filteredEmployees = employees.filter(emp =>
    emp.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.cpf?.includes(searchTerm) ||
    emp.cargo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para formatar CPF
  const formatarCPF = (cpf) => {
    if (!cpf) return 'Não informado';
    cpf = cpf.toString().replace(/\D/g, '');
    if (cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  };

  // Função para formatar data
  const formatarData = (data) => {
    if (!data) return 'Não informada';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  // Função para extrair apenas o nome da empresa (sem CNPJ)
  const getNomeEmpresa = (empresa) => {
    if (!empresa) return 'Não informada';
    
    // Remove o CNPJ se existir (tudo após o último hífen)
    const nomeSemCNPJ = empresa.split(' - ')[0];
    return nomeSemCNPJ || empresa;
  };

  // Função para obter ícone de status
  const getStatusIcon = (status) => {
    return status === 'ativo' ? <User size={14} /> : <UserX size={14} />;
  };

  const handleDelete = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o colaborador ${nome}?`)) {
      deleteEmployee(id);
    }
  };

  return (
    <div className="employee-management">
      <div className="page-header">
        <h1>Gestão de Colaboradores</h1>
        <button className="btn btn-primary" onClick={() => navigate('/admission')}>
          <Plus size={18} />
          Novo Colaborador
        </button>
      </div>

      <div className="search-section">
        <div className="search-input">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, CPF, cargo, empresa ou status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="stats-info">
          <span className="stat-item">
            <User size={16} />
            Ativos: {employees.filter(emp => emp.status === 'ativo').length}
          </span>
          <span className="stat-item">
            <UserX size={16} />
            Inativos: {employees.filter(emp => emp.status === 'inativo').length}
          </span>
          <span className="stat-item">
            Total: {employees.length}
          </span>
        </div>
      </div>

      <div className="employees-table-container">
        {filteredEmployees.length === 0 ? (
          <div className="empty-state">
            {employees.length === 0 ? (
              <>
                <User size={48} />
                <h3>Nenhum colaborador cadastrado</h3>
                <p>Clique em "Novo Colaborador" para adicionar o primeiro.</p>
              </>
            ) : (
              <>
                <Search size={48} />
                <h3>Nenhum colaborador encontrado</h3>
                <p>Tente ajustar os termos da busca.</p>
              </>
            )}
          </div>
        ) : (
          <div className="employees-table">
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Cargo</th>
                  <th>Empresa</th>
                  <th>Data de Admissão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(employee => (
                  <tr key={employee.id} className={employee.status}>
                    <td>
                      <span className={`status-badge ${employee.status}`}>
                        {getStatusIcon(employee.status)}
                        {employee.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <div className="employee-name">
                        <User size={16} />
                        {employee.nome || 'Não informado'}
                      </div>
                    </td>
                    <td>{formatarCPF(employee.cpf)}</td>
                    <td>{employee.cargo || 'Não informado'}</td>
                    <td>
                      <span className="company-info">
                        {getNomeEmpresa(employee.empresa)}
                      </span>
                    </td>
                    <td>{formatarData(employee.dataAdmissao)}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-icon" 
                          title="Visualizar"
                          onClick={() => navigate(`/employee/${employee.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="btn-icon" 
                          title="Editar"
                          onClick={() => navigate(`/employee/edit/${employee.id}`)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="btn-icon btn-danger" 
                          title="Excluir"
                          onClick={() => handleDelete(employee.id, employee.nome)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;