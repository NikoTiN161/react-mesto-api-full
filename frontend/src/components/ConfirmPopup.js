import PopupWithForm from "./PopupWithForm"

function ConfirmPopup(props) {

    function handleDeleteCardSubmit(e) {
        e.preventDefault();
        props.handleClickSubmit();
        props.onCardDelete(props.card);
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="detele-card"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onClickOverlay={props.onClickOverlay}
            isValid
            buttonText={props.isSubmitting ? "Удаление..." : "Да"}
            onSubmit={handleDeleteCardSubmit}
        />
    )
}

export default ConfirmPopup;