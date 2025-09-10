

// import SideBarProvider from './components/SideBarProvider';
// import { SearchProvider } from './components/SearchContext'; // ✅ Import SearchProvider
// import './App.css';
// import Header from './components/Header';
// import { Outlet } from 'react-router-dom';

// function App() {
//   return (
//     <>
//       <SearchProvider>  {/*  Wrap inside SearchProvider */}
//         <SideBarProvider>
//           <Header />
//           <div className="w-full h-screen">
//             <Outlet />
//           </div>
//         </SideBarProvider>
//       </SearchProvider>
//     </>
//   );
// }

// export default App;

import SideBarProvider from './components/SideBarProvider';
import { SearchProvider } from './components/SearchContext';
import { FilterProvider } from './components/FilterContext'; // ✅ Import FilterProvider
import './App.css';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <SearchProvider>
        <FilterProvider> {/* ✅ Wrap FilterProvider */}
          <SideBarProvider>
            <Header />
            <div className="w-full h-screen">
              <Outlet />
            </div>
          </SideBarProvider>
        </FilterProvider>
      </SearchProvider>
    </>
  );
}

export default App;
