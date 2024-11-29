import { useState } from "react"

import Twitter from './assets/twitter.svg'
import Gamil from './assets/gmail.svg'
function App() {
  const [opentTab, setOpenTab] = useState(1)
  const [showTwitterModal, setShowTwitterModal] = useState(false)


  return (


    <div className="bg-gradient-to-r
     from-red-500
     to-indigo-500 min-h-screen w-full
     flex items-center
      justify-center">
      <main className="border border-gray-300 p-4 bg-white bg-opacity-30 max-w-2xl w-full rounded-2xl">
        <ul className="flex flex-row items-center list-none text-lg font-bold text-gray-900">

          <li onClick={() => setOpenTab(1)} className={`px-4 py-2  ${opentTab == 1 ? "border-blue-600 border-b-4 " : ""}  cursor-pointer`}>Login</li>
          <li onClick={() => setOpenTab(2)} className={`px-4 py-2 cursor-pointer ${opentTab == 2 ? "border-blue-600 border-b-4 " : ""}`}>Register</li>
        </ul>
        <br /> <br />

        {
          opentTab === 1 ? <form action="" className="felx flex-col gap-4">
            {/** username */}
            <div className="flex items-center gap-4 flex-col">
          <h3 className="text-xl font-bold"> Login with :</h3>
          <div className="flex gap-4 items-center mb-8">
            {/** twiter */}
            <div onClick={() => setShowTwitterModal(true)} className="text-white bg-blue-400 rounded-full w-16 h-16 flex items-center justify-center transition cursor-pointer hover:bg-blue-100 hover:text-blue-400">
              <img src={Twitter} width="40" />
            </div>
            {/** facebook */}
            <div className="text-white bg-blue-400 rounded-full w-16 h-16 flex items-center justify-center hover:bg-blue-100 hover:text-blue-400 cursor-pointer">
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="current" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg> */}
              <img src={Gamil} width="40" />
            </div>

          </div>
        </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="custom-lable">Username</label>
              <div className="relative w-full">
                <input id="username" type="text" className="custom-input" />
                <svg className="h-6 w-6 absolute top-2 left-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

              </div>
            </div>
            <br />
            {/** password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="pass" className="custom-lable">Password</label>
              <div className="relative w-full">
                <input type="password" id="pass" className="custom-input" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 absolute top-2 left-3 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>


              </div>
            </div>


            <button className="flex items-center justify-center shadow-lg mt-5 rounded-3xl h-10 w-full bg-indigo-700 text-white text-base font-medium">
              Log In
            </button>
          </form> :

            <form action="" className="felx flex-col gap-4">
              {/**name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="custom-lable">Name</label>
                <div className="relative w-full">
                  <input id="name" type="text" className="custom-input" />
                  <svg className="h-6 w-6 absolute top-2 left-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>

                </div>
              </div>
              <br />
              {/** password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="pass" className="custom-lable">Password</label>
                <div className="relative w-full">
                  <input type="password" id="pass" className="custom-input" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 absolute top-2 left-3 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>


                </div>
              </div>
              <br />
              {/** email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="custom-lable">Email</label>
                <div className="relative w-full">
                  <input type="email" id="email" className="custom-input" />
                
                  <svg className="h-6 w-6 absolute top-2 left-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                </div>
              </div>


              <button className="flex items-center justify-center shadow-lg mt-5 rounded-3xl h-10 w-full bg-indigo-700 text-white text-base font-medium">
                Sign Up
              </button>
            </form>
        }


      </main>
        {/** twitter modal */}
        {
          showTwitterModal &&
          <div className="fixed inset-0 bg-gray-600 bg-opacity-60  z-10 flex items-center justify-center">
            <div className="relative w-full max-w-xs  sm:max-w-md rounded-2xl flex sm:flex-col h-40 sm:h-auto overflow-hidden z-20 ">
              <div className="absolute top-4 left-3 cursor-pointer" onClick={() => setShowTwitterModal(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="w-1/3 sm:w-full  sm:h-20 h-full bg-blue-700 text-white flex items-center justify-center">


                <img src={Twitter} width="40" className="lg:hover:animate-bounce" />
              </div>
              <div className="w-2/3 bg-white p-4 flex flex-col h-full sm:w-full sm:h-40">
                {/** email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-800">email</label>
                  <div className="relative w-full">
                    <input id="email" type="email" className="custom-input" placeholder="enter your emails" />
                    <svg className="h-6 w-6 absolute top-2 left-3 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                </div>
                <button className="flex items-center justify-center shadow-lg mt-5 rounded-3xl h-10 w-full bg-indigo-700 text-white text-base font-medium">
                  send
                </button>
              </div>
            </div>
          </div>
        }
    </div>


  )
}

export default App
