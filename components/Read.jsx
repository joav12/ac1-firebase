//importar as configurações do firebase
import { app, database } from '../services/firebase'
import { collection, deleteDoc, getDocs, orderBy, query, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

//definir a coleção
const contato = collection(database, 'contato')

export default function Create() {

  //read
  const [lista, setLista] = useState([])

  const read = () => {
  getDocs(query(contato, orderBy('nome')))
      .then((data) => {
          setLista(data.docs.map((item) => {
              return { ...item.data(), id:item.id }
          }))
      })
  }
    
  //mostrar os documentos ao atualizar a pagina 
  useEffect(() => {
      read()
  }, [])
 
 
  //update começo 
  const [ID, setID] = useState(null)
  const [contatoUnico, setContatoUnico] = useState({})
  const [mostrar, setMostrar] = useState(false)

  const[nome, setNome] = useState("")
  const[email, setEmail] = useState("")
  const[telefone, setTelefone] = useState("")
  const[mensagem, setMensagem] = useState("")

  const show = async(id)=>{
    setID(id)
    if(ID != null){
      const contatoSimples = doc(database,"contato",ID)
      const resultado = await getDoc(contatoSimples)
      setContatoUnico({...resultado.data(),id:resultado.id})
      setNome(contatoUnico.nome)
      setEmail(contatoUnico.email)
      setTelefone(contatoUnico.telefone)
      setMensagem(contatoUnico.mensagem)
    }
    if (mensagem != ""){
      setMostrar(true)
    }
  }
  useEffect(()=>{
    show()
  },[ID])

  const btnCancelar = ()=>{
    setMostrar(false)
    setNome("")
    setEmail("")
    setTelefone("")
    setMensagem("")
    setID(null)
  }

  const btnAlterar = (id)=>{
    const contatoShow = doc(database, "contato", id)
    updateDoc(contatoShow,{
      nome: nome,
      email: email,
      telefone: telefone,
      mensagem: mensagem
    }).then(()=>{
      setNome("")
      setEmail("")
      setTelefone("")
      setMensagem("")
      setID(null)
      read()
      setMostrar(false)
    })
  }


  //update fim 


  
  //Deletar inicio
  

  function deleteBtn(id){
    const documento = doc(database, "contato", id)
    deleteDoc(documento)
    .then(()=>{
    window.location.reload()
    })
  }

// Deletar Fim

  return (
      <>

      {mostrar ?(
        <div>
          <h3 className="text-center">Alterar</h3>
          <input type="text" placeholder="Nome" className="form-control" required onChange={event=>setNome(event.target.value)} value={nome}/> 
          <input type="email" placeholder="Email" className="form-control" required onChange={event=>setEmail(event.target.value)} value={email}/> 
          <input type="tel" placeholder="Telefone" className="form-control" required onChange={event=>setTelefone(event.target.value)} value={telefone}/> 
          <textarea placeholder="Mensagem" className="form-control" required onChange={event=>setMensagem(event.target.value)} value={mensagem}/>
          <input type="submit" value="Salvar" onClick={()=>btnAlterar(contatoUnico.id)} className="btn btn-outline-dark form-control"/>
          <input type="button" value="Cancelar" onClick={btnCancelar} className="btn btn-outline-danger form-control"/>
        </div>
      ):(
        <></>
      )}

        <h3 className="text-center">Exibir</h3>
          {lista.map((lista) => {
            return (
              <>
              <div className="card">
                <div className="card-header bg-dark text-light">
                    Nome: {lista.nome}
                </div>
                <div className="card-body bg-secondary text-light">
                    <p className="card-title">Id: {lista.id}</p>
                    <p className="card-subtitle">Email: {lista.email}</p>
                    <p className="card-subtitle">Telefone: {lista.telefone}</p>
                    <p className="card-subtitle text-info">Mensagem: {lista.mensagem}</p>
                </div>
                <div className="card-footer bg-dark">
                  <div className="input-group">
                    <input type="button" value="Alterar" onClick={()=>show(lista.id)} className="btn btn-outline-warning form-control" />
                    <input type="button" value="Excluir" onClick={()=>deleteBtn(lista.id)} className="btn btn-outline-danger form-control" />
                  </div>
                </div>
              </div>
              </>
            )
          })}
      </>
  )
}