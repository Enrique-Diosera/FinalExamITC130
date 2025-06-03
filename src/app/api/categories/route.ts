// src/app/api/categories/route.ts

import { NextResponse } from "next/server";

let categories: { id: number; name: string }[] = [];

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const { name } = await req.json();

  const newCategory = {
    id: Date.now(),
    name,
  };

  categories.push(newCategory);

  return NextResponse.json(newCategory, { status: 201 });
}
