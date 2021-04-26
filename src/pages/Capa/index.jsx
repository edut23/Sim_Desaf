import React from "react";
import { Button, Typography, Container} from "@material-ui/core";
import { Link } from "react-router-dom";
import './index.css'

function Capa() {
    
    return (
      <Container>
      <Typography variant="h3" component="h1" align="center" >Desafio Simulado</Typography>
      <h1>Simulado Online</h1>
      <h2>Valor: R$80,00</h2>
        <Link to = "/forms">
        <Button variant="contained" color="primary" align="center">
          Cadastrar
        </Button>
        </Link>
      </Container>
    );
  }
  
  export default Capa