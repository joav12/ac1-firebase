import { database } from '../services/firebase'
import { collection, deleteDoc, doc, getDocs, orderBy, query, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

export default function read(){

    const contato = collection(database,'contato')

      //read
  const [lista,setLista] = useState([])
  const read = ()=>{
    getDocs(query(contato,orderBy('nome')))
    .then((data)=>{
      setLista(data.docs.map((item)=>{
        return{...item.data(),id:item.id} 
      }))
    })
  }

  useEffect(()=>{
    read()
  },[])

  //Rotina update 
  //Mostrar o contato selecionado
  const [ID,setID] = useState(null)
  const [contatoUnico,setContatoUnico] = useState({})
  const [mostrar,setMostrar] = useState(false)
  const [nome,setNome]= useState("")
  const [email,setEmail]= useState("")
  const [telefone,setTelefone]= useState("")
  const [mensagem,setMensagem]= useState("")

  const show = async(id)=>{
    setID(id)
    if(ID!=null){
      const contatoSimples = doc(database,"contato",ID)
      const resultado = await getDoc(contatoSimples)
      setContatoUnico({...resultado.data(),id:resultado.id})
      setNome(contatoUnico.nome)
      setEmail(contatoUnico.email)
      setTelefone(contatoUnico.telefone)
      setMensagem(contatoUnico.mensagem)
      setMostrar(true)
    }
  }
  useEffect(()=>{
    show()
  },[ID])

  //Função o botão excluir
  const deleteBtn = (id) =>{
    const documento = doc(database,"contato",id)
    deleteDoc(documento)
    .then(()=>{
      read()
    })
  }  
  
        return(
          <>
          {mostrar ?(
            <div>
              <h3 className="text-center">Alterar</h3>

              <input type="text" placeholder="Nome" className="form-control" required onChange={event=>SetNome(event.target.value)} value = {nome} /><br />
    
            <input type="email" placeholder="Email" className="form-control" required onChange={event=>SetEmail(event.target.value)} value = {email} /><br />
    
            <input type="tel" placeholder="Telefone" className="form-control" required onChange={event=>Settelefone(event.target.value)} value = {telefone} /><br />
    
            <textarea placeholder="Mensagem" className="form-control" required onChange={event=>SetMensagem(event.target.value)} value = {mensagem} ></textarea><br />
            
            <input type="submit" value="Salvar" className="btn btn-outline-dark form-control"/>
            </div>
          ):(
            <></>
          )}


                 <h3 className="text-center">Exibir</h3><br />
             {lista.map((lista)=>{
               return(
          <div className="card">
            <div className="card-header bg-dark text-light">
              {lista.nome}
            </div>
    
            <div className="card-body">
              <p className="card-subtitle">Email: {lista.email}</p>
              <p className="card-subtitle">Telefone: {lista.telefone}</p>
              <p className="card-text">Mensagem: {lista.mensagem}</p>
              <p className="card-text text-info">Id: {lista.id}</p>
            </div>
            <div className="card-footer">
              <div className="input-group">
               <input type="button" onClick={()=>show(lista.id)} value="Alterar" className="btn btn-outline-warning form-control" />
               <input type="button" onClick={()=>deleteBtn(lista.id)} value="Excluir" className="btn btn-outline-danger form-control" />
              </div>
            </div>
          </div>
          
               )
        
      })}
   </>
        )
}
