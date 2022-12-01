import React from "react";
import {deleteCard} from "../utils/api/index";
import {useHistory} from "react-router-dom";

function CardDelete({cardId, deckId}) { 
    //Function invoked when delete button is clicked for specific card ID
    const history = useHistory();

    const handleCardDelete = () => { 
        const deleteCardPrompt = window.confirm("Delete this dard? You will not be able to recover it.");

        if (deleteCardPrompt) {
            deleteCard(cardId)
            .then((history.go(0)))
            .then(window.location.reload) //reloads page
        }
    }
    return (
        <div>
            <button className="btn btn-danger float right" onClick={handleCardDelete}>
                Delete
            </button>
        </div>
    )
}

export default CardDelete;