import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import defaultPortfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/lib/portfolio-types'

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

let inMemoryFallback: PortfolioData = defaultPortfolioData as PortfolioData

export async function GET() {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
    const parsed = JSON.parse(fileContent) as PortfolioData
    inMemoryFallback = parsed
    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json(inMemoryFallback)
  }
}

export async function PUT(request: Request) {
  try {
    const updatedData = (await request.json()) as PortfolioData
    inMemoryFallback = updatedData
    try {
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), 'utf-8')
    } catch {
      // On read-only serverless filesystems, keep updated in-memory fallback
    }
    return NextResponse.json({ success: true, data: updatedData })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Invalid payload' },
      { status: 400 }
    )
  }
}
