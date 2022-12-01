import React, {useState} from "react";
import {useHistory, Link} from "react-router-dom";
import {createDeck} from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    //handles updating "name" and "description" values that will be put into the new deck
    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    //updates new deck in data/db.jason, then directs to new decks "view" pate
    const handleSubmit = (event) => {
        console.log("handlesubmit");
        event.preventDefault();
        createDeck({
            name: name,
            description: description,
        }).then((newDeck) => {
            console.log(newDeck);

            history.push(`${newDeck.id}`);
        })
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="name"
                        placeholder="Deck Name"
                        value={name}
                        onChange={handleNameChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        aria-describedby="description"
                        placeholder="Brief description of the deck"
                        rows="3"
                        value={description}
                        onChange={handleDescriptionChange}></textarea>
                </div>
                <br />
                <button className="btn btn-secondary mx-1" onClick={() => history.push(`/`)}>
                    Cancel
                </button>
                <button className="btn btn-primary mx-1">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateDeck;