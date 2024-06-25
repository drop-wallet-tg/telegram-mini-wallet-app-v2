"use client"
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Header = dynamic(()=>import("@/components/Header"),{ssr:false})


export default function VibeSuccess(){
    const [account,setAccount] = useState<string>('');
    const params = useSearchParams();

    const nonce = params.get("nonce")
    ? params.get("nonce")
    : "";

    const content = params.get("content")
    ? params.get("content")
    : "";

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string)); 
    },[account])
    //console.log(localStorage.getItem("title") as string)
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <Header/>
            <div className="flex p-5 items-center justify-center mt-[60px] flex-col gap-3">
                <img width={100} src="/assets/success.svg" alt="success" />
                <span className="text-[#48bb78] font-semibold text-xl w-2/4 text-center text-wrap">You successfully posted on NEAR Social for vibes</span>
                <small className="text-white">⌛️ The image will take ~10 minutes to show on NEAR Social</small>
                <div className="bg-[#4227922b] w-full rounded-lg h-20 flex items-center mt-[80px] justify-center text-center">
                    <Link target="_blank" className="flex flex-col gap-2 text-white font-semibold" href={`https://near.social/mob.near/widget/MainPage.Post.Page?accountId=${account}&blockHeight=${nonce}`}>
                        <span className="text-sm">Content (open Near Social):</span>
                        <p className="text-xl">{content}</p>
                    </Link>
                </div>
                <div className="mt-12 w-full">
                    <button onClick={()=>location.replace("/")} className="px-6 py-3 bg-[#2775CA] hover:bg-[#5290D4] w-full rounded-3xl text-white font-bold">Home</button>
                </div>
            </div>
        </div>
    )
}