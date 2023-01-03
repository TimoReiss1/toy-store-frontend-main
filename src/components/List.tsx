import React from "react";
import { IState as Props } from "../App";

interface IProps {
    toys: Props["toys"]
}

const List: React.FC<IProps> = ({ toys }) => {
    const renderList = (): JSX.Element[] => {
        return toys.map(toy => {
            return (
                <li className="List">
                    <div className="List-header">
                        <img className="List-img" src={toy.url}/>
                        <h2>{toy.type}</h2>
                    </div>
                    <p>{toy.name}</p>
                    <p>{toy.size}</p>
                    <p>{toy.distance}</p>
                    <p>{toy.speed}</p>
                    <p>Wheels: {toy.wheels}</p>
                    <p className="List-note">{toy.note}</p>
                </li>
            )
        })
    }

    return (
        <ul>
            {renderList()}
        </ul>
    )
}

export default List