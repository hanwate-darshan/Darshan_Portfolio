'use client'

export async function downloadProjectZip(): Promise<boolean> {
  try {
    // 1. Try POST base64 JSON response (never intercepted by navigation auth proxy)
    const res = await fetch('/api/download-zip', {
      method: 'POST',
      credentials: 'include',
    })

    if (res.ok) {
      const json = await res.json()
      if (json.base64) {
        const binaryString = window.atob(json.base64)
        const len = binaryString.length
        const bytes = new Uint8Array(len)
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        const blob = new Blob([bytes], { type: 'application/zip' })
        triggerBlobDownload(blob, json.filename || 'nextjs-portfolio-project.zip')
        return true
      }
    }

    // 2. Fallback: fetch the static zip inside /public via fetch + credentials
    const staticRes = await fetch('/nextjs-portfolio-project.zip', {
      credentials: 'include',
    })
    if (staticRes.ok) {
      const blob = await staticRes.blob()
      triggerBlobDownload(blob, 'nextjs-portfolio-project.zip')
      return true
    }

    return false
  } catch {
    return false
  }
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 5000)
}
