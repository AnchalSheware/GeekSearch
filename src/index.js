import React from "react";
import ReactDom from "react-dom";
import Dashboard from "./Component/Dashboard";
import ExtraDetail from "./Component/Exco/ExtraDetail";



const App = () => {
    return(
      <div>
        <Dashboard />
        </div>
      )
}
ReactDom.render(<App />,document.getElementById("root"))