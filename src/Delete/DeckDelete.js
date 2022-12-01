import React from "react";
import {useHistory} from "react-router-dom";
import {deleteDeck} from "../utils/api/index";

function DeckDelete ({deckId}) {
    const history = useHistory();

    const handleDeckDelete = () => { 
        const deleteDeckPrompt = window.confirm("Delete this Deck? You will not be able to recover it.")

        if (deleteDeckPrompt) {
            deleteDeck(deckId)

            .then((history.push("/")))
            .then(window.location.reload()) //reloads page to show deck deleted
        }
    }

    return (
        <div>
            <button className="btn btn-danger float-right" onClick={handleDeckDelete}>
                Delete
            </button>
        </div>
    )
}

export default DeckDelete;