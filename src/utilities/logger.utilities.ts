import { AppendNode } from '@utilities/append-node.utilities'

export function logger(error: string): void {
  const body = document.querySelector('body') as HTMLElement
  const element = `
    <div style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 999; padding: 1rem; background-color: #ff69b4; color: #000; font-size: 1rem; text-align: center;">
      ${error ? error : ''}
    </div>
  `

  new AppendNode(body, element)
}
