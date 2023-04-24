import { ReactNode, useState, createContext, useContext } from 'react';

import { CategoryNameEditorModal } from '../components/category-name-editor/category-name-editor';
import CategoryRemovePrompt from '../components/category-remove-prompt/category-remove-prompt';

export const modalTypes = {
  CategoryNameEditor: Symbol('CategoryNameEditor'),
  CategoryRemovePrompt: Symbol('CategoryRemovePrompt'),
};

export const modalComponents = {
  [modalTypes.CategoryNameEditor]: CategoryNameEditorModal,
  [modalTypes.CategoryRemovePrompt]: CategoryRemovePrompt,
};

type ModalStore = {
  modalType: symbol | null;
  modalProps?: any;
};

const initialStore: ModalStore = {
  modalType: null,
  modalProps: null,
}

interface ModalContextProps {
  showModal: (modalType: symbol, modalProps?: any) => void;
  hideModal: () => void;
  store: ModalStore;
}

export const ModalContext = createContext<ModalContextProps>({
  showModal: () => null,
  hideModal: () => null,
  store: { ...initialStore },
});

export const useModalContext = () => useContext(ModalContext);

export const useModalContextState = (): ModalContextProps => {
  const [store, setStore] = useState<ModalStore>({ ...initialStore });

    const showModal = (modalType: symbol, modalProps: any = {}) => {
      setStore({
        ...store,
        modalType,
        modalProps,
      });
    };

    const hideModal = () => {
      setStore({
        ...store,
        ...initialStore,
      });
    };

    return {
      store,
      showModal,
      hideModal,
    };
}



export const ModalProvider = (props: { children: ReactNode }) => {
  const {store, ...otherStates} = useModalContextState();

  const renderComponent = () => {
    const { modalType, modalProps } = store;
    const ModalComponent = modalType ? modalComponents[modalType] : null;
    if (!ModalComponent) {
      return null;
    }
    return <ModalComponent {...modalProps} />;
  };

  return (
    <ModalContext.Provider value={{store, ...otherStates}}>
      {renderComponent()}
      {props.children}
    </ModalContext.Provider>
  );
};
