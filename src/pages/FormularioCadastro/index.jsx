import React, { useState} from "react";
import { TextField, Button, Typography, Container} from "@material-ui/core";
import pagarme from 'pagarme'
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {selector} from '../selector'
import { cpf } from 'cpf-cnpj-validator'; 
import { mask as masker, unMask } from "remask";



function FormularioCadastro({aoEnviar, validarRG}) {
  const [nome, setNome] = useState("");
  const [CPF, setCPF] = useState("");
  const [email, setEmail] = useState("")
  const [erros, setErros] = useState({rg:{valido:true, texto:""}});
  const valor2 = useSelector(selector.getNome);
  const valor3 = useSelector(selector.getCpf);
  const dispatch = useDispatch();

  function salva() {
    dispatch({type: 'CLICK_UPDATE_VALUE', value: nome, value2: CPF, value3: email})
  } 

  pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })

  

  function validarCPF(CPF){
    if(cpf.isValid(CPF) === true){ 
      return {valido:true, texto:""}
    }else{
      return {valido:false, texto:"CPF Incorreto."}
    }
  }
  

  
  return (
    <Container>
    <Typography variant="h3" component="h1" align="center" >Formulário de cadastro</Typography>
    <form
      onSubmialidot={(event) => {
        event.preventDefault();
        validarCPF({CPF});
      }}
    >
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

      <Link to = "/cardpay" style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary" onClick = {salva()}>
        Cadastrar
      </Button>
      </Link>
    </form>
    </Container>
  );
}

export default FormularioCadastro

