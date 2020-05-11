import React, { Component } from "react";
import winner from "../images/winner.svg";
import ReactDOM from "react-dom";
import AdminDashboard from "./sucessoLogin/admin";
import AtendenteDashboard from "./sucessoLogin/atendente";
import SupervisorDashboard from "./sucessoLogin/supervisor";

import "./sucessoLogin/main.css";


class SucessoLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };
  }

  render() {
    const timer = setTimeout(() => {
      ReactDOM.render(
        <LoadDashboard user={this.props.user} />,
        document.getElementById("body")
      );
    }, 5000);

    return ReactDOM.render(
      <BemVindoLogin user={this.props.user} />,
      document.getElementById("body")
    );
  }
}

export default SucessoLogin;

class BemVindoLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };
  }

  render() {
    const user = this.props.user;
    return (
      <div
        className="slide-in-blurred-left"
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px",
          color: "#000",
        }}
      >

        <div
          className="slide-in-blurred-left"
          style={{
            marginTop: "200px",
          }}
        >
          <img src={winner} alt="food" height="100" width="100" />
          <br></br>
          <br></br>
        Seja bem vindo, {user.nome}, estamos logado! <br></br>
        Vamos ao trabalho.
          </div>
      </div>
    );
  }
}

class LoadDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };
  }

  render() {
    const user = this.props.user;

    const timer = setTimeout(() => {
      var dashboard;
      switch (user.cargo) {
        case 0:
          dashboard = <AdminDashboard user={this.props.user} />;
          break;

        case 1:
          dashboard = <AtendenteDashboard user={this.props.user} />;
          break;

        case 2:
          dashboard = <SupervisorDashboard user={this.props.user} />;
          break;
      }

      ReactDOM.render(dashboard, document.getElementById("body"));

    }, 5000);

    return (
      <div
        className="slide-in-blurred-left"
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "200px",
          color: "#000",
        }}
      >
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <br></br>
        <br></br>
        Buscando as informações, só um momento.
      </div>
    );
  }
}
