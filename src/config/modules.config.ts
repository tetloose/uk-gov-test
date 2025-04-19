export const modules = {
  MemberCard: () =>
    import(
      /* webpackChunkName: 'member-card' */ '@components/member-card/member-card.component'
    )
}
