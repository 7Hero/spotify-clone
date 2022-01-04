import MusicPlayer from "../components/MusicPlayer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function NavLayout({ children,...props }) {


  return (
    <div className="flex bg-black overflow-hidden h-screen" >
      <Sidebar />
      <main className="flex-grow relative">
        <Navbar/>
        { children }
      </main>
      { /* Player */ }
        <MusicPlayer/>    
      </div>
  )
}

export default NavLayout;