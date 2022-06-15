//importar as configurações do firebase
import { app, database } from '../services/firebase'
import { collection, addDoc, GetDocs, getDocs, orderBy, query } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import read from './read'
import Head from 'next/head'

export default function Home() {
    
//definir a coleção 
const contato = collection(database,'contato')

  //hooks
  const [nome, SetNome]=useState('')
  const [email, SetEmail]=useState('')
  const [telefone, Settelefone]=useState('')
  const [mensagem, SetMensagem]=useState('')

  //creat
  const create = ()=>{
    addDoc(contato,{
      nome: nome,
      email: email,
      telefone: telefone,
      mensagem: mensagem

    }).then(()=>{
      SetNome('')
      SetEmail('')
      Settelefone('')
      SetMensagem('')
      window.location.reload()
    })
  }


    return (
        <>
       <h3 className="text-center">Cadastrar</h3><br />
    
            <input type="text" placeholder="Nome" className="form-control" required onChange={event=>SetNome(event.target.value)} value = {nome} /><br />
    
            <input type="email" placeholder="Email" className="form-control" required onChange={event=>SetEmail(event.target.value)} value = {email} /><br />
    
            <input type="tel" placeholder="Telefone" className="form-control" required onChange={event=>Settelefone(event.target.value)} value = {telefone} /><br />
    
            <textarea placeholder="Mensagem" className="form-control" required onChange={event=>SetMensagem(event.target.value)} value = {mensagem} ></textarea><br />
            
            <input type="submit" value="Salvar" className="btn btn-outline-dark form-control" onClick={create} />
           
        </>
      )
}
