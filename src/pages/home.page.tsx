import React from 'react'

export const Home = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-2 px-6 w-full flex justify-center items-center">
      <div className="flex flex-col w-full h-screen md:w-1/2 md:max-w-md md:shadow-lg md:p-4 md:rounded-md md:border md:border-blue-950">
        {children}
      </div>
    </div>
  )
}
