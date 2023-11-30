export const toTitleCase = (str: string) => {
    return str.replace(/(^|\s)\S/g, function (t) {
        return t.toUpperCase();
    });
};

export const formattedDate = () => {
    const currentDate = new Date();
    let formattedDate = "";
    formattedDate = currentDate.getFullYear().toString();
    formattedDate += "/";
    formattedDate += currentDate.getMonth() + 1;
    return formattedDate;
};

export const checkStytchSession = () => {
    const sessionStatus = localStorage.getItem(
        import.meta.env.VITE_STYTCH_TOKEN
    );
    return sessionStatus;
};
