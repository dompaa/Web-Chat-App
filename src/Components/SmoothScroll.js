import { useEffect } from "react";
import Scrollbar from 'smooth-scrollbar';

let options = {
    damping: 0.07,
} 



const Scroll = () =>  {

    useEffect(() => {
        Scrollbar.init(document.body, options);
        // Scrollbar.init(document.querySelector('#my-scrollbar'), options);
    }, [])


    return null;
}

export default Scroll;