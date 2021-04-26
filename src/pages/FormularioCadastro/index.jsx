import React, { useState} from "react";
import { TextField, Button, Typography, Container} from "@material-ui/core";
import pagarme from 'pagarme'
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {selector} from '../selector'




function FormularioCadastro({aoEnviar, validarRG}) {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("")
  const [erros, setErros] = useState({rg:{valido:true, texto:""}});
  const valor2 = useSelector(selector.getNome);
  const valor3 = useSelector(selector.getCpf);
  const dispatch = useDispatch();

  function salva() {
    dispatch({type: 'CLICK_UPDATE_VALUE', value: nome, value2: cpf, value3: email})
  } 

  pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })

  

  function validarCPF(cpf){
    if(cpf.length !== 11){ 
      return {valido:false, texto:"CPF deve ter 11 digitos."}
    }else{
      return {valido:true, texto:""}
    }
  }
  

  
  return (
    <Container>
    <Typography variant="h3" component="h1" align="center" >Formulário de cadastro</Typography>
    <form
      onSubmialidot={(event) => {
        event.preventDefault();
        validarCPF({cpf});
      }}
    >
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

      <TextField
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        id="email"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <TextField
        value={cpf}
        onChange={(event) => {
          setCPF(event.target.value);
          console.log( valor2)
        }}

        onBlur={(event)=>{
          const ehValido = validarCPF(cpf);
          setErros({rg:ehValido})
          console.log(ehValido, valor2, valor3)
        }}
        error={!erros.rg.valido}
        helperText={erros.rg.texto}
        id="cpf"
        label="CPF"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <Link to = "/cardpay">
      <Button variant="contained" color="primary" onClick = {salva()}>
        Cadastrar
      </Button>
      </Link>
    </form>
    </Container>
  );
}

export default FormularioCadastro

