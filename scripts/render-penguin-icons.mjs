import fs from "fs"
import path from "path"
import zlib from "zlib"
import { fileURLToPath } from "url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const sprite = JSON.parse(fs.readFileSync(path.join(root, "lib/penguin-sprite.json"), "utf8"))
const rows = sprite.rows
const palette = sprite.palette
const spriteWidth = rows[0].length
const spriteHeight = rows.length

for (const row of rows) {
  if (row.length !== spriteWidth) throw new Error(`Sprite row has ${row.length} cells: ${row}`)
}

function crc32(buffer) {
  let crc = ~0
  for (let index = 0; index < buffer.length; index += 1) {
    crc ^= buffer[index]
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
  }
  return ~crc >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const name = Buffer.from(type)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])))
  return Buffer.concat([length, name, data, crc])
}

function png(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height)
  for (let y = 0; y < height; y += 1) {
    const start = y * (width * 4 + 1)
    raw[start] = 0
    rgba.copy(raw, start + 1, y * width * 4, (y + 1) * width * 4)
  }
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8
  header[9] = 6
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

function hex(color) {
  const value = color.replace("#", "")
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16), 255]
}

const ice = [231, 243, 248, 255]

function draw(scale, canvas) {
  const offsetX = Math.floor((canvas - spriteWidth * scale) / 2)
  const offsetY = Math.floor((canvas - spriteHeight * scale) / 2)
  const rgba = Buffer.alloc(canvas * canvas * 4)
  for (let i = 0; i < canvas * canvas; i += 1) {
    rgba[i * 4] = ice[0]
    rgba[i * 4 + 1] = ice[1]
    rgba[i * 4 + 2] = ice[2]
    rgba[i * 4 + 3] = 255
  }
  rows.forEach((row, y) => {
    ;[...row].forEach((cell, x) => {
      if (cell === "." || !palette[cell]) return
      const color = hex(palette[cell])
      for (let py = 0; py < scale; py += 1) {
        for (let px = 0; px < scale; px += 1) {
          const cx = offsetX + x * scale + px
          const cy = offsetY + y * scale + py
          if (cx < 0 || cy < 0 || cx >= canvas || cy >= canvas) continue
          const index = (cy * canvas + cx) * 4
          rgba[index] = color[0]
          rgba[index + 1] = color[1]
          rgba[index + 2] = color[2]
          rgba[index + 3] = color[3]
        }
      }
    })
  })
  return rgba
}

function svg() {
  const rects = [`<rect width="${spriteWidth}" height="${spriteHeight}" fill="#e7f3f8"/>`]
  rows.forEach((row, y) => {
    ;[...row].forEach((cell, x) => {
      if (cell === "." || !palette[cell]) return
      rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${palette[cell]}"/>`)
    })
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${spriteWidth} ${spriteHeight}" shape-rendering="crispEdges">\n${rects.join("\n")}\n</svg>\n`
}

const appDir = path.join(root, "app")
fs.writeFileSync(path.join(appDir, "icon.svg"), svg())
fs.writeFileSync(path.join(appDir, "apple-icon.png"), png(180, 180, draw(8, 180)))
fs.writeFileSync("/tmp/penguin-preview.png", png(160, 160, draw(10, 160)))
console.log("wrote icon.svg, apple-icon.png, and /tmp/penguin-preview.png")
