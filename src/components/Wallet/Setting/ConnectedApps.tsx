"use client"
import dynamic from "next/dynamic";
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";


const Header = dynamic(()=>import("@/components/Header"),{ssr:false})

export default function ConnectedApps(){
    const [account,setAccount] = useState<string>('');
    const [txns,setTxns] = useState<any>([]);

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string));
        if(account){
            loadActives()
        }
    },[account])

    const loadActives = async() =>{
        const data = await fetch(`https://api3.nearblocks.io/v1/kitwallet/account/${account}/activities`);
        //console.log("data",await data.json());
        setTxns(await data.json());
    }
    //console.log("txsn",txns)
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <Header/>
            <div className="mt-1 p-5">
                <Link href={"/wallet/setting"} className="flex flex-row items-center text-center">
                    <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                    <label className="text-lg text-white font-semibold m-auto">Connected Apps</label>
                </Link>
                    {txns.length > 0 && txns.map((data:any,index:number)=>{
                        console.log(data)
                        if(data.action_kind == "ADD_KEY"){
                            return(
                                <div key={index} className="border mt-5 border-[#363636] shadow-sm rounded-md p-5">
                                    <div className="flex flex-col items-start justify-start gap-2">
                                        <p className="text-white font-medium">{data.args.access_key.permission.permission_details&&data.args.access_key.permission.permission_details.receiver_id}</p>
                                        <button type="button">
                                            <span
                                                className="text-primary py-1 px-3 text-xs border border-red-600 rounded-full hover:bg-gray-gray1 mb-2 mr-2">
                                                <span className="lg:inline leading-5 text-red-600">Deauthorize</span>
                                            </span>
                                        </button>
                                        <div className="w-full bg-[#2f2649] p-3 break-words mt-2 rounded-lg">
                                            <span className="text-[#bdbdbdb9] text-sm">{data.args.public_key}</span>
                                        </div>
                                        <hr className="w-full h-[0.1px] border-t border-opacity-35 border-gray-100 mt-2"/>
                                        <div className="flex w-full flex-col">
                                            <div className="flex flex-row justify-between items-center">
                                                <span className="text-[#bdbdbdb9]">Gas Fee Allowance</span>
                                                {data.access_key&&data.access_key.permission.permission_details.allowance&&<span>Unlimited</span>}
                                            </div>
                                            <div className="text-[#bdbdbdb9] flex flex-row justify-between items-center">
                                                <span>Allowed Method</span>
                                                <span>{data.access_key&&data.access_key.permission.permission_details.method_names.length > 0 ?data.access_key.permission.permission_details.method_names[0]:"Any"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
            </div>
        </div>
    )
}