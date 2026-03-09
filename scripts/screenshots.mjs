import { chromium, webkit } from '@playwright/test'
import { execSync, spawn } from 'child_process'
import { mkdirSync } from 'fs'

const PORT = 4173
const BASE = `http://localhost:${PORT}`
const OUT_DIR = 'screenshots'

const devices = [
  { name: 'iphone-14', width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
  { name: 'iphone-se', width: 375, height: 667, deviceScaleFactor: 2, isMobile: true },
  { name: 'ipad', width: 768, height: 1024, deviceScaleFactor: 2, isMobile: true },
  { name: 'desktop-1440', width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false },
]

const pages = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects/' },
  { name: 'project-detail', path: '/projects/uci-phi-psi/' },
]

mkdirSync(OUT_DIR, { recursive: true })

// Start static file server
const server = spawn('npx', ['serve', 'out', '-l', String(PORT), '--no-clipboard'], {
  stdio: 'pipe',
})

// Wait for server to start
await new Promise((r) => setTimeout(r, 2000))

const browsers = [
  { name: 'chromium', engine: chromium },
  { name: 'webkit', engine: webkit },
]

try {
  for (const { name: browserName, engine } of browsers) {
    const browser = await engine.launch()

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

        const filename = `${OUT_DIR}/${browserName}-${device.name}-${page.name}.png`
        await p.screenshot({ path: filename, fullPage: true })
        console.log(`✓ ${filename}`)
        await p.close()
      }

      await context.close()
    }

    await browser.close()
  }
} finally {
  server.kill()
}

console.log('\nDone! Screenshots saved to ./' + OUT_DIR)
