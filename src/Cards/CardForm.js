import React from "react";
import {useHistory, useParams} from "react-router-dom";

function CardForm({onChangeBackHandler, onChangeFrontHandler, submitHandler, newCard={} }) {
    const history = useHistory();
    const {deckId} = useParams;

    function front() {
        return newCard.front ? newCard.front : "";
    }

    function back() {
        return newCard.back ? newCard.back : "";
    }

    return (
        <div>
            <h1>CardForm</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="front"
                        placeholder="Front side of the card"
                        onChange={onChangeFrontHandler}
                        value={front()}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="back"
                        placeholder="Back side of the card"
                        onChange={onChangeBackHandler}
                        value={back()} ></textarea>
                </div>
            </form>
        </div>
    )
}

export default CardForm;