import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'

const RootLayout = ({children}:{children: React.ReactNode}
    
) => {
  return (
    <main>
        <StreamVideoProvider>
            {children}  
        </StreamVideoProvider>
    </main>
  )
}

export default RootLayout


