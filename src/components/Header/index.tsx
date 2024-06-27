"use client"
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import copy from 'copy-text-to-clipboard';
import Sidebar from "../Sidebar";

export default function Header(){
    const [account,setAccount] = useState<string>('');
    const [isShow,setIsShow] = useState<boolean>(false);
    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
    },[account])

    function strucate(str: string){
        let account;
        if(str){
            if(str.length > 30){
                const format = str.replace(".near","");
                account = format.slice(0,3)+'...'+format.slice(-3);
            }else{
                account = str;
            }
        }
        return account;
    }
    //console.log(strucate(account))
    return(
        <div>
            <div className="flex flex-row justify-start bg-[#180E35] w-full py-3 px-4 border-b border-[#20114f] sticky top-0 z-50">
                <button type="button" onClick={()=>setIsShow((prv)=>!prv)} className="text-gray-500 hover:text-gray-600" data-hs-overlay="#docs-sidebar" aria-controls="docs-sidebar" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle Navigation</span>
                    <img width={25} src="/assets/menu.svg" alt="menu" />
                </button>
                <div className="flex flex-row gap-1 items-center m-auto">
                    <h1 className="text-xl ml-5 text-center font-semibold text-white">{strucate(account)}</h1>
                    <button onClick={()=>copy(account)} className="flex flex-row hover:bg-[#492ba24e] px-2 py-1 rounded-full justify-between gap-1.5 items-center">
                        <span>
                            <svg width={15} viewBox="0 0 24 24" fill="#ffffff" focusable="false" aria-hidden="true"><path fill="#ffffff" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>
                        </span>
                    </button>
                </div>
            </div>
            <div className="bg-black bg-opacity-50 z-40 w-full">
                <Sidebar account={account} isShow={isShow} setIsShow={setIsShow}/>
            </div>
        </div>
    )
}