"use client";

import { pool } from '../api/db';
import dynamic from 'next/dynamic';

const ProfileCard = dynamic(() => import('./ProfileCard'), { ssr: false });

// =================================================================================
//  页面主入口 (服务器组件)
// =================================================================================
export default async function UserPage({ params }: { params: { string_id: string } }) {
  const { string_id } = await params;
  const [rows]: any = await pool.query('SELECT * FROM user WHERE string_id = ?', [string_id]);
  const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

  if (!user) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 100 }}>用户不存在</div>;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle, hsl(210, 40%, 96%), hsl(210, 40%, 90%))',
      position: 'relative',
      overflow: 'hidden',
      padding: '20px 0'
    }}>
      <div style={{position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'hsl(210, 40%, 85%)', top: '-50px', left: '-50px', opacity: 0.5}}></div>
      <div style={{position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'hsl(210, 40%, 85%)', bottom: '-80px', right: '-80px', opacity: 0.5}}></div>
      <ProfileCard user={user} />
    </div>
  );
}