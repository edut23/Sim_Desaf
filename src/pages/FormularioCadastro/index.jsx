import React, { useState} from "react";
import { TextField, Button, Typography, Container} from "@material-ui/core";
import pagarme from 'pagarme'
import {useSelector, useDispatch} from 'react-redux'
import {selector} from '../selector'
import { cpf } from 'cpf-cnpj-validator'; 
import { mask as masker, unMask } from "remask";
import SobreEmpresa from '../CheckoutCard'
import Boleto from "../CheckoutBol";



function FormularioCadastro({aoEnviar, validarRG}) {
  const [nome, setNome] = useState("");
  const [CPF, setCPF] = useState("");
  const [email, setEmail] = useState("")
  const [erros, setErros] = useState({rg:{valido:true, texto:""}});
  const valor2 = useSelector(selector.getNome);
  const valor3 = useSelector(selector.getCpf);
  const dispatch = useDispatch();
  const [card, setCard] = useState(false);
  const [bol, setBol] = useState(false);


  function abridorC(){
    if(cpf.isValid(CPF) === true)
    setCard(card => !card) 
    setBol(bol => false)       
}
  function abridorB(){
    if(cpf.isValid(CPF) === true)
    setBol(bol => !bol)
    setCard(card => false)        
}

  function salva() {
    dispatch({type: 'CLICK_UPDATE_VALUE', value: nome, value2: CPF, value3: email})
  } 

  pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })

  

  function validarCPF(CPF){
    if(cpf.isValid(CPF) === true){ 
      salva()
      return {valido:true, texto:""}
    }else{
      return {valido:false, texto:"CPF Incorreto."}
    }
  }
  

  
  return (
    <Container>
    <br/>
    <Typography variant="h3" component="h1" align="left" >Formulário de cadastro</Typography>
    
    <br/>
    Nome:
      <TextField
        value={nome}
        onChange={(event) => {
          setNome(event.target.value);
        }}
        id="nome"
        label="Nome completo"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <br/>
      
      Email:
      <TextField
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        id="email"
        type = "email"
        label="Email (@gmail.com, outlook.com...)"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <br/>
      
      CPF
      <TextField
        value={masker(CPF,["999.999.999-99"])}
        onChange={(event) => {
          setCPF(unMask(event.target.value));
          console.log( valor2, CPF, event.target.value)
        }}

        onBlur={(event)=>{
          const ehValido = validarCPF(CPF);
          setErros({rg:ehValido})
          console.log(ehValido, valor2, valor3)
        }}
        error={!erros.rg.valido}
        helperText={erros.rg.texto}
        label = "CPF (Apenas números)"
        id="cpf"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <br/>
      <Button variant="contained" color="primary" onClick = {abridorC}>Cartão de crédito</Button>
      <Button variant="contained" color="primary" onClick = {abridorB}>Boleto</Button>
      {card && <div>
      <SobreEmpresa/>
      </div>}
      {bol && <div>
      <Boleto/>
      </div>}
    </Container>
  );
}

export default FormularioCadastro

/*<form
      onSubmialidot={(event) => {
        event.preventDefault();
        validarCPF({CPF});
      }}
    >*/
