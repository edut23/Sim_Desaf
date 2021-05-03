import React, {useState} from 'react';
import { Button, Typography} from "@material-ui/core";
import pagarme from 'pagarme'
import {useSelector} from 'react-redux'
import {selector} from '../selector'
import 'react-credit-cards/es/styles-compiled.css';
import Paycheck from '../PaycheckBol'


function Boleto(){
  fetch('http://localhost:3000', {
    mode: 'no-cors',
    method: "post",
    headers: {
         "Content-Type": "application/json"
    },
    body: JSON.stringify()
})
  const nome = useSelector(selector.getNome);
  const cpf = useSelector(selector.getCpf);
  const email = useSelector(selector.getEmail);
  const [okpay, setOkpay] = useState(false);

  function pagar(){
    alert("Realizando pagamento, aguarde.")
    pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })
        .then(client => client.transactions.create({
            "amount": 8000,
            "payment_method": 'boleto',
            "postback_url": 'http://requestb.in/pkt7pgpk',
            "customer": {
            "type": 'individual',
            "country": 'br',
            "name": nome,
            "email": email,
            "documents": [
                {
                "type": 'cpf',
                "number": cpf,
                },
            ],
            },
        }))
        .then(transaction => get(transaction.status))


      

      function get(info){
        const id = info
        if(id === "processing"){
          setOkpay(okpay => !okpay) 
          alert("Boleto gerado. ", id)
        }
      }
    }
    
    
    return(
        <form
      onSubmialidot={(event) => {
        event.preventDefault();
      }}>
        <br/>
        <Typography variant="h3" component="h1" align="left" >Pagamento através de boleto</Typography>
        <br/>
  <form id="payment_form">
      <Button variant="contained" color="primary" onClick = {pagar}>Pagar</Button>
      
  </form>
  <br/>{okpay &&
      <Paycheck/>}
  </form>
    );
};

export default Boleto;