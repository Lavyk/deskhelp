import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FotoComponent from "react-rounded-image";
//import foodImg from "./images/food.svg";
import ErroLogin from "./components/erroLogin";
import SucessoLogin from "./components/sucessoLogin";
import SQLConErro from "./components/SQLConErro";
import socketIOClient from "socket.io-client";

import "./App.css";
//import { Redirect } from "react-router-dom";
//    packgeJson >> Script > "build": "react-scripts build",

const clientId =
  "375724869410-m6sdpotn10rujahtptrmtgma2kpisiij.apps.googleusercontent.com";

const success = (response) => {
  var profile = response.getBasicProfile();
  const socket = socketIOClient("http://192.168.1.5:4001");
  socket.emit("storeUserInfo", {
    email: profile.getEmail(),
  });

  var loginResult;
  socket.on("login result", function (data) {
    if (data.result === "sucessoDB") {
      const result = data.result;
      console.log(data.nome);
      const user = {
        matricula: data.matricula,
        nome: data.nome,
        email: data.email,
        cargo: data.cargo,
      };
      loginResult = <SucessoLogin user={user} />;
    } else if (data.result === "erroDB") {
      loginResult = <SQLConErro />;
    } else if (data.result === "nullUserDB") {
      loginResult = <ErroLogin />;
    }

    ReactDOM.render(loginResult, document.getElementById("body"));
  });
  //node.innerHTML = profile.getName();

  var img = (
    <FotoComponent
      image={profile.getImageUrl()}
      roundedColor="#ffffff"
      imageWidth="40"
      imageHeight="40"
      roundedSize="3"
    />
  );

  //ReactDOM.render(element, document.getElementById('root'));
  //ReactDOM.render(profile.getName(), document.getElementById("pLoginNome"));
  //ReactDOM.render(notifications, document.getElementById("body"));
  ReactDOM.render(img, document.getElementById("pLoginImg"));

  console.log(response); // eslint-disable-line
};

const error = (response) => {
  console.error(response); // eslint-disable-line
};

const loading = () => {
  console.log("loading"); // eslint-disable-line
};

const logout = () => {
  console.log("logout"); // eslint-disable-line
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: 0,
      endpoint: "http://127.0.0.1:4001",
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar className="nav-bgcolor" variant="dark">
          <Navbar.Brand href="#home" className="navFontColor">
            99 HelpDesk
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/*             <Nav className="mr-auto">
              <Nav.Link href="/" className="navFontColorMenu" active>Home</Nav.Link>
            </Nav> */}
          </Navbar.Collapse>

          <Nav>
            <div
              style={{
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <div
                id="pLoginNome"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "92%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            </div>
            <div id="pLoginImg">
              <GoogleLogin
                clientId={clientId}
                buttonText="Login com G Suite"
                onSuccess={success}
                onFailure={error}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />{" "}
            </div>
          </Nav>
        </Navbar>
        {/* <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} /> */}
        <div id="body">
          <LoginPlease />
        </div>
      </div>
    );
  }
}
export default App;

class LoginPlease extends React.Component {
  render() {
    return (
      <div
        style={{
          justifyContent: "center",
          marginTop: "200px",
          color: "#d2d2d2",
        }}
      >
        {/* <img src={foodImg} alt="food" height="100" width="100" className="pleaseLogin" /> */}
        <center>
          <div className="pleaseLogin" height="100" width="100"></div>
        </center>
        <br></br>
        Faça o login para continuar!
      </div>
    );
  }
}
