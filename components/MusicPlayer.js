import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaybackState } from "../features/Spotify/playListSlice";
import {
  DesktopComputerIcon,
  PlayIcon,
  PauseIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/solid";

const createScript = () => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.id = "spotify-player";
  script.type = "text/javascript";
  script.async = true;
  script.defer = "defer";

  document.body.appendChild(script);
};
const getPlaybackState = async (session) => {
  return await axios("https://api.spotify.com/v1/me/player", {
    method: "get",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function MusicPlayer() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const { playbackState } = useSelector((state) => state.playlist);

  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(false);

  const transferPlayback = async (deviceId) => {
    await axios({
      url: `https://api.spotify.com/v1/me/player`,
      method: "put",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        device_ids: [`${deviceId}`],
      },
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      // Set the current playbackState

      createScript();

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Vasea Pizdos",
          getOAuthToken: (cb) => {
            cb(session.user.accessToken);
          },
          volume: 0.5,
        });

        setPlayer(player);

        player.addListener("ready", ({ device_id }) => {
          setDeviceId(device_id);
          getPlaybackState(session).then((res) => {
            if (res.status === 200) {
              dispatch(updatePlaybackState(res.data));
            } else if (res.status === 204) {
              console.log("No active playback");
              transferPlayback(device_id);
              getPlaybackState(session).then((res) => {
                if (res.status === 200) {
                  dispatch(updatePlaybackState(res.data));
                }
              });
            }
          });
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("player_state_changed", (state) => {
          if (!state) {
            return;
          }

          setDuration(state.duration);
          setProgress(state.position);
          setPaused(state.paused);
          setTrack(state.track_window.current_track);

          player.getCurrentState().then((state) => {
            !state ? setActive(false) : setActive(true);
          });
        });

        player.connect();
      };
    }
  }, [status]);

  return (
    <>
      <div className="w-full absolute bottom-0 h-24 px-4 bg-[rgb(18,18,18)] flex items-center justify-center  border-t border-solid border-[rgb(40,40,40)]">
        {/* SongInfo */}

        {/* leftside */}
        <div className="flex w-[30%] ">
          <img
            src={
              is_active
                ? current_track.album.images[0].url
                : playbackState?.item?.album.images[2].url
            }
            className="w-14 h-14"
          />
          <div className="px-4 flex flex-col justify-center">
            <p className="text-white text-sm font-sans">
              {" "}
              {is_active ? current_track?.name : playbackState?.item?.name}
            </p>
            <div className="flex">
              <h1 className="text-[rgb(179,179,179)] text-xs font-sans">
                {" "}
                {is_active
                  ? current_track?.artists
                      .map((artist) => artist.name)
                      .join(", ")
                  : playbackState?.item?.artists
                      .map((artist) => artist.name)
                      .join(", ")}{" "}
              </h1>
            </div>
          </div>
        </div>
        {/* middle */}
        <div className="flex flex-col items-center w-[40%]">
          <div className="space-x-3 flex items-center">
            <button
              className="text-white transition duration-150 hover:scale-110"
              onClick={() => player.previousTrack()}
            >
              {" "}
              <ArrowCircleLeftIcon className="h-6 w-6" />{" "}
            </button>
            <button
              className="text-white transition duration-150 hover:scale-110"
              onClick={() => player.togglePlay()}
            >
              {" "}
              {is_paused ? (
                <PlayIcon className="h-10 w-10" />
              ) : (
                <PauseIcon className="h-10 w-10" />
              )}{" "}
            </button>
            <button
              className="text-white transition duration-150 hover:scale-110"
              onClick={() => player.nextTrack()}
            >
              {" "}
              <ArrowCircleRightIcon className="h-6 w-6" />{" "}
            </button>
          </div>
          <div className="w-full h-1 rounded mt-3 bg-[rgb(100,100,100)] overflow-hidden">
            <div
              style={{ transform: `translateX(${-100 + progress}%)` }}
              className={`w-full h-1 rounded bg-[rgb(179,179,179)]`}
            ></div>
          </div>
          {/* <div className="w-full h-1 rounded mt-3 bg-[rgb(100,100,100)] overflow-hidden"> 
            <div style={{transform:`translateX(${-100+progress}%)`}}
            className={`w-full h-1 rounded bg-[rgb(179,179,179)]`}></div>
          </div> */}
        </div>
        {/* rightside */}
        <div className="w-[30%] flex justify-end">
          <button
            className="text-white"
            onClick={() => transferPlayback(deviceId)}
          >
            {" "}
            <DesktopComputerIcon className="h-5 w-5" />{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;
