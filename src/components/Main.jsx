// // import Sidebar from './Sidebar'
// // import Filter from './Filter'
// // import MainContent from './MainContent'
// // import { useSidebar } from "./SideBarProvider";

// // export default function Main() {
// //     const { isSidebarOpen } = useSidebar();

// //   return (
// //     <>
 
// // <div className='w-full h-full flex'>
        
// //             <Sidebar/>
// //         <div
// //   className={`flex flex-col transition-all duration-300 w-full lg:${
// //     isSidebarOpen ? 'w-[calc(100%-220px)]' : 'w-[calc(100%-80px)]'
// //   }`}
// // >


       

// //             <Filter/>
          
         
// //             <MainContent/>
         
// //         </div>
   
// // </div>
// //     </>
   
// //   )
// // }


// import Sidebar from './Sidebar';
// import Filter from './Filter';
// import MainContent from './MainContent';
// import { useSidebar } from "./SideBarProvider";

// export default function Main() {
//   const { isSidebarOpen } = useSidebar();

//   return (
//     <div className="w-full h-full flex">
//       <Sidebar />
//       <div
//         className={`flex flex-col transition-all duration-300 w-full ${
//           isSidebarOpen ? 'w-[calc(100%-220px)]' : 'w-[calc(100%-80px)]'
//         }`}
//       >
//         <Filter />
//         <MainContent />
//       </div>
//     </div>
//   );
// }

import Sidebar from "./Sidebar";
import Filter from "./Filter";
import MainContent from "./MainContent";
import { useSidebar } from "./SideBarProvider";

export default function Main() {
  const { isSidebarOpen } = useSidebar();

  // When sidebar is open, main area should leave space for expanded sidebar on lg
  const mainClass = `flex-1 transition-all duration-300 w-full ${
    isSidebarOpen ? "lg:w-[calc(100%-220px)]" : "lg:w-[calc(100%-80px)]"
  }`;

  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className={mainClass}>
        <Filter />
        <MainContent />
      </div>
    </div>
  );
}

