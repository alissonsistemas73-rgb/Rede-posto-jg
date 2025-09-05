import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployees = () => {
  return useContext(EmployeeContext);
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  // Carregar colaboradores do localStorage ao inicializar
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // Salvar no localStorage sempre que employees mudar
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employeeData) => {
    const newEmployee = {
      id: Date.now(),
      ...employeeData,
      status: 'ativo',
      dataCriacao: new Date().toISOString()
    };

    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id, employeeData) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...employeeData } : emp
    ));
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};