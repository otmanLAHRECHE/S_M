import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DashboardContent from "./components/app/Dashboard";
import PrivateRoute from "./components/common/private_route";
import SignInSide from "./components/accounts/login";
import Resultat from "./components/app/Resultat";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    
      <BrowserRouter>
            <Fragment>
              <div>
                <Routes>
                  <Route exact path="/" element={<PrivateRoute><DashboardContent/></PrivateRoute>} />
                  <Route exact path="/login" element={<SignInSide/>} /> 
                  <Route exact path="/bon_examen" element={<Resultat/>} /> 
                </Routes>
              </div>
            </Fragment>
        </BrowserRouter>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);