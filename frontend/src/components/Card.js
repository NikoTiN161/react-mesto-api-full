import React from "react"
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
    const value = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="elements__item">
            <img src={props.card.link} alt={props.card.name} className="elements__image" onClick={handleClick} />
            <div className="elements__container">
                <h2 className="elements__header">{props.card.name}</h2>
                <div className="elements__container elements__container_likes">
                    {console.log('likes', props.card.likes)}
                    <button type="button" className={`elements__like-button ${props.card.likes.some(item => item === value.currentUser._id) && "elements__like-button_liked"}`}
                        onClick={handleLikeClick}></button>
                    <span className="elements__counter-likes">{props.card.likes.length}</span>
                </div>
                <button type="button" className={`elements__delete-button ${props.card.owner._id !== value.currentUser._id && "elements__delete-button_disable"}`}
                    onClick={handleDeleteClick}></button>
            </div>
        </li>
    )
}

export default Card;
