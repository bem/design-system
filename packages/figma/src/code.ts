import { updatePaintStyles } from './lib/updatePaintStyles'

figma.showUI(__html__, {
  width: 600,
  height: 600,
})

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'create-paint-styles':
      updatePaintStyles(msg.payload.colors)
      break

    case 'remove-paint-styles':
      figma.getLocalPaintStyles().forEach((style) => style.remove())
      break
  }
}
