"use client"
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Header = dynamic(()=>import("@/components/Header"),{ssr:false})


export default function BluntSuccess(){
    const [account,setAccount] = useState<string>('');
    const tokenId = localStorage.getItem("tokenId") || "";
    const title = localStorage.getItem("title") || "";
    const contractId = localStorage.getItem("contractId") || "";
    const nonce = localStorage.getItem("nonce") || "";
    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string)); 
    },[account])
    //console.log(localStorage.getItem("title") as string)
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <Header/>
            <div className="flex p-5 items-center justify-center mt-[50px] flex-col gap-3">
                <img width={100} src="/assets/success.svg" alt="success" />
                {contractId&&tokenId?(
                    <div className="flex flex-col gap-2 items-center justify-center text-center w-80">
                        <span className="text-[#48bb78] font-semibold text-xl">You are in Blunt DAO</span>
                        <small className="text-[#ffffff7c]">You an og validator. Now you can onboard others to blunt dao the same way. You are an og validator</small>
                        <Link className="text-white font-semibold" target="_blank" href={`https://near.social/agwaze.near/widget/GenaDrop.NFTDetails?contractId=${contractId}&tokenId=${tokenId}`}>
                            Open your NFT
                        </Link>
                    </div>
                ):(
                    <span className="text-[#48bb78] font-semibold text-xl">You post Near Social Success</span>
                )}
                <div className="bg-[#4227922b] w-full rounded-lg h-20 flex items-center mt-[80px] justify-center text-center">
                    <Link target="_blank" className="flex flex-col gap-2 text-white font-semibold" href={`https://near.social/mob.near/widget/MainPage.N.Post.Page?accountId=${account}&blockHeight=${nonce}`}>
                        <span className="text-sm">TITLE (open Near Social):</span>
                        <p className="text-xl">{title}</p>
                    </Link>
                </div>
                <div className="mt-12 w-full">
                    <button onClick={()=>location.replace("/")} className="px-6 py-3 bg-[#2775CA] hover:bg-[#5290D4] w-full rounded-3xl text-white font-bold">Home</button>
                </div>
            </div>
        </div>
    )
}