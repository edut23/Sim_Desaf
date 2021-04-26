import React, {useState} from 'react';
import { TextField, Button, Typography, Container } from "@material-ui/core";
import pagarme from 'pagarme'
import {useSelector} from 'react-redux'
import {selector} from '../selector'


function SobreEmpresa(){
  fetch('http://localhost:3000', {
    mode: 'no-cors',
    method: "post",
    headers: {
         "Content-Type": "application/json"
    },
    body: JSON.stringify()
})

  const [card_number, setNumb] = useState("");
  const [Nome_card, setNome_card] = useState("");
  const [Exp, setData] = useState("");
  const [CVV, setCVV] = useState("");
  const nome = useSelector(selector.getNome);
  const cpf = useSelector(selector.getCpf);
  const email = useSelector(selector.getEmail);
  const ano = Exp.slice(2,4)
  const mes = Exp.slice(5,7)
  const fin = mes + ano
  

    

  function pagar(){
    pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })
      .then(client => client.transactions.create({
        "amount": 8000,
        "card_number": card_number,
        "card_cvv": CVV,
        "card_expiration_date": fin,  
        "card_holder_name": Nome_card,
        "customer": {
          "external_id": "#3311",
          "name": nome,
          "type": "individual",
          "country": "br",
          "email": email,
          "documents": [
            {
              "type": "cpf",
              "number": cpf
            }
          ],
          "phone_numbers": ["+5511999998888", "+5511888889999"],
          "birthday": "1965-01-01"
        },
        "billing": {
          "name": nome,
          "address": {
            "country": "br",
            "state": "sp",
            "city": "Cotia",
            "neighborhood": "Rio Cotia",
            "street": "Rua Matrix",
            "street_number": "9999",
            "zipcode": "06714360"
          }
        },
        "items": [
          {
            "id": "desaf-sim",
            "title": "Desafio",
            "unit_price": 8000,
            "quantity": 1,
            "tangible": true
          }
        ]
        
      }))
      .then(transaction => console.log(transaction))
      
      console.log(card_number, CVV, Exp, Nome_card)

    }
    
    
    return(
      <Container>
        <form
      onSubmialidot={(event) => {
        event.preventDefault();
      }}>
        <Typography variant="h3" component="h1" align="center" >Dados do cartão</Typography>
        <br/>
      <div id="form">
      Número do cartão: <TextField 
      value={card_number}
      onChange={(event) => {
        setNumb(event.target.value);
        }} type="text" id="card_number" label="Número" variant="outlined" margin="normal" fullWidth/>
      <br/>
      Nome (como escrito no cartão): <TextField
      value={Nome_card}
      onChange={(event) => {
        setNome_card(event.target.value);
      }} type="text" id="card_holder_name" label="Nome" variant="outlined" margin="normal" fullWidth/>
      <br/>
      Data de expiração: <TextField
      value={Exp}
      onChange={(event) => {
        setData(event.target.value);
        console.log(mes, ano, fin)
      }} type="month" id="card_expiration_month" variant="outlined" margin="normal" fullWidth/>
      <br/>
      Código de segurança: <TextField
      value={CVV}
      onChange={(event) => {
        setCVV(event.target.value);
        console.log(nome, cpf)
      }} type="text" id="card_cvv" label="CVV" variant="outlined" margin="normal" fullWidth/>
      <br/>
      <div id="field_errors">
      </div>
      <br/>
  </div>
  <form id="payment_form">
      <Button variant="contained" color="primary" onClick = {pagar}>Pagar</Button>
  </form>
  </form>
  </Container>
    );
};

export default SobreEmpresa;
