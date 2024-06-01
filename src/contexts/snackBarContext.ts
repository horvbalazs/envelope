import { createContext } from 'react';

interface ISnackBarContext {
  showSnack?: (value: string) => void;
}

const SnackBarContext = createContext<ISnackBarContext>({});

export default SnackBarContext;
