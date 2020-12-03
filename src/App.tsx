import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Space } from 'antd';
import { EditBook } from "./pages/EditBook";
import { Home } from "./pages/Home"; 

export default function App() {
  return (
    <Router >
      <div className="app">
        <nav className="nav">
            <Space size="large" >
              <Link to="/">Все книги</Link>
              <Link to="/editbook/new">Добавить книгу</Link>
            </Space>
        </nav>

        <Switch>
          <Route path="/editbook/:id">
            <EditBook/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


