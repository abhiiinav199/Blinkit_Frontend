import { useEffect, useState } from "react"
//need to understand this code
export const useMobile = (breakpoint= 768) => {
    const [ismobile, setismobile] = useState(window.innerWidth<breakpoint)

    const handleResize = () => {
        const checkPoint =(window.innerWidth<breakpoint)
        setismobile(checkPoint)
    }
    useEffect(()=>{
        handleResize() 
        window.addEventListener('resize', handleResize)

        return() => window.removeEventListener('resize', handleResize)
    },[])
    return [ismobile]
}