import { createContext, useState, type FC } from "react";
import type { ReactNode } from "react";

export const addPaperContext = createContext<{
    open: boolean
    setOpen: (open: boolean) => void
    numbers: number[]
    setNumbers: (numbers: number[]) => void
    toggleNumber: (id: number) => void
}>({
    open: false,
    setOpen: () => { },
    numbers: [],
    setNumbers: () => { },
    toggleNumber: () => { }
})

const addPaperProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [numbers, setNumbers] = useState<number[]>([])

    const toggleNumber = (id: number) => {
        setNumbers(prev =>
            prev.includes(id)
                ? prev.filter(n => n !== id) : [...prev, id])
    }
    
    return (
        <addPaperContext.Provider
            value={{
                open,
                setOpen,
                numbers,
                setNumbers,
                toggleNumber
            }}
        >
            {children}
        </addPaperContext.Provider>
    )
}