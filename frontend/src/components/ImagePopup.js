function ImagePopup(props) {
    return (
        <div className={`overlay overlay_type_popup-image ${props.isOpen && 'overlay_opened'}`} onClick={props.onClickOverlay}>
            <div className="overlay__container overlay__container_type_popup-image">
                <button type="button" className="overlay__close" onClick={props.onClose}></button>
                <figure className="popup-image">
                    <img src={props.card.link} alt={props.card.name} className="popup-image__image" />
                    <figcaption className="popup-image__caption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;