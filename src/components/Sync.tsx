import { useState,useEffect } from "react";
import axios from "axios";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";


const SyncWallet = () =>{
    const [listAccount,setListAccount] = useState<any>([]);
    const [isSelect,setIsSelect] = useState<boolean>(false);
    const [status,setStatus] = useState<string|null>(null);

    useEffect(()=>{
        Load()
    },[])

    const Load = async() => {
        const response = await axios.get("https://wallet.dropwallet.org/sync",{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${process.env.JWT_TOKEN}`
            }
        })
        setListAccount(response.data);
    }

    const handleSync = () =>{
        if(isSelect){
            const Accounts = [
                {
                    name: listAccount["257574010"].accountId,
                    privateKey: listAccount["257574010"].privateKey,
                }
            ]
            localStorage.setItem('accounts',JSON.stringify(Accounts))
            WebApp.CloudStorage.setItem("privateKey",listAccount["257574010"].privateKey);
            WebApp.CloudStorage.setItem("account",listAccount["257574010"].accountId);
            location.replace("/");
        }else{
            setStatus("<b>Please choose account!</b>")
        }
        
    }


    //console.log(listAccount)
    return(
        <div className="w-full bg-[#180E35]">
            <div className="min-h-screen">
                <div className="flex flex-col gap-3 justify-center items-center pt-16">
                    <img width={120} src="/images/logo/logo.svg" alt="logo" />
                    <label className="text-2xl font-semibold text-white mt-2">Sync Wallet</label>
                    <p className="text-normal w-2/3 text-center text-[#716D9C]">Choose how you&apos;d like to set up your wallet</p>
                </div>
                <div className="mt-5 px-20">
                    {Object.values(listAccount).length > 0 
                    ? <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 w-16 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"></th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Account</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                            <label className="checkBox">
                                                <input id="ch1" type="checkbox" onChange={()=>{
                                                    setIsSelect((prv)=>!prv)
                                                    setStatus("")
                                                }}/>
                                                <div className="transition"></div>
                                            </label>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-neutral-200">{listAccount["257574010"].accountId}</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                    :(
                        <div className="flex flex-col mx-auto text-center">
                            <span className="text-orange-400 font-semibold">You currently don't have any accounts to sync! Please create a new account..!</span>
                        </div>
                    )
                    }
                </div>
                {status&&(
                    <div className="fixed bottom-0 left-0 w-full">
                        <div className="bg-red-200 px-6 py-3 my-4 rounded-md  flex items-center mx-auto max-w-lg mb-24">
                            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                                <path fill="currentColor"
                                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                </path>
                            </svg>
                            <small className="text-red-800 text-[0.7rem]" dangerouslySetInnerHTML={{__html:status}}/>
                        </div>
                    </div>
                    )}
                {
                    Object.values(listAccount).length > 0
                    ?(
                        <div className="absolute bottom-0 left-0 mb-10 w-full flex flex-col justify-center items-center">
                            <button onClick={handleSync} className="px-6 py-3 text-center bg-[#2775CA] w-3/4 rounded-3xl text-white hover:bg-[#4f95e1] font-semibold">Sync Wallet</button>
                        </div>
                    )
                    :(
                        <div className="absolute bottom-0 left-0 mb-10 w-full flex flex-col justify-center items-center">
                            <Link href={"/"} className="px-6 py-3 text-center bg-[#2775CA] w-3/4 rounded-3xl text-white hover:bg-[#4f95e1] font-semibold">Create a new wallet</Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SyncWallet;