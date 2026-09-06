import { createContext, useContext, useState, useCallback } from "react";
import ContactModal from "@/components/ContactModal";

const ContactModalContext = createContext({ open: () => {} });

export const useContactModal = () => useContext(ContactModalContext);

export function ContactModalProvider({ children }) {
  const [plan, setPlan] = useState(null);
  const open = useCallback((p = "General Inquiry") => setPlan(p), []);
  const close = useCallback(() => setPlan(null), []);

  return (
    <ContactModalContext.Provider value={{ open }}>
      {children}
      <ContactModal plan={plan} onClose={close} />
    </ContactModalContext.Provider>
  );
}
