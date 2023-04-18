import { createContext, useContext, useState, ReactNode } from 'react';

export const ModalMap = {
  CategoryNameEditor: Symbol('CategoryNameEditor'), // eslint-disable-line no-undef
};

interface AppProps {
  modal: symbol | null;
  openModal: (modalCode: symbol) => void;
  closeModal: () => void;
}

export const AppContext = createContext<AppProps>({
  modal: null,
  openModal: () => {},
  closeModal: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const useAppProviderState = (): AppProps => {
  const [modal, setModal] = useState<symbol | null>(null);

  const openModal = (modal: symbol) => {
    console.log(modal);
    setModal(modal);
  };

  const closeModal = () => {
    setModal(null);
  };

  return {
    modal,
    openModal,
    closeModal,
  };
};

export const AppProvider = (props: { children: ReactNode }) => {
  const appContextValue = useAppProviderState();

  return (
    <AppContext.Provider value={appContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
