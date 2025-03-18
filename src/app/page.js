"use client";
import Body from './components/body';
import Hero from './components/hero';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { userState } from './atom/userlogin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Import from the same directory

export default function Home() {
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true); // User is logged in
            } else {
                setUser(false); // User is logged out
            }
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [setUser]);

    return (
        <>
            <main className='relative bg-[url("/mainbg.png")] max-[610px]:bg-[url("/smallbg.png")] bg-contain'>
                <img
                    src="/mainbg.png"
                    alt="main bg"
                    className="w-screen bg-contain absolute top-0 -z-10"
                    priority
                />
                <div className='z-10 pt-5'>
                    <div className={`px-28 max-[720px]:px-10 max-[660px]:px-5 ${user ? "px-24" : ""}`}>
                        <Hero />
                    </div>
                    <Body />
                </div>
            </main>
        </>
    );
}