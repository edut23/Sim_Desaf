//Importar as dependências
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//Importar as páginas
import FormularioCadastro from '../pages/FormularioCadastro';
import Pagamento from '../pages/CheckoutCard';
import Capa from '../pages/Capa'

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Capa} />
                <Route path="/Forms" component={FormularioCadastro} />
                <Route path="/cardpay" component={Pagamento} />
            </Switch>        
        </BrowserRouter>
    );
};

export default Routes;