import { createContext } from 'react'

interface ContextType {
    cart: any | null;
    total: any | null;
    userid: any | null;
    fetchDataToCart: () => void;
}

const Context = createContext<ContextType | null>(null);
export default Context;