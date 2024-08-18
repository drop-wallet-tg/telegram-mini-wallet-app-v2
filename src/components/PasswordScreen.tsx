"use client"
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { useRouter } from "next/router";
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import {decode as base64_decode} from 'base-64';

const PasswordScreen = () =>{
    const [account,setAccount] = useState<string|null>(null);
    const [isView, setIsView] = useState<boolean>(false);
    const [password, setPassword] = useState<string|null>(null);
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [passwordScreen, setPasswordScreen] = useState<string|null>(null)
    const [status, setStatus] = useState<string|null>(null)
    const router = useRouter();
    const url = window.location.href.replace(`${window.location.origin}/`,"")
    const search = useSearchParams()
    const action = search.get("action")
    const app = search.get("app")
    console.log("url",url)

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
    },[account])

    useEffect(()=>{
        WebApp.CloudStorage.getItem("passwordScreen",(err,rs)=>{
            setPasswordScreen(rs as string)
        })
    },[])

    const onChangePass = (event:any) =>{
        const pass = event.target.value.trim();
        if(pass){
            setIsDisable(false)
            setPassword(pass)
        }
    }

    const handleUnlock = () =>{
        if(password == passwordScreen){
            switch(action){
                case "openApp":
                    switch(app){
                        case "potlock":
                            router.push("/digital/potlock")
                        default:
                            return ;
                    }
                case "sendTransaction":
                    router.push(`/home${url}`)
                default:
                    return;
            }
        }else{
            setStatus("<b>Password was incorrect!</b>")
            setTimeout(() => {
                setStatus(null)
            }, 1200);
        }
    }

    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            {status&&(
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-full">
                    <div className="bg-red-200 w-3/4 px-4 py-2 my-4 rounded-md text-lg flex gap-2 items-center mx-auto max-w-lg">
                        <img width={18} src="/assets/icon/error.svg" alt="icon" />
                        <div className="text-[#E32636] text-sm" dangerouslySetInnerHTML={{__html:status as string}}/>
                    </div>
                </div>
            )}
            <div className="p-5 flex flex-col justify-center items-center text-center text-[#fff]">
                <div className="flex flex-col gap-3 mt-12">
                    <div className="rounded-full p-6 flex flex-row justify-end items-center bg-[#ffffff1a]">
                        <img width={90} src="/images/logo/logo.svg" alt="icon" />
                    </div>
                </div>
                <div className="flex flex-col mt-5 gap-2">
                    <h1 className="font-bold text-3xl">DropWallet</h1>
                    <div className="flex flex-col text-[#c2c2c2]">
                        <span> Welcome <strong>{account&&account.replace(".near","")}</strong></span>
                        <span>The decentralized web awaits...</span>
                    </div>
                </div>
                <div className="mt-20 flex flex-col w-4/5 justify-center items-center">
                    <div className="flex flex-row w-full px-3 py-2 bg-black bg-opacity-30 rounded-full items-center">
                        <input onChange={onChangePass} placeholder="Enter Password" type={`${isView?"text":"password"}`} className="w-full bg-transparent border-none outline-none px-3 py-2 placeholder:text-[#9191918a]" />
                        <button onClick={()=>setIsView((prv)=>!prv)} className="bg-white bg-opacity-10 rounded-full p-2 flex justify-center items-center">
                            {
                                isView?
                                <img width={20} height={20} src="/assets/icon/view.svg" alt="icon" />
                                :<img width={20} height={20} src="/assets/icon/not-view.svg" alt="icon" />
                            }
                        </button>
                    </div>
                    <button disabled={isDisable} onClick={handleUnlock} className="px-3 py-2 w-full rounded-full bg-[#411EDF] mt-4 hover:bg-opacity-85 disabled:bg-opacity-55 disabled:text-[#c2c2c2] text-[#fff]">
                        <span className="font-semibold">Unlock</span>
                    </button>
                </div>
                <div className="mt-16">
                    <Link href="/wallet/setting/reset-password">
                        <span className="text-[#b8b8b8] underline">Reset password?</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PasswordScreen;