import { useState } from 'react';

export default function useAlert() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  return {
    open,
    setOpen,
    severity,
    setSeverity,
    message,
    setMessage,
  };
}
