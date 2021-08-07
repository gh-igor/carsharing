import { createContext } from 'react';

export const AlertContext = createContext({
  severity: '',
  message: '',
  open: false,
  setOpen: () => {},
  setSeverity: () => {},
  setMessage: () => {},
});
