import { useState, useEffect } from "react"
export const useScrollTop = (threshold = 10) => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
         const handelScroll = () => {
        if (window.scrollY > threshold) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }
        window.addEventListener('scroll', handelScroll)
        return () => window.removeEventListener('scroll', handelScroll)
    }, [threshold])

    return isScrolled
}
 
