import React, { useState } from 'react'
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
        distance: "",
        wheels : "",
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

    /*
        "name": "Im a Car too!",
        "size": "XL",
        "speed": "4",
        "distance": "500",
        "wheels": "2",
        "type": "car"

     */
    const handleClick = async () => {
        if (!input.type || !input.name || !input.size) return
        setToys([
            ...toys,
            {
                name: input.name,
                size: input.size,
                speed: parseInt(input.speed),
                distance: parseInt(input.distance),
                wheels: parseInt(input.wheels),
                type: input.type,
                url: input.url,
                note: input.note
            }
        ])
        const response = await fetch("http://localhost:8080/main/toys/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: input.name,
                size: input.size,
                speed: input.speed,
                distance: input.distance,
                wheels: parseInt(input.wheels),
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
            distance: "",
            wheels: "",
            type: "",
            url: "",
            note: ""
        })
    }


    return (

        <div className="AddToList">
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
                <option value="S">S</option>
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
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="distance"
                value={input.distance}
                placeholder="Distance"
            />

            <input
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="wheels"
                value={input.wheels}
                placeholder="Number of wheels"
            />


            <select
                value={input.type}
                onChange={handleChange}
                className="AddToList-input"
                name="type"
            >
                <option value="car">Car</option>
                <option value="truck">Truck</option>
                <option value="plane">Airplane</option>
                <option value="boat">Boat</option>
            </select>

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