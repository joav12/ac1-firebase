import { database } from '../services/firebase'
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'
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

  //Função do botão excluir
  const deleteBtn = (id) =>{
    const documento = doc(database,"contato",id)
    deleteDoc(documento)
    .then(()=>{
      read()
    })
  }  
  
        return(
          <>
          
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
               <input type="button" value="Alterar" className="btn btn-outline-warning form-control" />
               <input type="button" onClick={()=>deleteBtn(lista.id)} value="Excluir" className="btn btn-outline-danger form-control" />
              </div>
            </div>
          </div>
          
               )
        
      })}
   </>
        )
}
