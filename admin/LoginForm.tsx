
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (password: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-8">
           <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-4">N</div>
           <h1 className="text-2xl font-black text-gray-900">Admin Login</h1>
           <p className="text-gray-500 text-sm">Painel exclusivo para administradores</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Senha de Acesso</label>
            <input
              required
              type="password"
              placeholder="Digite sua senha secreta"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl shadow-lg transition-all"
          >
            Acessar Painel
          </button>
        </form>
      </div>
    </div>
  );
};
