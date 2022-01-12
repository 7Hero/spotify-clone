import { millisToMinutesAndSeconds } from "../lib/time"
import axios from'axios';
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { updateTrackData } from "../features/Spotify/playListSlice";

function Song({track,id}) {
    const { data: session , status} = useSession();
    const {playlistData} = useSelector(state => state.playlist);
    const dispatch = useDispatch();
   
    

    const handleClick = async (e) =>{
        // e.target.focus();
        if(status == 'authenticated'){
            await axios({
                url: `https://api.spotify.com/v1/me/player/play`,
                method: 'put',
                headers:{
                  "Authorization": `Bearer ${session.user.accessToken}`,
                  'Content-Type': 'application/json',
                },
                data:{
                  "context_uri":`${playlistData.uri}`,
                  "offset":{
                    "position":id
                  },
                  'position_ms': 0,
                }
              })
              dispatch(updateTrackData({track,context:playlistData.uri}));
        }
    }
    
    return (
        <div onClick={handleClick} key={track.track.id} tabIndex="2" className="hover:cursor-pointer focus:bg-opacity-40 hover:bg-white hover:bg-opacity-20 rounded-xl transition duration-75 grid mx-8 px-4 grid-cols-2 text-[#b3b3b3] text-sm font-semibold my-2 py-2">
            <div className = "flex items-center space-x-4">
                <p>{id+1}</p>
                <img src={track.track.album.images[0]?.url} className="w-10 h-10"/>
                <div className="m">
                    <p className="text-white">{track?.track.name}</p>
                    <p>{track?.track.artists[0].name}</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p>{track?.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track?.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
