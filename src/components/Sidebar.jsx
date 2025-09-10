import {
  MdHome, MdOutlineSubscriptions, MdOutlineWatchLater, MdPlaylistPlay, MdNewspaper, MdLiveTv
} from "react-icons/md";
import { LiaDownloadSolid } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import { SiYoutubeshorts, SiYoutubegaming } from "react-icons/si";
import { GoHistory, GoTrophy } from "react-icons/go";
import { BiSolidVideos, BiLike } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { IoMusicalNotesOutline, IoFlagOutline } from "react-icons/io5";
import { MdOutlinePodcasts } from "react-icons/md";
import { GiClothesline } from "react-icons/gi";
import { SlGraduation } from "react-icons/sl";
import { PiFilmSlate } from "react-icons/pi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";
import { useSidebar } from "./SideBarProvider";

export default function Sidebar() {
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={`
        ${isSidebarOpen ? "translate-x-0 w-56" : "-translate-x-full md:translate-x-0 md:w-20"}
        fixed md:static top-0 left-0 h-screen pt-5 
        bg-white shadow-md transition-all duration-300 
        overflow-y-auto extra-thin-scrollbar 
        scrollbar-thumb-gray-400 scrollbar-track-transparent z-50
      `}
    >
      {/* Collapsed view (icon only) on md+ screens */}
      {!isSidebarOpen && (
        <div className="hidden md:flex flex-col items-center gap-5">
          <SidebarItem icon={<MdHome />} label="Home" />
          <SidebarItem icon={<SiYoutubeshorts />} label="Shorts" />
          <SidebarItem icon={<MdOutlineSubscriptions />} label="Subscriptions" />
          <SidebarItem icon={<FaRegUserCircle />} label="You" />
          <SidebarItem icon={<LiaDownloadSolid />} label="Downloads" />
        </div>
      )}

      {/* Expanded view */}
      {isSidebarOpen && (
        <div className="flex flex-col">
          <HiddenSidebar icon={<MdHome />} label="Home" />
          <HiddenSidebar icon={<SiYoutubeshorts />} label="Shorts" />
          <HiddenSidebar icon={<MdOutlineSubscriptions />} label="Subscriptions" />
          <hr className="text-gray-300" />
          <HiddenSidebar icon={<GoHistory />} label="History" />
          <HiddenSidebar icon={<MdPlaylistPlay />} label="Playlist" />
          <HiddenSidebar icon={<BiSolidVideos />} label="Your videos" />
          <HiddenSidebar icon={<MdOutlineWatchLater />} label="Watch later" />
          <HiddenSidebar icon={<BiLike />} label="Liked videos" />
          <HiddenSidebar icon={<LiaDownloadSolid />} label="Downloads" />
          <hr className="text-gray-300" />
          <p className="text-xl px-5 py-3">Explore</p>
          <HiddenSidebar icon={<FiShoppingBag />} label="Shopping" />
          <HiddenSidebar icon={<IoMusicalNotesOutline />} label="Music" />
          <HiddenSidebar icon={<PiFilmSlate />} label="Films" />
          <HiddenSidebar icon={<MdLiveTv />} label="Live" />
          <HiddenSidebar icon={<SiYoutubegaming />} label="Gaming" />
          <HiddenSidebar icon={<MdNewspaper />} label="News" />
          <HiddenSidebar icon={<GoTrophy />} label="Sport" />
          <HiddenSidebar icon={<GiClothesline />} label="Fashion & Beauty" />
          <HiddenSidebar icon={<MdOutlinePodcasts />} label="Podcasts" />
          <HiddenSidebar icon={<SlGraduation />} label="Courses" />
          <hr className="text-gray-300" />
          <HiddenSidebar icon={<CiSettings />} label="Settings" />
          <HiddenSidebar icon={<IoFlagOutline />} label="Report History" />
          <HiddenSidebar icon={<IoIosHelpCircleOutline />} label="Help" />
          <HiddenSidebar icon={<RiFeedbackLine />} label="Send feedback" />
          <hr className="text-gray-300" />
          <p className="py-5 text-xs px-5 text-gray-500">© 2025 YouTube Clone.</p>
        </div>
      )}
    </aside>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="w-20 flex flex-col justify-center items-center hover:bg-gray-200 rounded-lg px-6 py-2 cursor-pointer">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}

function HiddenSidebar({ icon, label }) {
  return (
    <div className="w-full flex gap-7 items-center hover:bg-gray-200 rounded-lg px-4 py-3 cursor-pointer">
      <span className="text-2xl">{icon}</span>
      <span className="text-base font-medium">{label}</span>
    </div>
  );
}
