import { useEffect, useMemo, useRef, useState } from "react";
import Song from "../components/Song";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist } from "../features/Spotify/playListSlice";
import { updateScrollPosition, updateActiveColor } from "../features/PlaylistScroll/PlaylistScrollSlice";
import useSpotify from "../Hooks/useSpotify";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-purple-500",
    "from-pink-500",
    "from-teal-500",
    "from-gray-500",
]

function Playlist() {
    const dispatch = useDispatch()
    const { playlistId, playlistData } = useSelector(state =>  state.playlist )
    const playlistRef = useRef(null);
    const { activeColor: color } = useSelector(state => state.scroll);
    const spotifyWebApi = useSpotify();
    
    useEffect(() => {
      dispatch(updateActiveColor(colors[Math.floor(Math.random() * colors.length)]));
    },[playlistId]);
    
    useEffect( () => {
      if(spotifyWebApi.getAccessToken()){
        spotifyWebApi.getPlaylist(playlistId)
        .then(data => {
          dispatch(updatePlaylist(data.body))
        })
      }
    },[playlistId]);
    // console.log("Playlist Data: ",playlistData)
    useEffect(()=>{
       playlistRef.current.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
         playlistRef.current.removeEventListener('scroll', handleScroll)
        };
    },[])

    const handleScroll = () => {
      dispatch(updateScrollPosition(playlistRef.current?.scrollTop));
    };

    return (
        <div ref={playlistRef} className="overflow-y-scroll h-screen text-white">
                {/* Song Image */}
                <div className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8 p-8`}>
                    <img src={playlistData?.images[0].url} className="h-44 w-44"/>
                    <div className= ''>
                        <h1 className='text-7xl mb-4 font-bold'>{playlistData?.name}</h1>
                        <p className="ml-2 text-sm font-semibold"> PLAYLIST </p>
                    </div>
                </div>
                {/* Song list */}
                <div>
                    {playlistData?.tracks.items.map((song,idx) => <Song key={idx} track={song} id={idx}/>)}
                </div>
        </div>
    )
}

export default Playlist;
