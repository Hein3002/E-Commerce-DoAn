import { createContext } from 'react'

interface ContextType {
    test: any | null;
}

const ContextInfo = createContext<ContextType | null>(null);
export default ContextInfo;