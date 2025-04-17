export class AppendNode {
  node: HTMLElement
  element: string

  constructor(node: HTMLElement, element: string) {
    this.node = node
    this.element = element

    this.init()
  }

  init(): void {
    this.node.innerHTML += this.element
  }
}
