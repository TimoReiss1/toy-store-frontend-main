import React, {useState, Component, useEffect, FC} from 'react';
import logo from './logoAsThree.svg';
import './App.css';
import List from "./components/List";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddToList from './components/AddToList';
import LoginForm from './components/LoginForm';
import * as ReactDOM from 'react-dom';

export interface IState {
    toys: {
        name: string
        size: string
        speed: number
        distanceTraveled: number
        amountOfWheels? : number
        type: string
        url?: string
        note?: string
    }[]
}

function App() {


    const [toys, setToys] = useState<IState["toys"]>([

    ])

/*
Leeres Array -> Init 1x

    useEffect( () => {
        async function fetchData(){
            try{
                const response = await fetch('http://localhost:8080/main/toys');
                const toysFromAPI = await response.json();
                setToys(toysFromAPI);
            }catch(error){
                console.error(error);
            }
        }
        fetchData()
    })

 */
    /*
  return (
      <div className="App">
          <img src={logo} alt="Logo" style={{ width: '350px', height: '350px' }} />
        <h1>.:EOS:. Toy Store</h1>
          <h2>Toys in the inventory</h2>
        <List toys={toys}/>
        <AddToList setToys={setToys} toys={toys}/>
      </div>
  );
 */
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AddToList setToys={setToys} toys={toys} /> } />
                <Route path="login" element={<LoginForm onSubmit={(username, password) => console.log(username,password)}/> }/>
            </Routes>
        </BrowserRouter>
    );


}

export default App;
