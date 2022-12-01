import React, {useState, useEffect} from "react";
import {useParams, Link, useHistory} from "react-router-dom";
import {readDeck, createCard} from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard({card}) {
    const [deck, setDeck] = useState({});
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [newCard, setNewCard] = useState({
        front: "",
        back: "",
        deckId: "",
        id: "",
    });
    const {deckId} = useParams();
    const history = useHistory();

    //pulls correct deck in order to add cards
    useEffect(() => {
        const deckAbort = new AbortController();
        
        async function loadDeck() {
            try {
                const pullDeck = await readDeck(deckId, deckAbort.signal);
                setDeck(pullDeck);
            }
            catch (error) {
                console.log("error reading deck list");
            }
            return () => deckAbort.abort();
        }
        loadDeck();
    }, [deckId])

    const submitHandler = async (e) => {
        console.log("submit button handler");
        //e.preventDefault();
        //const abortController = new AbortController();
        //const newCard = {
            //front,
           // back,
           // deckId
        //}
        await createCard(deckId, newCard);
        setNewCard({
            front: "",
            back: "",
            cardId: "",
            id: ""
        });
        console.log("submitted");
        //history.push(`/decks`);
    };

    const onChangeFrontHandler = ({target}) => {
        setFront(target.value);
        setNewCard({
            ...newCard,
            front: target.value,
        });
    };
    const onChangeBackHandler = ({target}) => {
        setBack(target.value);
        setNewCard({
            ...newCard,
            back: target.value,
        });
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>{`${deck.name}: Add Card`}</h1>
            <div className="card-info">
                <CardForm
                    //handleSubmit={submitHandler}
                    onChangeFrontHandler={onChangeFrontHandler}
                    onChangeBackHandler={onChangeBackHandler}
                    newCard={newCard}
                    //front={front}
                    //back={back} 
                    />
                <button type="button" className="btn btn-secondary mx-1" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                <button type="submit" className="btn btn-primary" onClick={submitHandler}>Save</button>
            </div>
        </div>
    )
}

export default AddCard;