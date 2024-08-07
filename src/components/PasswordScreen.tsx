"use client"
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { useRouter } from "next/router";

const PasswordScreen = () =>{
    const [isView, setIsView] = useState<boolean>(false);
    const [password, setPassword] = useState<string|null>(null);
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [passwordScreen, setPasswordScreen] = useState<string|null>(null)
    const [status, setStatus] = useState<string|null>(null)
    const router = useRouter();

    useEffect(()=>{
        WebApp.CloudStorage.getItem("passwordScreen",(err,rs)=>{
            console.log("rs",rs)
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
            router.push("/home")
        }else{
            setStatus("<b>Password was incorrect!</b>")
            setTimeout(() => {
                setStatus(null)
            }, 1200);
        }
    }

    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            <div className="p-5 flex flex-col justify-center items-center text-center text-[#fff]">
                <div className="flex flex-col gap-3 mt-20">
                    <div className="rounded-full p-6 flex flex-row justify-end items-center bg-[#ffffff1a]">
                        <img width={90} src="/images/logo/logo.svg" alt="icon" />
                    </div>
                </div>
                <div className="flex flex-col mt-5 gap-2">
                    <h1 className="font-bold text-3xl">DropWallet</h1>
                    <div className="flex flex-col text-[#c2c2c2]">
                        <span> Welcome Louis</span>
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
            </div>
            {status&&(
                <div className="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                    <svg viewBox="0 0 24 24" className="text-[#E32636] w-5 h-5 sm:w-5 sm:h-5 mr-3">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <div className="text-[#E32636] text-sm" dangerouslySetInnerHTML={{__html:status as string}}/>
                </div>
            )}
        </div>
    )
}

export default PasswordScreen;