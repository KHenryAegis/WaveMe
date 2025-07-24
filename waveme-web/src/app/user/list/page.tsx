"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// --- SVG Icons for buttons ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

// --- Main Component ---
interface User {
  string_id: string;
  phone: string;
  color: string;
}

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

const UserCrud: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({ phone: '', color: '', string_id: '' });
  const router = useRouter();

  // 查询所有用户（实际应为根据phone查找，这里模拟）
  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 处理表单输入
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 生成string_id
  const handleGenerateId = () => {
    setForm(f => ({ ...f, string_id: generateUUID() }));
  };

  // 提交表单（添加或更新）
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone || !form.color || !form.string_id) {
      setError('Phone、Color、String ID 必填');
      return;
    }
    setError(null);
    if (editingUser) {
      // 编辑
      setUsers(users.map(u => u.phone === editingUser.phone ? { ...u, ...form } : u));
    } else {
      // 新增
      setUsers([...users, { ...form }]);
    }
    setForm({ phone: '', color: '', string_id: '' });
    setEditingUser(null);
  };

  // 编辑
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setForm({ phone: user.phone, color: user.color, string_id: user.string_id });
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingUser(null);
    setForm({ phone: '', color: '', string_id: '' });
    setError(null);
  };

  // 删除
  const handleDelete = (phone: string) => {
    setError(null);
    setUsers(users.filter(u => u.phone !== phone));
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl shadow-orange-500/10 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6">用户管理</h2>
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
            {editingUser && (
              <button type="button" onClick={handleCancelEdit} className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 font-semibold text-white transition">
                取消
              </button>
            )}
            <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 font-semibold text-white transition" disabled={!form.string_id}>
              <PlusIcon />
              {editingUser ? '更新用户' : '添加用户'}
            </button>
          </div>
        </form>
        {loading ? (
          <div className="text-center text-gray-400">加载中...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-gray-700">
                <tr>
                  <th className="p-3 text-sm font-bold text-gray-400 uppercase">Phone</th>
                  <th className="p-3 text-sm font-bold text-gray-400 uppercase">Color</th>
                  <th className="p-3 text-sm font-bold text-gray-400 uppercase">String ID</th>
                  <th className="p-3 text-sm font-bold text-gray-400 uppercase text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.phone} className="border-b border-gray-700 hover:bg-gray-900/50">
                    <td className="p-3 font-medium">{user.phone}</td>
                    <td className="p-3">{user.color}</td>
                    <td className="p-3 text-gray-400">{user.string_id}</td>
                    <td className="p-3 flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(user)} className="p-2 rounded-md text-gray-400 hover:bg-orange-500 hover:text-white transition" aria-label="编辑用户">
                        <EditIcon />
                      </button>
                      <button onClick={() => handleDelete(user.phone)} className="p-2 rounded-md text-gray-400 hover:bg-red-500 hover:text-white transition" aria-label="删除用户">
                        <DeleteIcon />
                      </button>
                      <button onClick={() => router.push(`/user/${user.string_id}`)} className="p-2 rounded-md text-gray-400 hover:bg-blue-500 hover:text-white transition" aria-label="查看用户">
                        查看
                      </button>
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

export default UserCrud; 