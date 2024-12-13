import React from 'react'

export const Home = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-8 px-6 h-screen flex-col flex">{children}</div>
}
