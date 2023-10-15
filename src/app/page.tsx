'use client'

import LoginBtn from '@/components/login-btn';

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';

export default function Home() {
    const { data: session } = useSession()
    const [userImage, setUserImage] = useState('https://dummyimage.com/40')

    useEffect(function(){
        if(session?.user?.image){
            setUserImage(session.user.image);
        }
    },[session]);

    if (session && session.user) {
        return (
            <div>
                <section>
                <img src={userImage} width={40} />
                    logged in yay!
                </section>
            </div>

        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">

            <LoginBtn />
        </div>
    )
}
