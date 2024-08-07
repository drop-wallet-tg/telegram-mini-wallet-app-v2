import { useState,useEffect } from "react";
import axios from "axios";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";
import { useRouter } from "next/router";

const SyncWallet = () =>{
    const [listAccount,setListAccount] = useState<any>([]);
    const [isSelect,setIsSelect] = useState<boolean>(false);
    const [status,setStatus] = useState<string|null>(null);
    const [userID,setUserId] = useState<string>('')
    const router = useRouter();

    useEffect(()=>{
        setUserId(WebApp.initDataUnsafe.user?.id.toString() as string)
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
                    name: listAccount[userID].accountId,
                    privateKey: listAccount[userID].privateKey,
                }
            ]
            localStorage.setItem('accounts',JSON.stringify(Accounts))
            WebApp.CloudStorage.setItem("privateKey",listAccount[userID].privateKey);
            WebApp.CloudStorage.setItem("account",listAccount[userID].accountId);
            router.push("/home")
        }else{
            setStatus("<b>Please choose account!</b>")
        }
        
    }
    //console.log("user",userID)

    //console.log(listAccount)
    return(
        <div className="w-full bg-[#180E35]">
            <div className="min-h-screen">
                <div className="flex flex-col gap-3 justify-center items-center pt-16">
                    <img width={120} src="/images/logo/logo.svg" alt="logo" />
                    <label className="text-2xl font-semibold text-white mt-2">Sync Wallet From V1</label>
                    <p className="text-normal w-2/3 text-center text-[#716D9C]">Choose how you&apos;d like to set up your wallet</p>
                </div>
                <div className="mt-5 px-8">
                    {Object.values(listAccount).length > 0 && listAccount[userID]
                    ? <div className="flex flex-col mt-5">
                        <p className="ml-20 text-[#ffffff88]">Account</p>
                        <div className="flex flex-row gap-2 items-center">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                                <label className="checkBox">
                                    <input id="ch1" type="checkbox" onChange={()=>{
                                        setIsSelect((prv)=>!prv)
                                        setStatus("")
                                    }}/>
                                    <div className="transition"></div>
                                </label>
                            </td>
                            <td className="whitespace-nowrap text-white font-semibold">{listAccount[userID]&&listAccount[userID].accountId}</td>
                        </div>
                    </div>
                    :(
                        <div className="flex flex-col mx-auto text-center">
                            <span className="text-orange-400 font-semibold">You currently don&apos;t have any accounts to sync! Please create a new account..!</span>
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
                    Object.values(listAccount).length > 0 && listAccount[userID]
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