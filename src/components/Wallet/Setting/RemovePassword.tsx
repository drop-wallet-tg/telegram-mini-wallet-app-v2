"use client"
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

const RemovePassword = () =>{
    const [password, setPassword] = useState<string>('');
    const [status, setStatus] = useState<string|null>(null)
    const [error, setError] = useState<string|null>(null)

    useEffect(()=>{
        WebApp.CloudStorage.getItem("passwordScreen",(err,rs)=>{
            console.log("rs",rs)
            setPassword(rs as string)
        })
    },[])

    const onRemovePass = () =>{
        if(password){
            WebApp.CloudStorage.removeItems(["passwordScreen","question","answer"])
            setStatus("<b>Remove password successfull</b>")
            setTimeout(() => {
                setStatus(null)
            }, 1500);
        }else{
            setError("<b>Please set up password before!</b>")
            setTimeout(() => {
                setError(null)
            }, 1500);
        }
    }  
    //When passwords are removed from an application, security is significantly reduced, increasing the risk of unauthorized access and data loss.
    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <Header/>
            {status&&(
                <div className="absolute w-full top-16 left-0">
                    <div className="bg-[#ACE1AF] px-4  py-2 w-2/3 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                        <svg viewBox="0 0 24 24" className="text-[#00A86B] w-5 h-5 sm:w-5 sm:h-5 mr-3">
                            <path fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                            </path>
                        </svg>
                        <div className="text-[#00A86B] text-sm" dangerouslySetInnerHTML={{__html:status as string}}/>
                    </div>
                </div>
            )}
            {
                error&&(
                    <div className="absolute w-full top-16 left-0">
                        <div className="bg-red-200 px-4 py-2 my-4 w-2/3 rounded-md text-lg flex gap-2 items-center mx-auto max-w-lg">
                            <img width={18} src="/assets/icon/error.svg" alt="icon" />
                            <div className="text-[#E32636] text-sm" dangerouslySetInnerHTML={{__html:error as string}}/>
                        </div>
                    </div>
                )
            }
            <div className="p-5">
                <div className="flex flex-row items-center text-center">
                    <Link href="/wallet/setting">
                        <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-lg text-white font-bold m-auto">Remove Password</label>
                </div>
                <div className="px-5 mt-10 py-3 bg-yellow-300 bg-opacity-20 shadow-sm rounded-lg flex flex-row gap-3 items-center">
                        <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z" fill="#f5c211"></path> </g></svg>
                        <span className="text-white text-sm">When passwords are removed from an application, security is significantly reduced, increasing the risk of unauthorized access and data loss.</span>
                </div>
                <div className="mt-12 text-white">
                    <h2 className="font-bold text-3xl">Warning!</h2>
                    <span className="text-sm text-[#8a8989]">You are at risk of data loss.</span>
                </div>
                <div className="mt-5 flex flex-row justify-center">
                    <button onClick={onRemovePass} className="px-3 py-2 rounded-full w-72 bg-red-500 mt-4 hover:bg-opacity-85 disabled:bg-opacity-55 text-white ">
                        <span className="font-semibold">Remove password</span>
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default RemovePassword;