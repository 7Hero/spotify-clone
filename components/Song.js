import { millisToMinutesAndSeconds } from "../lib/time"

function Song({track,id}) {

    return (
        <div key={track.id} className=" hover:bg-white hover:bg-opacity-20 rounded-xl transition duration-75 grid mx-8 px-4 grid-cols-2 text-[#b3b3b3] text-sm font-semibold my-2 py-2">
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
