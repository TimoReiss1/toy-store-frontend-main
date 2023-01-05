import React, {useEffect, useState} from 'react'
import { IState as Props } from "../App";
import List from "./List";

interface IProps {
    setToys: React.Dispatch<React.SetStateAction<Props["toys"]>>
    toys: Props["toys"]
}


const AddToList: React.FC<IProps> = ({setToys, toys  }) => {

    const [input, setInput] = useState({
        name: "",
        size: "",
        speed: "",
        distanceTraveled: "",
        amountOfWheels : "",
        type: "",
        url: "",
        note: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { //Besser 3 mit oder, oder jedes seperat?
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchQuery(event.target.value);
    }

    const handleSearch = async () => {
        const response = await fetch('http://localhost:8080/main/toys');
        const toys = await response.json();
        const filteredToys = toys.filter((toy: { type: string; }) => toy.type === searchQuery);
        console.log(filteredToys)
        setToys(filteredToys)
    }

    /*
        "name": "Im a Car too!",
        "size": "XL",
        "speed": "4",
        "distance": "500",
        "wheels": "2",
        "type": "car"

     */
    async function handleClick() {
        if (!input.type || !input.name || !input.size || !input.distanceTraveled || !input.speed) return

        const response = await fetch("http://localhost:8080/main/toys/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: input.name,
                size: input.size,
                speed: parseInt(input.speed),
                distanceTraveled: input.distanceTraveled,
                amountOfWheels: input.amountOfWheels,
                type: input.type
            }),
        });
        const responseText = await response.text();
        if(response.ok){
            console.log(responseText)
            const response = await fetch('http://localhost:8080/main/toys');
            const toysFromAPI = await response.json();
            setToys(toysFromAPI);
        }
        //added without ; ??


        setInput({
            name: "",
            size: "",
            speed: "",
            distanceTraveled: "",
            amountOfWheels: "",
            type: "",
            url: "",
            note: ""
        })
    }

    return (
        <div className="AddToList">
            <h1>.:EOS:. Toy Store</h1>
            <List toys={toys}/>
            <select
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by type">
                <option value="">Select a Type</option>
                <option value="car">Car</option>
            </select>
            <button onClick={handleSearch}>Search</button>

            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="name"
                value={input.name}
                placeholder="Name"
            />
            <select
                value={input.size}
                onChange={handleChange}
                className="AddToList-input"
                name="size"
            >
                <option value="">Select a size</option>
                <option value="XS">XS</option>
                <option value="S">XS</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="speed"
                value={input.speed}
                placeholder="Speed"
            />
            <input
                value={input.distanceTraveled}
                onChange={handleChange}
                type="text"
                className="AddToList-input"
                name="distanceTraveled"
                placeholder="Distance"
            />

            <select
                value={input.type}
                onChange={handleChange}
                className="AddToList-input"
                name="type"
            >
                <option value="">Select Thing</option>
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="plane">Airplane</option>
                <option value="boat">Boat</option>
            </select>

            {input.type === 'car' &&
                <input
                    type="text"
                    onChange={handleChange}
                    className="AddToList-input"
                    name="amountOfWheels"
                    value={input.amountOfWheels}
                    placeholder="Number of wheels"
                />
            }

            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="url"
                value={input.url}
                placeholder="Image Url"
            />

            <textarea
                onChange={handleChange}
                className="AddToList-input"
                name="note"
                value={input.note}
                placeholder="Note"
            />

            <button
                onClick={handleClick}
                className="AddToList-btn"
            >
                Add to List
            </button>
        </div>
    )
}

export default AddToList

/*
****** Verifying my auth token *******
* async function verifyAuthToken() {
const response = await fetch('/verify-auth-token', {
headers: {
  Authorization: `Bearer ${authToken}`,
},
});
if (response.ok) {
// Token is valid
} else {
// Token is invalid
}
}


******Set Auth token after successfully logging in*****
async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
        email: email,
        password: password,
    }),
});
const data = await response.json();
setAuthToken(data.authToken);
}

******** Extract Cookie from Data ***************
*
*
useEffect(() => {
const authToken = getAuthTokenFromCookie();
setAuthToken(authToken);
}, []);
*
*
function getAuthTokenFromCookie(): string | null {
const cookies = document.cookie.split(';');
for (const cookie of cookies) {
const [name, value] = cookie.split('=');
if (name.trim() === 'authToken') {
  return value;
}
}
return null;
}


 */