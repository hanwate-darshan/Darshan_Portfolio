import { NextResponse } from 'next/server'
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

function buildOrGetZipBuffer(): Buffer {
  const projectRoot = process.cwd()
  const tmpZipPath = '/tmp/nextjs-portfolio-project.zip'

  try {
    if (fs.existsSync(tmpZipPath)) {
      fs.unlinkSync(tmpZipPath)
    }

    execSync(
      `zip -r -q "${tmpZipPath}" app components data hooks lib public package.json tsconfig.json next.config.mjs postcss.config.mjs components.json -x "public/*.zip" "**/node_modules/*" "**/.next/*"`,
      { cwd: projectRoot }
    )

    return fs.readFileSync(tmpZipPath)
  } catch {
    const fallbackZipPath = path.join(projectRoot, 'public', 'nextjs-portfolio-project.zip')
    if (fs.existsSync(fallbackZipPath)) {
      return fs.readFileSync(fallbackZipPath)
    }
    throw new Error('Could not build or locate project zip')
  }
}

export async function GET() {
  try {
    const zipBuffer = buildOrGetZipBuffer()

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="nextjs-portfolio-project.zip"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate project zip', details: String(error) },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const zipBuffer = buildOrGetZipBuffer()
    return NextResponse.json({
      filename: 'nextjs-portfolio-project.zip',
      base64: zipBuffer.toString('base64'),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate project zip', details: String(error) },
      { status: 500 }
    )
  }
}
