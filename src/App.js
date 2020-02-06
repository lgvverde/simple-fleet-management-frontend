import React from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import RouteList from './pages/routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="mainHeader">
        <Header />
        <Menu/>
      </div>
        <section id="mainContainer">  
          <RouteList />
        </section>
    </div>
  );
}

export default App;
