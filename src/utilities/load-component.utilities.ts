import { modules } from '@config/modules.config'
import { logger } from '@utilities/logger.utilities'

export function loadComponent(target: HTMLElement, chunk: string): void {
  Object.entries(modules).forEach(
    ([key, value]) =>
      key === chunk &&
      value()
        .then((res: { default: (arg0: HTMLElement) => void }) => {
          res.default(target)
        })
        .catch((error: string) => logger(error))
  )
}
