"use client"
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import dynamic from "next/dynamic";
import Link from "next/link";


const Header = dynamic(()=>import("@/components/Header"),{ssr:false})

export default function ViewSecretPhrase(){
    const [secret,setSecret] = useState<string>('');
    const [hidden,setHidden] = useState<boolean>(false);
    const [isCopy,setIsCopy] = useState<boolean>(false);
    useEffect(()=>{
        WebApp.CloudStorage.getItem("seed",(err,rs)=>setSecret(rs as string))
    },[secret])
    const hanldeCopy = ()=>{
        navigator.clipboard.writeText(secret)
        setIsCopy(true)
        setTimeout(function(){
            setIsCopy(false)
        },1000)
    }
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <Header/>
            <div className="p-5">
                <div className="flex flex-row items-center text-center">
                    <Link href="/wallet/setting/security">
                        <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-lg text-white font-bold m-auto">View Secret Phrase</label>
                </div>
                {
                    secret?
                    (
                        <div>
                            <p className="text-[#999999] mt-10">Be very careful where you store or share this key. Anyone who has access to it can take over this wallet account.</p>
                            <div className="relative" onClick={()=>setHidden((prv)=>!prv)}>
                                <div  className={`${hidden?"":"blur"} bg-[#492ba24e] relative cursor-pointer text-wrap mt-5 rounded-lg px-4 py-5 break-words text-white shadow-sm`}>
                                    <code>{secret}</code>
                                </div>
                                {!hidden&&(
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                                        <svg stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 24 24" focusable="false" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"></path></svg>
                                    </div>
                                )}
                            </div>
                            <div className="mt-5">
                                <button onClick={hanldeCopy} className={`${isCopy?"copy":""} relative flex flex-row hover:bg-[#492ba24e] px-2 py-1 rounded-full justify-between gap-1.5 items-center`}>
                                    <span>
                                        <svg width={15} viewBox="0 0 24 24" fill="#ffffff" focusable="false" aria-hidden="true"><path fill="#ffffff" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                                    </span>
                                    <span className="text-white font-semibold">Copy</span>
                                </button>
                            </div>
                        </div>
                    ):(
                        <div className="mt-8">
                            <p className="text-white text-center">This account was not created or imported (using Secret Phrase) via Meteor Wallet, so no encrypted secret phrase is currently available.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}