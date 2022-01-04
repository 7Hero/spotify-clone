import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import { useRouter } from "next/router";
import {useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";


function Navbar() {

    const router = useRouter();
    const [lastPath, setLastPath] = useState([]);

    const {data: session, status} = useSession();
    const { scrollPosition, activeColor } = useSelector(state => state.scroll)
    const [color, setColor] = useState(activeColor);
    useEffect(()=>{
        setColor(activeColor.split("-")[1]+"-"+activeColor.split("-")[2])
        console.log( activeColor );
    },[activeColor])
    const handleClick = ({ action }) => {
        switch(action){
            case "left":
                setLastPath([router.pathname,...lastPath]);
                router.back();

                return;
            case "right":
                if(lastPath.length === 0 ) return;

                router.push(lastPath[lastPath.length - 1])
                setLastPath(lastPath.slice(0, lastPath.length - 1));

                return;
        }
    }
    return (
        <div className={`py-4 px-8 transition duration-150 text-white flex bg-${scrollPosition > 220 ? color : 'transparent'} absolute w-full text-sm font-semibold items-center`}>
            <button onClick={() => handleClick({ action: "left" })} className="bg-black rounded-full p-[4px] bg-opacity-40 mr-4">
            <svg focusable="false" height="24" width="24" viewBox="0 0 24 24" className="stroke-white" ><polyline points="16 4 7 12 16 20" fill="none"></polyline></svg>
            </button>
            <button onClick={() => handleClick({action: "right"})} className="bg-black rounded-full p-[4px] bg-opacity-40" >
            <svg role="img" focusable="false" height="24" width="24" viewBox="0 0 24 24" className="stroke-white"><polyline points="8 4 17 12 8 20" fill="none"></polyline></svg>
            </button>
            <button className=" text-sm font-semibold ml-auto bg-black bg-opacity-40 flex h-full items-center px-0.5 py-0.5 rounded-full">
                <img src={session?.user.image} className='w-7 h-7 rounded-full object-cover' alt=''/>
                <span className='px-2'>{session?.user.name} </span>
                <ChevronDownIcon className="w-5 h-5 mr-2"/>
            </button>
        </div>
    )
}

export default Navbar
