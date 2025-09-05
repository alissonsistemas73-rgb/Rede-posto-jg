import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import EmployeeAdmission from './pages/EmployeeAdmission';
import EmployeeDismissal from './pages/EmployeeDismissal';
import ContractManagement from './pages/ContractManagement';
import VacationManagement from './pages/VacationManagement';
import Certificates from './pages/Certificates';
import Insurances from './pages/Insurances';
import Exams from './pages/Exams';
import Reports from './pages/Reports';
import AdmissionTimeReport from './pages/AdmissionTimeReport';
import EmployeesByCompanyReport from './pages/EmployeesByCompanyReport';
import PayrollReport from './pages/PayrollReport';
import VacationsReport from './pages/VacationsReport';
import ContractsStatusReport from './pages/ContractsStatusReport';
import PositionsSalaryReport from './pages/PositionsSalaryReport';
import TurnoverReport from './pages/TurnoverReport';
import DismissalsReport from './pages/DismissalsReport';
import UserManagement from './pages/UserManagement';
import Layout from './components/Layout';
import './styles/global.css';

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user.role !== requiredRole && user.role !== 'Administrador') {
    return <Navigate to="/notifications" />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Rota de Login (pública) */}
              <Route path="/login" element={<Login />} />
              
              {/* Rota padrão - redireciona para notificações */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Notifications />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Notificações */}
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Layout>
                    <Notifications />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Dashboard */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Gestão de Colaboradores */}
              <Route path="/employees" element={
                <ProtectedRoute>
                  <Layout>
                    <EmployeeManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Admissão de Colaboradores */}
              <Route path="/admission" element={
                <ProtectedRoute>
                  <Layout>
                    <EmployeeAdmission />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Demissão de Colaboradores */}
              <Route path="/dismissal" element={
                <ProtectedRoute>
                  <Layout>
                    <EmployeeDismissal />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Gestão de Contratos */}
              <Route path="/contracts" element={
                <ProtectedRoute>
                  <Layout>
                    <ContractManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Gestão de Férias */}
              <Route path="/vacations" element={
                <ProtectedRoute>
                  <Layout>
                    <VacationManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Gestão de Certificados */}
              <Route path="/certificates" element={
                <ProtectedRoute>
                  <Layout>
                    <Certificates />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Gestão de Seguros */}
              <Route path="/insurances" element={
                <ProtectedRoute>
                  <Layout>
                    <Insurances />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Gestão de Exames */}
              <Route path="/exams" element={
                <ProtectedRoute>
                  <Layout>
                    <Exams />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota principal de Relatórios */}
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Sub-rotas de Relatórios */}
              <Route path="/reports/admission-time" element={
                <ProtectedRoute>
                  <Layout>
                    <AdmissionTimeReport />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/employees-by-company" element={
                <ProtectedRoute>
                  <Layout>
                    <EmployeesByCompanyReport />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/payroll" element={
                <ProtectedRoute>
                  <Layout>
                    <PayrollReport />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/vacations" element={
                <ProtectedRoute>
                  <Layout>
                    <VacationsReport />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/contracts-status" element={
                <ProtectedRoute>
                  <Layout>
                    <ContractsStatusReport />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/positions-salary" element={
                <ProtectedRoute>
                  <Layout>
                    <PositionsSalaryReport />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/turnover" element={
                <ProtectedRoute>
                  <Layout>
                    <TurnoverReport />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports/dismissals" element={
                <ProtectedRoute>
                  <Layout>
                    <DismissalsReport />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota de Gestão de Usuários (apenas Administrador) */}
              <Route path="/users" element={
                <ProtectedRoute requiredRole="Administrador">
                  <Layout>
                    <UserManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Rota fallback para páginas não encontradas */}
              <Route path="*" element={
                <ProtectedRoute>
                  <Layout>
                    <div className="page-not-found">
                      <h1>404 - Página não encontrada</h1>
                      <p>A página que você está procurando não existe.</p>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => window.location.href = '/notifications'}
                      >
                        Voltar para Notificações
                      </button>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;