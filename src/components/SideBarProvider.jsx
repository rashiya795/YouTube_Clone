import  { createContext, useContext, useState } from 'react'


const SideBarContext = createContext()

export default function SideBarProvider({children}) {

const [isSidebarOpen, setIsSidebarOpen] = useState(false)

const toggleSidebar=()=>{
setIsSidebarOpen(prev => !prev)

}

  return (
    
      <SideBarContext.Provider value={{isSidebarOpen,toggleSidebar}}>
{children}
      </SideBarContext.Provider>
  )
}


export function useSidebar() {
  return useContext(SideBarContext);
}


