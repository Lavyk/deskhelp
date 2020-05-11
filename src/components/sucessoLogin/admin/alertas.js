import React, { Component } from "react";
import "../main.css";

class Notifications extends Component {
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
                    marginLeft: 0,
                    marginTop: 0,
                    height: "100vh",
                    width: "20%",
                    backgroundColor: "#773399",
                    float: "left",
                    display: "inline-block"

                }}
            >
                <br></br>
                <br></br>
        Ué
            </div>
        );
    }
}


class UsersOnline extends Component {
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
                    marginLeft: 0,
                    marginTop: 0,
                    height: "100vh",
                    width: "15%",
                    backgroundColor: "#778899",
                    float: "left",
                    display: "inline-block"
                }}
            >
                <br></br>
                <br></br>
        Amiguinhos online
            </div>
        );
    }
}

export { Notifications, UsersOnline }