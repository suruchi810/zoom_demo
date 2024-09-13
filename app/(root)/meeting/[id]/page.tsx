'use client';

import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import Loader from '@/components/Loader';

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  console.log(isLoaded)
  console.log(isCallLoading)
  console.log(call)
  if (!isLoaded || isCallLoading || !call) return <Loader />;

  const handleSetupComplete = () => {
    setIsSetUpComplete(true);
  };

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
