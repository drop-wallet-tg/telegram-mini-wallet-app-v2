"use client"
import Footer from "@/components/Footer";
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import dynamic from "next/dynamic";
import Link from "next/link";


const Header = dynamic(()=>import("@/components/Header"),{ssr:false})

export default function History(){
    const [account,setAccount] = useState<string>('');
    const [txns,setTxns] = useState<any>([]);

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string));
        if(account){
            loadHistory()
        }
    },[account])
    const loadHistory = async() =>{
        const data = await fetch(`https://api3.nearblocks.io/v1/account/${account}/txns?order=desc`);
        //console.log("data",await data.json());
        setTxns(await data.json());
    }
    const loadNFT = (hash:string)=>{
        const data = fetch(`https://api3.nearblocks.io/v1/txns/${hash}`);
        return data;
    }
    const truncateString = (string = '', maxLength = 50) => 
    string.length > maxLength 
        ? `${string.substring(0, maxLength)}…`
        : string;

    function struncate(str: string){
        let account;
        if(str){
            if(str.length > 30){
                const format = str.replace(".near","");
                account = format.slice(0,3)+'...'+format.slice(-3);
            }else{
                account = str;
            }
        }
        return account as string;
    }

    console.log("txns",txns)
    return(
        <div className="w-full bg-[#180E35] relative">
            <div className="min-h-screen">
                <Header/>
                <div className="p-5 mt-5 z-0">
                    <div className="flex flex-row justify-between items-center">
                        <label className="text-md text-[#bdbdbd] font-semibold">All Activities</label>
                        <img width={17} src="/images/svg/redo.svg" alt="icon_loading" />
                    </div>
                    {Object.values(txns).map((dt:any)=>{ 
                        return(
                            dt.map((data:any,index:number)=>{
                                const formatDate = new Date(Number(data.block_timestamp)/1000000);
                                
                                return(
                                    <Link target="_blank" href={`https://nearblocks.io/txns/${data.transaction_hash}`} key={index} className="h-[16vh] flex flex-col justify-between px-5 mt-3 rounded-lg w-full bg-[#2f2649] hover:bg-[#2f2649bf]">
                                        <div className="flex flex-row gap-5 mt-4">
                                        <img width={35} src="/images/logo/logo.svg" alt="icon" />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-white font-semibold capitalize">
                                                    {data.actions[0].action=="UNKNOWN" || (data.actions[0].action== "FUNCTION_CALL"&&data.actions[0].method!= "nft_mint")
                                                    ?"App Interaction"
                                                    :data.actions[0].method=="nft_mint"?"Mint":data.actions[0].action.toLowerCase()}
                                                </p>
                                                <small className="text-[#bdbdbd] text-[0.7rem]">
                                                    {data.actions[0].action== "FUNCTION_CALL"
                                                        ?data.actions[0].method== "set"||data.actions[0].method!= "nft_mint"
                                                        ?(
                                                            <div className="flex flex-row gap-1">
                                                                <p>Called</p>
                                                                <p className="px-2 bg-[#403363] rounded-md">{data.actions[0].method}</p>
                                                                <p>on</p>
                                                                <p className="px-2 bg-[#403363] rounded-md">{struncate(data.receiver_account_id)}</p>
                                                            </div>
                                                        )
                                                        :data.actions[0].method== "nft_mint"&&<p className="font-semibold">with {struncate(data.receiver_account_id)}</p>
                                                    :data.actions[0].action =="UNKNOWN"
                                                        ?<p>with {struncate(data.receiver_account_id)}</p>
                                                        :<p>to {struncate(data.receiver_account_id)}</p>
                                                    }
                                                </small>
                                            </div>
                                        </div>
                                        <div className="text-sm text-[#bdbdbd9c] mt-2 mb-2 flex flex-row justify-between">
                                            <small>{truncateString(data.transaction_hash,12)}</small>
                                            <small>{`${formatDate.getFullYear()}/${formatDate.getMonth()}/${formatDate.getDay()}`}&nbsp;&nbsp;{`${formatDate.getHours()<10?`0${formatDate.getHours()}`:formatDate.getHours()}:${formatDate.getMinutes()<10?`0${formatDate.getMinutes()}`:formatDate.getMinutes()}`}</small>
                                        </div>
                                    </Link>
                                )
                            })
                        )
                    })}
                </div>
            </div>
            <Footer/>
        </div>
    )
}