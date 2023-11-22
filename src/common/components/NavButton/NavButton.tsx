import "./NavButton.css";

export const NavButton = ({ btnText }: NavButtonProps) => {
    return (
        <button type="submit" className="btn-nav">
            {btnText}
        </button>
    );
};
