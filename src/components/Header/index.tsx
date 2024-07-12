"use client"
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import Sidebar from "../Sidebar";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Header(){
    const [account,setAccount] = useState<string>('');
    const [isShow,setIsShow] = useState<boolean>(false);
    const [isCopy, setIsCopy] = useState<boolean>(false);

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
    },[account])

    function strucate(str: string){
        const format = str.replace(".near","");
        if(format.length > 10){
            return format.slice(0,3)+'...'+format.slice(-3)+".near";
        }
        return format+'.near';
    }

    function checkCopy(){
        setIsCopy(true)
        setTimeout(function(){
            setIsCopy(false)
        },1000)
    }

    return(
        <div className="sticky top-0 w-full h-full z-20">
            <div className="flex flex-row justify-start bg-[#180E35] overflow-hidden w-full py-3 px-4 border-b border-[#20114f] sticky top-0 z-10">
                <button type="button" onClick={()=>setIsShow((prv)=>!prv)} className="text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle Navigation</span>
                    <img width={25} src="/assets/menu.svg" alt="menu" />
                </button>
                <div className="flex flex-row gap-1 items-center m-auto">
                    {account
                    ? <h1 className="text-xl ml-5 text-center font-semibold text-white">{strucate(account)}</h1>
                    : <div className="animate-pulse">
                        <h1 className="text-xl ml-5 w-28 h-4 text-center font-semibold bg-[#271a56] rounded-lg"></h1>
                    </div>
                    }
                    <CopyToClipboard text={account}
                        onCopy={()=>checkCopy()}>
                        <div className="relative">
                            <button className={`${isCopy?"copy-text":""} flex flex-row hover:bg-[#492ba24e] px-2 py-1 rounded-full justify-between gap-1.5 items-center`}>
                                <span>
                                    <svg width={15} viewBox="0 0 24 24" fill="#ffffff" focusable="false" aria-hidden="true"><path fill="#ffffff" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                                </span>
                            </button>
                        </div>
                    </CopyToClipboard>
                    {/* <button onClick={()=>Copy(account)} className="flex flex-row hover:bg-[#492ba24e] px-2 py-1 rounded-full justify-between gap-1.5 items-center">
                        <span>
                            <svg width={15} viewBox="0 0 24 24" fill="#ffffff" focusable="false" aria-hidden="true"><path fill="#ffffff" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                        </span>
                    </button> */}
                </div>
            </div>
            <div className="bg-black bg-opacity-50 z-40 w-full">
                <Sidebar account={account} isShow={isShow} setIsShow={setIsShow}/>
            </div>

        </div>
    )
}