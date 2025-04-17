import { components } from '@utilities/components.utilities'
import { loadComponent } from '@utilities/load-component.utilities'
import { observer } from '@utilities/observer.utilities'
import '@styles/app.scss'

components?.forEach((component) => {
  const { dataset } = component
  const { module, preload } = dataset

  if (preload && module) {
    loadComponent(component, module)
  } else {
    observer.observe(component)
  }
})
