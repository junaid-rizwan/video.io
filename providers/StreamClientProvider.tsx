'use client'
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { error } from "console";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = "user-id";
// const token = "authentication-token";
// const user: User = { id: userId };



 const StreamVideoProvider = ({children}:{children:React.ReactNode}) => {
        const [videoClient,setVideoClient]=useState<StreamVideoClient>();
        const{user,isLoaded}=useUser();

        useEffect(()=>{
            if(!isLoaded||!user) return;
            if(!apiKey) throw new Error('stream api key missing');

            const client=new StreamVideoClient({
                apiKey,
                user:{
                    id:user?.id,
                    name:user?.username ||user?.id,
                    image:user?.imageUrl,
                },
                tokenProvider,
            })
            setVideoClient(client)
        },[user,isLoaded]);

        if(!videoClient) return <Loader/>

    return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;