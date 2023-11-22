import "./Footer.css";

const projectLifeTime = (): string => {
    const projectCreated = new Date("2023-11-20");
    const creationYear = projectCreated.getFullYear();

    const currentYear = new Date().getFullYear();

    if (creationYear !== currentYear) {
        return `${creationYear}–${currentYear}`;
    } else {
        return `${creationYear}`;
    }
};

export const Footer = () => {
    return (
        <footer id="footer">
            <p id="footer-content">
                Copyright <span>&copy; </span>
                {projectLifeTime()} Suvi Sulonen
            </p>
        </footer>
    );
};
