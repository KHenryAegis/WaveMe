import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const { phone, color, string_id } = await req.json();
  try {
    await pool.query(
      'INSERT INTO user (string_id, phone, bracelet_color) VALUES (?, ?, ?)',
      [string_id || uuidv4(), phone, color]
    );
    return NextResponse.json({ string_id, phone, color }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Database error', details: err }, { status: 500 });
  }
}