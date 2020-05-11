import React, { Component } from "react";
import "./main.css";

class SupervisorDashboard extends Component {
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
        className="puff-in-center"
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "200px",
          color: "#000",
        }}
      >
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <br></br>
        <br></br>
        Olá, você é um Supervisor.
      </div>
    );
  }
}

export default SupervisorDashboard;
