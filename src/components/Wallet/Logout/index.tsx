"use client"
import { useState,useEffect } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import WebApp from "@twa-dev/sdk";
import { useRouter } from "next/router";

export default function LogOut(){
    const [account, setAccount] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);
    const router = useRouter()

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string));
    },[account])

    const handleLogOut = ()=>{
        setLoading(true);
        WebApp.CloudStorage.removeItems(["privateKey","account"]);
        setLoading(false);
        router.push("/home");
    }

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

    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            {loading&&(
                <div className="flex transition-all fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 w-full justify-center items-center h-full">
                    <div className="rounded-full h-12 w-12 bg-violet-900 animate-ping"></div>
                </div>
            )}
            <Header/>
            <div className="p-5">
                <Link href={"/wallet/setting"} className="flex flex-row items-center text-center">
                    <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                    <label className="text-lg text-white font-semibold m-auto">Log Out</label>
                </Link>
                <div className="pt-10">
                    <div className="px-5 py-3 bg-yellow-300 bg-opacity-20 shadow-sm rounded-lg flex flex-row gap-3 items-center">
                        <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="#f5c211"></path> </g></svg>
                        <span className="text-white text-sm">Please make sure you have already backed up your recovery method or you might lose access to your account</span>
                    </div>
                    <h5 className="mt-10 text-white font-bold text-3xl pb-3">Warning !</h5>
                    <span className="text-[#ffffff72]">This action will remove the following account from your wallet :</span>
                    <div className="border mt-5 border-white border-opacity-20 shadow-sm rounded-md p-5">
                        <code className="text-white">{account&&struncate(account)}</code>
                    </div>
                    <div className="mt-16 flex flex-row items-center justify-center">
                        <button onClick={handleLogOut} className="rounded-full before:ease relative h-12 w-72 overflow-hidden border border-red-500 bg-red-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-red-500 hover:before:-translate-x-40">
                            <div className="flex flex-row items-center px-10">
                                <svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 1024 1024" focusable="false" aria-hidden="true" height="1.2rem" width="1.2rem" xmlns="http://www.w3.org/2000/svg"><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path></svg>
                                <div className="m-auto">
                                    <span className="relative z-10 font-semibold text-lg">Log Out</span>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}