import React, { useState } from "react";
import { Button, Typography, Container} from "@material-ui/core";
import './index.css'
import FormularioCadastro from "../FormularioCadastro";
function Capa() {

    const [forms, setForms] = useState(false);  

    
    function abridorF(){
        setForms(forms => !forms)        
    }
    

    
    return (
      <Container>
      <Typography variant="h3" component="h1" align="center" >Desafio Simulado</Typography>
      <h3>Simulado Online</h3>
      <h4>Valor: R$80,00</h4>
      <Button variant="contained" color="primary" text-align="right" onClick = {abridorF}>Inscreva-se</Button>
      <br/>
      {forms &&<div>
      <FormularioCadastro/>
      </div>}
      </Container>
    );
  }
  
  export default Capa