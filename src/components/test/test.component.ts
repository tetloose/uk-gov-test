import { ComponentClass } from '@utilities/component-class.utilities'

class Test extends ComponentClass {
  constructor(module: HTMLElement) {
    super(module)

    this.addEventListeners()
  }

  addEventListeners() {
    const { module } = this

    if (!module) return

    module.addEventListener('click', (e: Event) => {
      const { target } = e

      if (target instanceof HTMLElement) {
        console.log(target)
      }
    })
  }
}

export default (module: HTMLElement) => new Test(module)
