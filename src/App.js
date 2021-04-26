import React, { Component } from "react";
import "./App.css";
import 'fontsource-roboto';
import Routes from "./routes";




class App extends Component {
  render() {
    return (
        <div>
          <Routes/>
        </div>
    );
  }
}


export default App;
//<Route path="/sobre-empresa" component={Pagamento} />