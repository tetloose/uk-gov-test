import { ComponentClass } from '@utilities/component-class.utilities'
import type { CardData } from './card.types'
import template from './index.template.hbs'
import './card.styles.scss'

class Card extends ComponentClass {
  constructor(module: HTMLElement) {
    super(module)

    this.render()
  }

  render() {
    const { module } = this

    if (!module) return

    const data: CardData = {
      image: 'https://avatar.iran.liara.run/public/42',
      party: 'Conservative',
      name: 'Bim Afolami',
      constituency: 'Hitchen and Harpenden',
      status: 'No Longer Serving'
    }

    module.innerHTML = template<CardData>(data)
  }
}

export default (module: HTMLElement) => new Card(module)
