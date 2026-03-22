import { chromium } from '@playwright/test'
import { spawn } from 'child_process'
import { mkdirSync } from 'fs'

const PORT = 4173
const BASE = `http://localhost:${PORT}`
const OUT_DIR = 'screenshots'

const devices = [
  { name: 'iphone-14', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
  { name: 'desktop-1440', width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false },
]

const allPages = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects/' },
  { name: 'project-detail', path: '/projects/uci-phi-psi/' },
]

// Filter pages by CLI args (e.g. `npm run screenshots -- home detail`)
const args = process.argv.slice(2)
const pages = args.length
  ? allPages.filter((p) => args.includes(p.name))
  : allPages

if (pages.length === 0) {
  console.error(`No matching pages. Available: ${allPages.map((p) => p.name).join(', ')}`)
  process.exit(1)
}

mkdirSync(OUT_DIR, { recursive: true })

// Start static file server
const server = spawn('npx', ['serve', 'out', '-l', String(PORT), '--no-clipboard'], {
  stdio: 'pipe',
})

// Wait for server to start
await new Promise((r) => setTimeout(r, 2000))

try {
  const browser = await chromium.launch()

  for (const device of devices) {
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: device.deviceScaleFactor,
      isMobile: device.isMobile,
    })

    for (const page of pages) {
      const p = await context.newPage()
      await p.goto(`${BASE}${page.path}`, { waitUntil: 'networkidle' })
      // Wait for animations
      await p.waitForTimeout(1500)

      const filename = `${OUT_DIR}/${device.name}-${page.name}.png`
      await p.screenshot({ path: filename, fullPage: true })
      console.log(`✓ ${filename}`)
      await p.close()
    }

    await context.close()
  }

  await browser.close()
} finally {
  server.kill()
}

console.log('\nDone! Screenshots saved to ./' + OUT_DIR)
