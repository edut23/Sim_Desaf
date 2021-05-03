import React from "react";
import { Typography, Container} from "@material-ui/core";
import {useSelector} from 'react-redux'
import {selector} from '../selector'
import { mask as masker} from "remask";

function Paycheck() {
    const nome = useSelector(selector.getNome);
    const cpf = useSelector(selector.getCpf);
    const email = useSelector(selector.getEmail);
    const paycheck = "Cartão de crédito"
    
    return (
      <Container>
      <Typography variant="h3" component="h1" align="center" >Inscrição realizada com sucesso.</Typography>
      <h1>Nome: {nome}</h1>
      <h2>CPF: {masker(cpf,["999.999.999-99"])}</h2>
      <h2>Email: {email}</h2>
      <h2>Valor: R$80,00</h2>
      <h2>Método de pagamento: {paycheck}</h2>
      </Container>
    );
  }
  
  export default Paycheck