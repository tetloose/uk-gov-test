import '../styles/app.scss'

class Main {
  constructor() {
    console.log(process.env.API || 'Add API url in .env')
  }
}

new Main()
