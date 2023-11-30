import { Edit, Trash2, Download } from "react-feather";
import "./styles.css";

type IconButtonProps = {
    iconName: Icons;
    handleOnClick: () => void;
};

type Icons = "edit" | "delete" | "save";

export const IconButton = ({ iconName, handleOnClick }: IconButtonProps) => {
    console.log("Render Icon Button");
    const getIconFromName = (iconName: Icons) => {
        switch (iconName) {
            case "delete":
                return <Trash2 size={20} />;
            case "edit":
                return <Edit size={20} />;
            case "save":
                return <Download size={20} />;
        }
    };
    const icon = getIconFromName(iconName);

    const getAriaLabelText = (iconName: Icons) => {
        switch (iconName) {
            case "delete":
                return "Delete Note";
            case "edit":
                return "Edit Note";
            case "save":
                return "Save Note";
        }
    };
    const ariaLabelText = getAriaLabelText(iconName);

    return (
        <button
            className="btn-icon"
            onClick={handleOnClick}
            aria-label={ariaLabelText}
        >
            {icon}
        </button>
    );
};
