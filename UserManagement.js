import React, { useState } from 'react';
import { Plus, Edit, Trash2, User, Shield } from 'lucide-react';
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, nome: 'Administrador', email: 'admin@rh.com', role: 'Administrador', status: 'ativo' },
    { id: 2, nome: 'Usuário RH', email: 'rh@rh.com', role: 'RH', status: 'ativo' },
    { id: 3, nome: 'João Silva', email: 'joao@empresa.com', role: 'RH', status: 'inativo' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    role: 'RH',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para adicionar usuário
    console.log('Novo usuário:', formData);
    setShowForm(false);
    setFormData({ nome: '', email: '', role: 'RH', password: '', confirmPassword: '' });
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>Gestão de Usuários</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Novo Usuário
        </button>
      </div>

      {showForm && (
        <div className="user-form-modal">
          <div className="modal-content">
            <h2>Adicionar Novo Usuário</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Perfil *</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="RH">RH</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Senha *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirmar Senha *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="users-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              {user.role === 'Administrador' ? <Shield size={24} /> : <User size={24} />}
            </div>
            
            <div className="user-info">
              <h3>{user.nome}</h3>
              <p>{user.email}</p>
              <div className="user-meta">
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
                <span className={`status-badge ${user.status}`}>
                  {user.status}
                </span>
              </div>
            </div>

            <div className="user-actions">
              <button className="btn-icon" title="Editar">
                <Edit size={16} />
              </button>
              <button className="btn-icon btn-danger" title="Excluir">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;