declare module '*.hbs' {
  const template: <T>(context?: T) => string

  export default template
}
