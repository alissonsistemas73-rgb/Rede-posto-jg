import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // ADICIONE ESTA IMPORT
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate(); // ADICIONE ESTE HOOK

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(credentials.email, credentials.password);
      navigate('/dashboard'); // REDIRECIONE APÓS LOGIN BEM-SUCEDIDO
    } catch (error) {
      console.error('Login failed:', error);
      alert('Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>RH System</h1>
          <p>Faça login para acessar o sistema</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <User size={20} />
            <input
              type="email"
              placeholder="E-mail"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          
          <div className="input-group">
            <Lock size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Entre em contato com o administrador para criar uma conta</p>
        </div>
      </div>
    </div>
  );
};

export default Login;