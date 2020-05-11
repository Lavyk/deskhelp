import React from "react";
import alertImg from "../images/atencao.svg";

const ErroLogin = () => (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: "200px",
      color: "#c43800",
    }}
  >
    <img src={alertImg} alt="food" height="100" width="100" />
    <br></br>
    Não conseguimos encontrar seu perfil na nossa plataforma!<br></br>
    Solicite acesso ao seu supervisor.
  </div>
);

export default ErroLogin;
