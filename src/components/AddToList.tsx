import React, {useEffect, useState} from 'react'
import { IState as Props } from "../App";

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    const handleSearch = async () => {
        const response = await fetch('http://localhost:8080/main/toys');
        const toys = await response.json();
        const filteredToys = toys.filter((toy: { type: string; }) => toy.type === searchQuery);
        setToys(filteredToys);
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

        let amountOfWheels = parseInt(input.amountOfWheels);
        if (input.type !== 'car' && input.type !== 'Truck') {
            amountOfWheels = 0;
        }

        const response = await fetch("http://localhost:8080/main/toys/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: input.name,
                size: input.size,
                speed: parseInt(input.speed),
                distanceTraveled: parseInt(input.distanceTraveled),
                amountOfWheels: amountOfWheels,
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

            <input type="text" placeholder="Search by type" onChange={handleSearchChange} value={searchQuery} />
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
                name="distance"
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
                    name="wheels"
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