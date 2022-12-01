import React, {useState, useEffect} from "react";
import {useHistory, useParams, Link} from "react-router-dom";
import {readDeck, readCard, updateCard} from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const {deckId, cardId} = useParams();
    const history = useHistory();

    //pulls correct deck order to add cards
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeckAndCards() {
            try {
                const deckData = await readDeck(deckId, abortController.signal);
                const cardData = await readCard(cardId, abortController.signal);
                setDeck(deckData);
                setCard(cardData);
                setCardFront(cardData.front);
                setCardBack(cardData.back);
            }
            catch (error) {
                console.log("error creating deck list");
            }
            return () => {
                abortController.abort();
            }
        }
        loadDeckAndCards();
    }, []);

    //when form is saved, card will be added to deck and user can add new cards
    const submitHandler = async (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        await updateCard(card, abortController.signal);
        history.push(`/decks/${deckId}`);
    };

    const onChangeFrontHandler = ({target}) => {
        setCardFront(target.value);
        setCard({
            ...card,
            front: target.value,
           // [e.target.name]: e.target.value,
        });
    };

    const onChangeBackHandler = ({target}) => {
        setCardBack(target.value);
        setCard({
            ...card,
            back: target.value,
        });
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <div className="card-info">
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
                                value={cardFront}
                                ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="back">Back</label>
                            <textarea   
                                type="text"
                                className="form-control"
                                id="back"
                                placeholder="Back side of the card"
                                onChange={onChangeBackHandler}
                                value={cardBack}
                                ></textarea>
                        </div>
                    </form>
                </div>
                    <button tupe="button" className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                    <button type="submit" className="btn btn-primary" onClick={submitHandler}>Save</button>
            </div>
        </div>
    )
}

export default EditCard;