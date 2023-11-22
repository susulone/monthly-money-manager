import "./AddButton.css";
import { Plus } from "react-feather";

export const AddButton = ({ btnText, handleOnClick }: AddButtonProps) => {
    return (
        <button id="btn-add" onClick={handleOnClick}>
            <Plus id="btn-add-icon" />
            {btnText}
        </button>
    );
};
