import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from './db';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // 创建用户
    const { phone, color } = req.body;
    const string_id = uuidv4();
    try {
      await pool.query('INSERT INTO users (string_id, phone, color) VALUES (?, ?, ?)', [string_id, phone, color]);
      res.status(201).json({ string_id, phone, color });
    } catch (err) {
      res.status(500).json({ error: 'Database error', details: err } );
    }
  } else if (req.method === 'GET') {
    // 根据phone查询用户
    const { phone } = req.query;
    if (!phone) {
      res.status(400).json({ error: 'Missing phone parameter' });
      return;
    }
    try {
      const [rows]: any = await pool.query('SELECT * FROM users WHERE phone = ?', [phone]);
      if (Array.isArray(rows) && rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Database error', details: err });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 