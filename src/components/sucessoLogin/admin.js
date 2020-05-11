import React, { Component } from "react";
import { Notifications, UsersOnline } from "./admin/alertas";
import "./main.css";

class AdminDashboard extends Component {
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
          marginTop: "0px",
          color: "#000",
        }}
      >
        <UsersOnline />
        <Notifications />
      </div>
    );
  }
}

export default AdminDashboard;
