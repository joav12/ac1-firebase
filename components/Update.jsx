//importar as configurações do firebase
import { app, database } from '../services/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

//  +----------------+
//  | update comceço |
//  +----------------+
async function show(id){
  
  console.log(idc)
  const [ID, setID] = useState(0)
  const [contatoUnico, setContatoUnico] = useState({})
  const [mostrar, setMostrar] = useState(false)
  
  //hooks
  const[nome, setNome] = useState('')
  const[email, setEmail] = useState('')
  const[telefone, setTelefone] = useState('')
  const[mensagem, setMensagem] = useState('')



  setID = (id)
  console.log(ID)
  if(ID != ""){
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

  useEffect(()=>{
    show()
  },[ID])

  return(
    <>
       {mostrar ?(
        <div>
          <h3 className="text-center">Alterar</h3>
          <input type="text" placeholder="Nome" className="form-control" required onChange={event=>setNome(event.target.value)} value={nome}/> 
          <input type="email" placeholder="Email" className="form-control" required onChange={event=>setEmail(event.target.value)} value={email}/> 
          <input type="tel" placeholder="Telefone" className="form-control" required onChange={event=>setTelefone(event.target.value)} value={telefone}/> 
          <textarea placeholder="Mensagem" className="form-control" required onChange={event=>setMensagem(event.target.value)} value={mensagem}/>
          <input type="submit" value="Salconst" onClick={()=>btnAlterar(contatoUnico.id)} className="btn btn-outline-dark form-control"/>
          <input type="button" value="Cancelar" onClick={btnCancelar} className="btn btn-outline-danger form-control"/>
        </div>
      ):(
        <></>
      )}
    </>
  )
}


export { show }

//  +------------+
//  | update fim |
//  +------------+