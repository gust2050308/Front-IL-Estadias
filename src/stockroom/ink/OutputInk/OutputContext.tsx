import { createContext,useState, type FC } from "react";
import type { ReactNode } from "react";

export const OutputContext = createContext<{
    open: boolean
    setOpen: (open: boolean) => void
    numbers : number[]
    setNumbers: (numbers : number[]) => void
    addNumber: (id: number) => void
    removeNumber:(id:number)=>void
    toggleNumber: (id:number) => void
}>({
    open:false,
    setOpen: () => {},
    numbers:[],
    setNumbers: () => {},
    addNumber: () => { },
    removeNumber: () => { },
    toggleNumber: () => { }
})

const OutPutProvider : FC <{children : ReactNode}> = ({ children }) =>{
    const [open,setOpen] = useState(false)
    const [numbers,setNumbers] = useState<number[]>([])

    const addNumber = (id:number)=>{
        setNumbers( prev => prev.includes(id) ? prev : [...prev, id])
    
    }

    const removeNumber = (id:number) => {
        setNumbers(
            prev => prev.filter( n => n !== id)
        )
    }

    const toggleNumber = (id : number) => {
        setNumbers(
            prev => prev.includes(id) ? 
            prev.filter(n => n !== id):
            [...prev,id]
        )
    }

    return(
        <OutputContext.Provider 
        value={{
            open,
            setOpen,
            numbers,
            setNumbers,
            addNumber,
            toggleNumber,
            removeNumber
        }}
        >
            {children}
        </OutputContext.Provider>
    )

}

export default OutPutProvider