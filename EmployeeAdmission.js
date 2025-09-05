import React, { useState } from 'react';
import { Upload, User, Briefcase, Save, ArrowLeft, Check, FileText } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeAdmission.css';

// Função para formatar CPF durante a digitação
const formatarCPFInput = (value) => {
  // Remove tudo que não é dígito
  const cpf = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  const cpfLimpo = cpf.substring(0, 11);
  
  // Aplica a formatação
  if (cpfLimpo.length <= 3) {
    return cpfLimpo;
  } else if (cpfLimpo.length <= 6) {
    return `${cpfLimpo.substring(0, 3)}.${cpfLimpo.substring(3)}`;
  } else if (cpfLimpo.length <= 9) {
    return `${cpfLimpo.substring(0, 3)}.${cpfLimpo.substring(3, 6)}.${cpfLimpo.substring(6)}`;
  } else {
    return `${cpfLimpo.substring(0, 3)}.${cpfLimpo.substring(3, 6)}.${cpfLimpo.substring(6, 9)}-${cpfLimpo.substring(9)}`;
  }
};

// Função para validar CPF (opcional, mas útil)
const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  
  // Validação dos dígitos verificadores
  let soma = 0;
  let resto;
  
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  
  return true;
};

const EmployeeAdmission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados Pessoais
    nome: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    telefone: '',
    
    // Dados Admissionais
    dataAdmissao: '',
    cargo: '',
    salario: '',
    empresa: '',
    comentarios: '',
    asoAdmissional: null,
    documentosAdmissional: null,
    contratoAdmissional: null
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cpfValido, setCpfValido] = useState(true);
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();

  const cargos = [
    'Caixa', 'Caixa de pista', 'Frentista', 'Gerente', 'Zelador', 
    'Vigia', 'Gerente de pista', 'Chefe de pista', 'Coordenador operacional',
    'Supervisor', 'Diretor', 'Supervisor de logística', 'Assistente Adm',
    'Coordenador Rh', 'Motorista rodotrem', 'Chefe de transportes', 
    'Motorista bi trem', 'Tratador de cavalo', 'Jardineiro', 'Caseiro',
    'Motorista caminhão pipa'
  ];

  const empresas = [
    { cnpj: '39.496.670/0002-67', nome: '2 DE JULHO-AEROPORTO - REDE JG BAIXA GRANDE' },
    { cnpj: '29.922.687/0001-02', nome: 'AEROPORTO-AUTO PASSO CAPIM - LUBRIGEGEU XLVI' },
    { cnpj: '58.034.504/0001-02', nome: 'AUTO POSTO CAPIM' },
    { cnpj: '09.153.856/0001-71', nome: 'APACHE - AUTO POSTO APACHE' },
    { cnpj: '48.630.296/0001-50', nome: 'ARACAS - REDE JG ARACAS' },
    { cnpj: '48.629.412/0001-11', nome: 'AVENIDA - REDE JG AVENIDA' },
    { cnpj: '39.999.066/0001-72', nome: 'BELA VISTA - REDE JG BELA VISTA' },
    { cnpj: '34.733.564/0001-55', nome: 'CARAÍBAS 2 - REDE JG SOUZA' },
    { cnpj: '14.075.105/0004-67', nome: 'CHAPÉU DE COURO' },
    { cnpj: '12.656.384/0002-65', nome: 'ELDORADO - AUTO POSTO ESPLANADA' },
    { cnpj: '39.630.641/0001-65', nome: 'ESPLANADA - REDE JG ESPLANADA' },
    { cnpj: '29.922.751/0001-47', nome: 'ESTRADÃO - GUIMARASS XLVI' },
    { cnpj: '29.922.765/0001-60', nome: 'FREITAS - LUBRINESSA XVI' },
    { cnpj: '59.590.028/0001-79', nome: 'GEGEU CENTRAL - P. DO GEGEU' },
    { cnpj: '34.309.083/0001-17', nome: 'GASPEMA - REDE JG BONFIM' },
    { cnpj: '34.733.619/0001-27', nome: 'GEO/LUA Negra - REDE JG LUA' },
    { cnpj: '39.657.202/0001-46', nome: 'GONZAGÃO-JI - REDE JG GONZAGÃO' },
    { cnpj: '03.487.322/0001-03', nome: 'LUBRAX - POSTO JJ' },
    { cnpj: '39.431.902/0001-18', nome: 'MAC - REDE JG CALDEIRAO GRANDE' },
    { cnpj: '48.765.365/0001-33', nome: 'PAU - REDE JG MAC' },
    { cnpj: '41.995.510/0001-23', nome: 'DARCO/POJUCA - REDE JG POJUCA' },
    { cnpj: '20.170.100/0001-73', nome: 'PORTELA - AUTO POSTO PORTELA' },
    { cnpj: '29.922.765/0002-41', nome: 'PRAÇA - LUBRINESSA XVI' },
    { cnpj: '39.630.632/0001-74', nome: 'SORAIA - REDE JG SORAIA' },
    { cnpj: '34.309.089/0001-94', nome: 'TIMBAU - REDE JG TIMBAU' },
    { cnpj: '39.496.670/0003-48', nome: 'VANESSA - REDE JG BAIXA GRANDE' },
    { cnpj: '35.273.019/0001-96', nome: 'JG TRANSPORTE' },
    { cnpj: '35.226.251/0001-73', nome: 'JG SOLUÇÕES' },
    { cnpj: '58.072.767/0001-06', nome: 'MASTER ADMINISTRAÇÃO' },
    { cnpj: '57.299.038/0001-24', nome: 'GESTÃO ADM' },
    { cnpj: '57.276.922/0001-43', nome: 'REDE JG BRASIL TRANSPORTES' },
    { cnpj: '48.411.273/0001-55', nome: 'REDE JG AGRONEGOCIOS' }
  ];

  const steps = [
    { number: 1, label: 'Dados Pessoais', icon: User },
    { number: 2, label: 'Dados Admissionais', icon: Briefcase },
    { number: 3, label: 'Documentos', icon: FileText }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Formata automaticamente o CPF durante a digitação
    if (name === 'cpf') {
      const cpfFormatado = formatarCPFInput(value);
      setFormData(prev => ({ ...prev, [name]: cpfFormatado }));
      
      // Valida o CPF quando estiver completo (14 caracteres com formatação)
      if (cpfFormatado.length === 14) {
        const cpfValido = validarCPF(cpfFormatado);
        setCpfValido(cpfValido);
        if (!cpfValido) {
          alert('CPF inválido. Por favor, verifique o número digitado.');
        }
      } else {
        setCpfValido(true);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      // Validação do CPF no primeiro passo
      if (formData.cpf.length === 14 && !validarCPF(formData.cpf)) {
        alert('Por favor, digite um CPF válido.');
        setCpfValido(false);
        return;
      }
      
      if (!formData.nome || !formData.cpf || !formData.telefone) {
        alert('Por favor, preencha todos os campos obrigatórios do primeiro passo.');
        return;
      }
    }
    else if (currentStep === 2) {
      if (!formData.dataAdmissao || !formData.cargo || !formData.salario || !formData.empresa) {
        alert('Por favor, preencha todos os campos obrigatórios do segundo passo.');
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validação final do CPF
    if (formData.cpf && formData.cpf.length === 14 && !validarCPF(formData.cpf)) {
      alert('Por favor, digite um CPF válido antes de finalizar a admissão.');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.asoAdmissional || !formData.contratoAdmissional) {
      alert('Por favor, faça upload de todos os documentos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Encontrar a empresa selecionada para obter nome e CNPJ
      const empresaSelecionada = empresas.find(emp => emp.cnpj === formData.empresa);
      const dadosCompletos = {
        ...formData,
        empresa: empresaSelecionada ? `${empresaSelecionada.nome} - ${empresaSelecionada.cnpj}` : formData.empresa
      };

      const newEmployee = addEmployee(dadosCompletos);
      console.log('Colaborador admitido:', newEmployee);
      setShowSuccess(true);
      
      setTimeout(() => {
        setFormData({
          nome: '',
          cpf: '',
          dataNascimento: '',
          sexo: '',
          telefone: '',
          dataAdmissao: '',
          cargo: '',
          salario: '',
          empresa: '',
          comentarios: '',
          asoAdmissional: null,
          documentosAdmissional: null,
          contratoAdmissional: null
        });
        setCurrentStep(1);
        setShowSuccess(false);
        navigate('/employees');
      }, 2000);

    } catch (error) {
      console.error('Erro ao admitir colaborador:', error);
      alert('Erro ao salvar colaborador. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Deseja cancelar a admissão? Todos os dados preenchidos serão perdidos.')) {
      navigate('/employees');
    }
  };

  return (
    <div className="employee-admission">
      <div className="page-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/employees')}>
            <ArrowLeft size={20} />
          </button>
          <h1>Admissão de Colaborador</h1>
        </div>
      </div>

      {showSuccess && (
        <div className="success-message">
          <Save size={20} />
          <span>Colaborador admitido com sucesso! Redirecionando...</span>
        </div>
      )}

      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-steps">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isActive = currentStep === step.number;
            
            return (
              <div 
                key={step.number} 
                className={`progress-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              >
                <div className="step-icon">
                  {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                </div>
                <span className="step-label">{step.label}</span>
                <div className="step-number">{step.number}</div>
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admission-form">
        {/* Passo 1: Dados Pessoais */}
        {currentStep === 1 && (
          <div className="form-section">
            <h2>Dados Pessoais</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Nome Completo *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Digite o nome completo"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CPF *</label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                  placeholder="000.000.000-00"
                  disabled={isSubmitting}
                  maxLength="14"
                  className={!cpfValido && formData.cpf.length === 14 ? 'input-error' : ''}
                />
                {!cpfValido && formData.cpf.length === 14 && (
                  <span className="error-message">CPF inválido</span>
                )}
              </div>

              <div className="form-group">
                <label>Data de Nascimento *</label>
                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Sexo *</label>
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Telefone *</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                  placeholder="(00) 00000-0000"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}

        {/* Passo 2: Dados Admissionais */}
        {currentStep === 2 && (
          <div className="form-section">
            <h2>Dados Admissionais</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Data de Admissão *</label>
                <input
                  type="date"
                  name="dataAdmissao"
                  value={formData.dataAdmissao}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label>Cargo *</label>
                <select
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecione o cargo</option>
                  {cargos.map(cargo => (
                    <option key={cargo} value={cargo}>{cargo}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Salário * (R$)</label>
                <input
                  type="number"
                  name="salario"
                  value={formData.salario}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  placeholder="0,00"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label>Empresa *</label>
                <select
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Selecione a empresa</option>
                  {empresas.map(empresa => (
                    <option key={empresa.cnpj} value={empresa.cnpj}>
                      {empresa.nome} - {empresa.cnpj}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Comentários</label>
                <textarea
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Observações adicionais..."
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}

        {/* Passo 3: Documentos */}
        {currentStep === 3 && (
          <div className="form-section">
            <h2>Documentos</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>ASO Admissional *</label>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'asoAdmissional')}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    disabled={isSubmitting}
                    required
                  />
                  <Upload size={18} />
                  <span>{formData.asoAdmissional ? formData.asoAdmissional.name : 'Selecionar arquivo'}</span>
                </div>
                <small>Exame admissional obrigatório</small>
              </div>

              <div className="form-group">
                <label>Documentos Admissional</label>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'documentosAdmissional')}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    disabled={isSubmitting}
                    multiple
                  />
                  <Upload size={18} />
                  <span>{formData.documentosAdmissional ? formData.documentosAdmissional.name : 'Selecionar arquivos'}</span>
                </div>
                <small>RG, CTPS, outros documentos (opcional)</small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contrato Admissional *</label>
                <div className="file-upload">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, 'contratoAdmissional')}
                    accept=".pdf,.doc,.docx"
                    disabled={isSubmitting}
                    required
                  />
                  <Upload size={18} />
                  <span>{formData.contratoAdmissional ? formData.contratoAdmissional.name : 'Selecionar arquivo'}</span>
                </div>
                <small>Contrato de trabalho assinado</small>
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={currentStep === 1 ? handleCancel : prevStep}
            disabled={isSubmitting}
          >
            {currentStep === 1 ? 'Cancelar' : 'Voltar'}
          </button>
          
          {currentStep < steps.length ? (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={nextStep}
              disabled={isSubmitting}
            >
              Próximo
            </button>
          ) : (
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Salvando...' : (
                <>
                  <Save size={18} />
                  Finalizar Admissão
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeAdmission;