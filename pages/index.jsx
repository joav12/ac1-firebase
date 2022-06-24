import Head from 'next/head'

//importar componentes
import Create from '../components/Create'
import Read from '../components/Read'

export default function Home() {
  return (
    <>
      <Head>
        <title>Crud simples com firestore</title>
      </Head>

      <main className="container">
        <div className="row">
          <div className="col-md">
            <Create />
          </div>
          <div className="col-md">
            <Read />
          </div>
        </div>
      </main>
    </>
  )
}
