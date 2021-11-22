import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import AddUser from "./components/addUser";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/"><Redirect to="/home"/></Route>
        <Route exact path="/home"><Home/></Route>
        <Route exact path="/add-user"> <AddUser /></Route>
        <Route exact path="/about" ><About /></Route>
      </Switch>
    </Layout>
  );
};

export default App;
