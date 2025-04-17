export const modules = {
  Test: () =>
    import(/* webpackChunkName: 'test' */ '@components/test/test.component')
}
