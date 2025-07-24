"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const UserPage: React.FC = () => {
  const [form, setForm] = useState({ phone: '', color: '', string_id: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerateId = () => {
    setForm(f => ({ ...f, string_id: generateUUID() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.color || !form.string_id) {
      setError('Phone、Color、String ID 必填');
      return;
    }

    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(form)
    });

    console.log(res);

    setError(null);
    setSuccess(true);
    setForm({ phone: '', color: '', string_id: '' });
    setTimeout(() => setSuccess(false), 1500);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl shadow-orange-500/10 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">新增用户</h2>
        {error && <div className="bg-red-900 border border-red-700 text-white px-4 py-2 rounded-md mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-900/50 rounded-lg">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="bg-gray-700 border-2 border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
            <select
              name="color"
              value={form.color}
              onChange={handleChange}
              required
              className="bg-gray-700 border-2 border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            >
              <option value="" disabled>选择颜色</option>
              <option value="black">黑色</option>
              <option value="blue">蓝色</option>
            </select>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button type="button" onClick={handleGenerateId} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 font-semibold text-white transition">
              生成 String ID
            </button>
            <span className="text-orange-400 break-all">{form.string_id}</span>
          </div>
          <div className="flex items-center justify-end gap-3 mt-4">
            <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 font-semibold text-white transition" disabled={!form.string_id}>
              <PlusIcon />
              添加用户
            </button>
          </div>
        </form>
        <button
          onClick={() => router.push('/user/list')}
          className="w-full mt-2 px-4 py-3 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold text-white transition text-lg"
        >
          查看用户列表
        </button>
        {success && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-700 text-white px-8 py-4 rounded-lg shadow-lg text-xl">用户添加成功！</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
