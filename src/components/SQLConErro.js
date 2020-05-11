import React from "react";
import bdError from "../images/bderror.svg";

const SQLConErro = () => (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: "200px",
      color: "#c43800",
    }}
  >
    <img src={bdError} alt="food" height="100" width="100" />
    <br></br>
    Por algum motivo não conseguimos conectar ao servidor!<br></br>
    Informe ao seu supervisor.
  </div>
);

export default SQLConErro;
