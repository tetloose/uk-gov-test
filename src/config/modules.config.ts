export const modules = {
  Card: () =>
    import(/* webpackChunkName: 'card' */ '@components/card/card.component')
}
