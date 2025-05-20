import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const tables = await Promise.all([
            sql`CREATE TABLE IF NOT EXISTS todos(
                id SERIAL PRIMARY KEY,
                uuid TEXT NOT NULL,
                title TEXT NOT NULL,
                type TEXT DEFAULT 'upcoming',
                createdAt TIMESTAMP DEFAULT NOW(),
                updatedAt TIMESTAMP DEFAULT NOW()
            );`
        ]);
        return NextResponse.json({ tables }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}