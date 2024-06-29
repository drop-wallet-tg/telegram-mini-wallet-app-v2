"use client"
import { useState } from "react";
import Link from "next/link"
import Image from "next/image"


export default function ImportAccount(){
    const [selectIndex,setSelectIndex] = useState<number>(0);
    const [link,setLink] = useState<string>('/wallet/import-wallet/secret');


    const choose = [
        {
            name: "Secret Phrase",
            description: "A 12 words secret phrase",
            example: "eager brand delay ...",
            link: "/wallet/import-wallet/secret"
        },
        {
            name: "Private Key",
            description: "An account private key",
            example: "ed25519:2VyQqF3 ...",
            link: "/wallet/import-wallet/private-key"
        }
    ]
    
    const handleContinue = () =>{
        location.replace(link)
    }

    return(
        <div className="w-full min-h-screen flex justify-between flex-col bg-[#180E35]">
            <div className="p-5">
                <Link href="/">
                    <img className="bg-black bg-opacity-20 w-8 h-8 rounded-full hover:bg-opacity-25"  src="/images/icon/Arrow.svg" alt="arrow" />
                </Link>
                <div className="mt-5">
                    <h5 className="text-white font-bold text-2xl">The Choice is Yours</h5>
                    <span className="text-[#ffffff9b]">How would you like to import your wallet?</span>
                </div>
                {choose.map((dt:any,indx:number)=>{
                    return(
                        <div onClick={()=>{
                            setSelectIndex(indx)
                            setLink(dt.link)
                        }} className="mt-10 cursor-pointer break-words w-full h-32 p-3 bg-[#1b1b2694] bg-opacity-10 text-white rounded-lg border border-gray-200 border-opacity-30 shadow-sm outline-none focus:border-white focus:border-opacity-65">
                            <div className="flex flex-row gap-3">
                                {selectIndex==indx
                                    ?<Image width={22} height={22} src="/assets/check.svg" alt="check" />
                                    :<div className="w-[1.3rem] h-[1.3rem] bg-black bg-opacity-70 border border-gray-100 rounded-full border-opacity-20"></div>
                                }
                                <span className="font-semibold text-white">{dt.name}</span>
                            </div>
                            <p className="text-[#ffffffd5] text-sm mt-3">{dt.description}</p>
                            <div className="flex flex-row justify-end items-end text-sm text-end mt-3">
                                <small>e.g.
                                    <span className="px-2 py-1 bg-black bg-opacity-35 rounded-md">{dt.example}</span>
                                </small>
                            </div>
                        </div>
                    )
                })}
                <div className="mt-10 pt-20 flex flex-row justify-center items-center">
                    <button onClick={handleContinue}  className={`w-3/4  h-[50px] bg-blue-700 hover:bg-blue-600 rounded-full`}>
                        <span className="text-white font-semibold">Continue</span>
                    </button>
                </div>
            </div>
        </div>
    )
}