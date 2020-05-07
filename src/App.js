import React, { Component, Text, Profiler, Image } from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FotoComponent from "react-rounded-image";
import foodImg from "./images/food.svg";
import NotificationComponent from "./components/notificações"
import socketIOClient from "socket.io-client";

import "./App.css";
import { Redirect } from "react-router-dom";

const clientId =
  "375724869410-99hjliurljtjoechfedc17latmlh3qus.apps.googleusercontent.com";

const success = (response) => {
  var profile = response.getBasicProfile();
  const socket = socketIOClient("http://localhost:4001");
  socket.emit('storeUserInfo', { matricula: "209075", nome: profile.getName(), email: profile.getEmail(), nivel: 0, supervisor: 762519 });

  const node = document.querySelectorAll("#edit")[0];

  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
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

  var notifications = <NotificationComponent />;

  //ReactDOM.render(element, document.getElementById('root'));
  ReactDOM.render(profile.getName(), document.getElementById("pLoginNome"));
  ReactDOM.render(notifications, document.getElementById("body"));
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

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };

    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((posts) => this.setState({ posts }));
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.posts.map((post) => (
            <li>
              {" "}
              <h2>{post.nome}</h2> <p>{post.email}</p>{" "}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: 0,
      endpoint: "http://127.0.0.1:4001"
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

        <Posts />
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
        <center><div className="pleaseLogin" height="100" width="100"></div></center>
        <br></br>
        Faça o login para continuar
      </div>
    );
  }
}
