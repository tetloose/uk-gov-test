import { loadComponent } from '@utilities/load-component.utilities'

export const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      const { target } = entry

      if (target instanceof HTMLElement && entry.isIntersecting) {
        const { dataset } = target
        const { module } = dataset

        if (module) loadComponent(target, module)

        observer.unobserve(target)
      }
    })
  },
  {
    root: null,
    rootMargin: '300px 0px',
    threshold: 0.01
  }
)
