import React from "react";
import DeckList from "./DeckList";
import {useHistory} from "react-router-dom";

function Home() {
    const history = useHistory();
    return (
        <div>
            <h1>Home</h1>
            <button 
                type="button" 
                className="btn btn-secondary my-2" 
                onClick={() => {
                    history.push("/decks/new")
                }}>+ Create Deck</button>
            <br />
            <DeckList />
        </div>
    )
}

export default Home;