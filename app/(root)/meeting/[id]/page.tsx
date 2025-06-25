// app/meeting/[id]/page.tsx
'use client'

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useState } from 'react'

const Meeting = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // The rest of the code must be moved to a client component, since hooks cannot be used in an async component.
  // So, we create a ClientMeeting component and pass id as prop.
  return <ClientMeeting id={id} />;
}

function ClientMeeting({ id }: { id: string }) {
  const { isLoaded } = useUser()
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const { call, isCallLoading } = useGetCallById(id)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting