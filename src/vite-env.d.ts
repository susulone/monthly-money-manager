/// <reference types="vite/client" />

type AddButtonProps = {
    btnText: string;
    handleOnClick: () => void;
};

interface ImportMetaEnv {
    readonly VITE_STYTCH_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
