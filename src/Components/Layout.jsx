import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'
import { createContext, useState } from 'react'
import { Toaster } from 'sonner'

export const contextDatetime = createContext() ;
export const contextCity = createContext();

export default function Layout(){
    const [day,setDay] = useState() ;
    const [city, setCity] = useState('');

    return(
        <>
        <Toaster position="top-right" richColors/>
        <contextCity.Provider value={{city,setCity}}>
        <contextDatetime.Provider value={{day,setDay}}>
         <Header/>
         <main>
            <Outlet>

            </Outlet>
         </main>
       <Footer/>
       </contextDatetime.Provider>
       </contextCity.Provider>
    
        </>
      
    )
}