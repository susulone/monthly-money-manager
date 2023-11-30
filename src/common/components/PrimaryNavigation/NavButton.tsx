import "./styles.css";

type NavButtonProps = {
    btnText: string;
    handleOnClick: () => void;
};

export const NavButton = ({ btnText, handleOnClick }: NavButtonProps) => {
    return (
        <button className="btn-nav" onClick={handleOnClick}>
            {btnText}
        </button>
    );
};
