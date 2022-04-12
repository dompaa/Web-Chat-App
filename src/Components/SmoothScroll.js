import { useEffect } from "react";
import Scrollbar from 'smooth-scrollbar';


const Scroll = () =>  {

    useEffect(() => {
        Scrollbar.init(document.body('#my-scrollbar'));
    }, [])


    return null;
}