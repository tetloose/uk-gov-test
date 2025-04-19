export class ComponentClass {
  module: HTMLElement

  constructor(module: HTMLElement) {
    this.module = module
  }

  render(html: string) {
    const { module } = this

    if (!module) return

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const rendered = doc.body.firstElementChild as HTMLElement

    module.replaceWith(rendered)

    if (!rendered) return

    this.module = rendered
  }
}
