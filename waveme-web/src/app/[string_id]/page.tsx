import { pool } from '../api/db';

export default async function UserPage({ params }: { params: { string_id: string } }) {
  // 可选：从数据库查找用户
  const [rows]: any = await pool.query('SELECT * FROM user WHERE string_id = ?', [params.string_id]);
  const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

  if (!user) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 100 }}>用户不存在</div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#18181b', color: '#fff' }}>
      <div style={{ background: '#23232b', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px #0002', minWidth: 320, textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>用户专属页面</h2>
        <div style={{ fontSize: 18, marginBottom: 8 }}>string_id：</div>
        <div style={{ fontWeight: 'bold', color: '#60a5fa', fontSize: 22 }}>{user.string_id}</div>
        <div style={{ marginTop: 16 }}>手机号：{user.phone}</div>
        <div>颜色：{user.color}</div>
      </div>
    </div>
  );
}