import React, {useState, Component, useEffect} from 'react';
import logo from './logoAsThree.svg';
import './App.css';
import List from "./components/List";
import AddToList from './components/AddToList';

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



  return (
      <div className="App">
          <img src={logo} alt="Logo" style={{ width: '350px', height: '350px' }} />
        <h1>.:EOS:. Toy Store</h1>
          <h2>Toys in the inventory</h2>
        <List toys={toys}/>
        <AddToList setToys={setToys} toys={toys}/>
      </div>
  );
}

export default App;
