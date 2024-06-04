import type { BytemdPlugin } from 'bytemd'
export default function savePlugin(callback: any): BytemdPlugin {
  return {
    actions: [
      {
        title: 'save',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z"></path></svg>', // 16x16 SVG icon
        handler: {
          type: 'action',
          click() {
            console.log('===save===')
            callback()
          },
        },
      },
    ],
  }
}