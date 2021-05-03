import React, {useState} from 'react';
import { TextField, Button, Typography} from "@material-ui/core";
import pagarme from 'pagarme'
import {useSelector} from 'react-redux'
import {selector} from '../selector'
import { mask as masker, unMask } from "remask";
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import Paycheck from '../PaycheckCard'
import ReactLoading from 'react-loading';


function SobreEmpresa(){
  /*fetch('http://localhost:3000', {
    mode: 'no-cors',
    method: "post",
    headers: {
         "Content-Type": "application/json"
    },
    body: JSON.stringify()
})*/

  const [card_number, setNumb] = useState("");
  const [Nome_card, setNome_card] = useState("");
  const [Exp, setData] = useState("");
  const [CVV, setCVV] = useState("");
  const nome = useSelector(selector.getNome);
  const cpf = useSelector(selector.getCpf);
  const email = useSelector(selector.getEmail);
  const [focused, setFocused] = useState("");
  const [okpay, setOkpay] = useState(false);
  const [loading, setLoading] = useState(false);


  function retCard(card_number){
    if(card_number !== undefined){
      if(card_number.length > 15){
        setNumb(card_number.slice(0, -1))
        console.log(card_number)
      }
    }
  }

  function retCVV(CVV){
    if(CVV !== undefined){
      if(CVV.length > 2){
        setCVV(CVV.slice(0, -1))
        console.log(CVV)
      }
    }
  }
  
  function retData(Exp){
    if(Exp !== undefined){
      if(Exp.length > 3){
        setData(Exp.slice(0, -1))
        console.log(Exp)
      }
    }
  }

 /*function loader(){
    return [
      loading ? <ReactLoading type= "spin" color= "blue" height={667} width={375} /> : null,
      () => setLoading(true),
      () => setLoading(false),
      console.log(loading)
    ]
  }*/



  function pagar(){
    setLoading(true)
    pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })
      .then(client => client.transactions.create({
        "amount": 8000,
        "card_number": card_number,
        "card_cvv": CVV,
        "card_expiration_date": Exp,  
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
      .then(transaction => {get(transaction.status); setLoading(false)})
      .catch(e => {alert("Pagamento não realizado, verifique seus dados."); setLoading(false)}) 

      

      function get(info){
        const id = info
        if(id === "paid"){
          setOkpay(okpay => !okpay) 
        }
      }
      
      console.log(card_number, CVV, Exp, Nome_card)

    }

    function changeFocus(e){
      setFocused(e.target.id)
    }
    
    
    return(
        <form
      onSubmialidot={(event) => {
        event.preventDefault();
      }}>
        <br/>
        <Typography variant="h3" component="h1" align="left" >Dados do cartão</Typography>
        <br/>

        <Cards
          number={card_number}
          name={Nome_card}
          expiry={Exp}
          cvc={CVV}
          focused={focused}
        />
      <div id="form" autocomplete="on">
      {loading && <ReactLoading type= "spin" color= "blue" height={667} width={375} align="center" z-index = {1000} position = "absolute" />}
      Número do cartão: <TextField 
      value={masker(card_number, ["9999999999999999"])}
      onChange={(event) => {
        setNumb(event.target.value);
        retCard(card_number)
        console.log(card_number)
        }}
      onFocus={changeFocus}
      type="text" id="card_number" placeholder="Número" variant="outlined" margin="normal"  fullWidth/>
      <br/>
      Nome (como escrito no cartão): <TextField
      value={Nome_card}
      onChange={(event) => {
        setNome_card(event.target.value);
        console.log(Nome_card)
      }}
      onFocus={changeFocus}
      type="text" id="Nome_card" label="Nome" variant="outlined" margin="normal" fullWidth/>
      <br/>
      Data de expiração: <TextField
      value={masker(Exp,["99/99"])}
      onChange={(event) => {
        setData(unMask(event.target.value));
        retData(Exp)
        console.log( Exp, event.target.value)
      }}
      onFocus={changeFocus} 
      placeholder="Mês/Ano" id="Exp" variant="outlined" margin="normal" fullWidth/>
      <br/>
      Código de segurança: <TextField
      value={masker(CVV,["999"])}
      onChange={(event) => {
        setCVV(event.target.value);
        retCVV(CVV)
        console.log(card_number, Nome_card, CVV, Exp, nome, cpf)
      }}
      onFocus={changeFocus} 
      type="text" id="CVV" placeholder="CVV" variant="outlined" margin="normal" fullWidth/>
      <br/>
      <div id="field_errors">
      </div>
      <br/>
  </div>

  <form id="payment_form">
      <Button variant="contained" color="primary" onClick = {pagar}>Pagar</Button> 
  </form>
  <br/>{okpay &&
      <Paycheck/>}
  </form>
    );
};

export default SobreEmpresa;

//<Button variant="contained" color="primary" onClick = {abridorO}>Conferir dados</Button>