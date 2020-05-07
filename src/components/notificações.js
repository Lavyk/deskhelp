import React from "react";
import alertImg from "../images/atencao.svg";

const NotificationComponent = () => (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      marginTop: "200px",
      color: "#d2d2d2",
    }}
  >
    <img src={alertImg} alt="food" height="100" width="100" />
    <br></br>
    Já fez login, agora aparece todas as notificações bem legal.
  </div>
);

export default NotificationComponent;
