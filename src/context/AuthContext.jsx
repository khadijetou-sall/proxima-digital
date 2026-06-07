/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, adminAPI } from '../api/axios';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }
    authAPI.getMe()
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);
  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  }, []);
  const adminLogin = useCallback(async (email, password) => {
    const res = await adminAPI.login({ email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.admin);
    return res.data;
  }, []);
  const register = useCallback(async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data;
  }, []);
  const demoLogin = useCallback(() => {
    const demoUser = { id: 'demo', name: 'Client Demo', email: 'demo@proxima.digital' };
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('demoUser', JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);
  const demoAdminLogin = useCallback(() => {
    const demoAdmin = { id: 'demo-admin', name: 'Admin Demo', email: 'digitalproxima317@gmail.com', isAdmin: true, role: 'superadmin' };
    localStorage.setItem('token', 'demo-admin-token');
    localStorage.setItem('demoAdmin', JSON.stringify(demoAdmin));
    setUser(demoAdmin);
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('demoUser');
    localStorage.removeItem('demoAdmin');
    setUser(null);
  }, []);
  useEffect(() => {
    const demoData = localStorage.getItem('demoUser');
    if (demoData) { setUser(JSON.parse(demoData)); return; }
    const adminDemoData = localStorage.getItem('demoAdmin');
    if (adminDemoData) { setUser(JSON.parse(adminDemoData)); }
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, login, adminLogin, register, demoLogin, demoAdminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

