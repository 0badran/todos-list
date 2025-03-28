import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const tables = await Promise.all([
            sql`CREATE TABLE IF NOT EXISTS todos(
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                type TEXT DEFAULT 'upcoming',
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );`,
            sql`CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL,
                hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );`
        ]);
        return NextResponse.json({ tables }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}