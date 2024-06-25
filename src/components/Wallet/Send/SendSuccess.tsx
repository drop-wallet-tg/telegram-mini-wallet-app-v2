"use client"
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Header = dynamic(()=>import("@/components/Header"),{ssr:false})

export default function SendSuccess(){
    const [account,setAccount] = useState<string>('');
    const hash = localStorage.getItem("hash") ||"";
    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string)); 
    },[account])
    //console.log("hash",localStorage.getItem("hash"))
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <Header/>
            <div className="flex p-5 items-center justify-center mt-[120px] flex-col gap-3">
                <img width={100} src="/assets/success.svg" alt="success" />
                <span className="text-[#48bb78] font-semibold text-2xl">Send FT successful</span>
                <div className="bg-[#4227922b] w-full rounded-lg h-20 flex items-center mt-[80px] justify-center text-center">
                    <Link target="_blank" className="flex flex-col gap-2 text-white font-semibold" href={`https://nearblocks.io/txns/${hash}`}>
                        <span className="text-sm">TRANSACTION ID:</span>
                        <small>{hash}</small>
                    </Link>
                </div>
                <div className="mt-12 w-full">
                    <button onClick={()=>location.replace("/")} className="px-6 py-3 bg-[#2775CA] hover:bg-[#5290D4] w-full rounded-3xl text-white font-bold">Home</button>
                </div>
            </div>
        </div>
    )
}