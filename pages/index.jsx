import Head from 'next/head'
import Cadastrar from '../components/cadastrar'
import Read from '../components/read'


export default function Home() {
  return(
    <>
    
    <Head>

      <title>Crud simples com firestorm</title>

    </Head>
    
    <main className="container">

      <div className="row">

        <div className="col-lg">

            <Cadastrar/>

        </div>

        <div className="col-lg">

          <Read/>

        </div>

      </div>

    </main>

    </>
  )

}