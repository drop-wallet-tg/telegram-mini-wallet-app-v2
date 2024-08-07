"use client"
import { useState } from "react";
import {getState,CreateAccount, submitTransaction} from "../../hooks/SDK";
import WebApp from "@twa-dev/sdk";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CreateWalletv1(){
    const [account, setAccount] = useState<string>('');
    const [msgAccount,setMsgAccount] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);
    const [status,setStatus] = useState<string>('');
    const router = useRouter();

    const handleCreateAccount = async(e:any)=>{
        e.preventDefault();
        if(account){
            setLoading(true)
            const stateAccount = await getState(account);
            console.log("stateAccount",stateAccount)
            if (stateAccount.response?.type == "AccountDoesNotExist") {
                const {signedDelegates,privateKey,seed} = await CreateAccount(account)
                const data = await submitTransaction(signedDelegates);
                const Accounts = [
                    {
                        name: account,
                        privateKey: privateKey
                    }
                ]
                localStorage.setItem('accounts',JSON.stringify(Accounts))
                WebApp.CloudStorage.setItem("privateKey",privateKey);
                WebApp.CloudStorage.setItem("account",account);
                WebApp.CloudStorage.setItem("sedd",seed);
                //console.log(data)
                
                if (data.final_execution_status == "FINAL") {
                    router.push(`/wallet/create-account/success?hash=${data.transaction.hash}`);
                }
                setLoading(false)

            }else{
                setLoading(false)
                setMsgAccount("<b style='color:red;font-size:14px;'>Account is taken!</b>");
            }
            //location.replace(`/wallet/create-account/success?hash=BZbDCSc5qY7h5EEHRFtdUm712EmgNjRR9fbFEacroxJL`);
            //setLoading(false)
        }else{
            setStatus("<b>Please enter your address near.</b>")
        }
    }
    const handleAccount = async(event:any)=>{
        const account = event.target.value;
        var format = /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/g;
		if (!format.test(account.toLowerCase())) {
			setMsgAccount("<b style='color:red;font-size:14px;'>The address has no special characters or blank</b>");
		}
        else {
            setMsgAccount("");
			let newAccount = "";
			if (!account.includes(".near")) {
				newAccount = account.toLowerCase() + ".near";
			} else {
				newAccount = account.toLowerCase();
			}
            const stateAccount = await getState(newAccount);
            if (stateAccount.response?.type == "AccountDoesNotExist") {
                setAccount(newAccount);
            }
        }
        
    }

    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            {loading&&(
                <div className="flex transition-all fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 w-full justify-center items-center h-full">
                    <div className="rounded-full h-12 w-12 bg-violet-900 animate-ping"></div>
                </div>
            )}
            <form onSubmit={handleCreateAccount} className="p-5">
                <div className="flex flex-row items-center text-center">
                    <Link href="/home" className="cursor-pointer hover:bg-black hover:bg-opacity-35 rounded-full">
                        <img src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-xl text-white font-semibold m-auto">Your Account Identity</label>
                </div>
                {status&&(
                        <div className="bg-red-200 px-6 py-4 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                                <path fill="currentColor"
                                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                </path>
                            </svg>
                            <div className="text-red-800 text-sm" dangerouslySetInnerHTML={{__html:status}}/>
                        </div>
                    )}
                <p className="w-2/3 mt-8 text-[#b6afff92]">What would you like your custom Near wallet address to be?</p>
                <div className={`mt-5 m-auto rounded-xl group border ${account?msgAccount?"border-red-600 hover:border-red-600":"border-[#2fe87f] hover:border-[#2fe87f]":"border-[#b6afff71] hover:border-[#B5AFFF]"} flex flex-row justify-between items-center`}>
                    {/* <input onChange={handleAccount} type="text" className={`w-full ${account?msgAccount?"text-red-600":"text-[#2fe87f]":"text-[#B5AFFF]"} px-4 py-3 rounded-tl-xl rounded-bl-xl bg-transparent focus:outline-none placeholder-[#b6afff4e]`} placeholder="your address near"/> */}
                    <input onChange={handleAccount} type="text" className={`w-full ${account?msgAccount?"text-red-600":"text-[#2fe87f]":"text-[#B5AFFF]"} px-4 py-3 rounded-tl-xl rounded-bl-xl bg-transparent focus:outline-none placeholder-[#b6afff4e]`} placeholder="your address near"/>
                    <label className={`${account?msgAccount?"bg-red-600 group-hover:bg-red-600":"bg-[#1ae070] group-hover:bg-[#2fe87f]":"bg-[#b6afff71] group-hover:bg-[#B5AFFF]"} rounded-br-xl rounded-tr-xl px-4 py-3`}>.near</label>
                </div>
                {msgAccount&&<div dangerouslySetInnerHTML={{__html:msgAccount}}/>}
                <div>
                    <div className="flex flex-row gap-5">
                        <img className="-mt-10" src="/images/icon/success.svg" alt="sucess" />
                        <div className="flex mt-10 flex-col">
                            <div className="text-sm text-[#b6afff65]">
                                <p>Your account ID</p>
                                <p>can contain any of the following:</p>
                            </div>
                            <ul className="text-sm ml-3 mt-3 text-[#B5AFFF] list-disc">
                                <li>Lowercase characters (a-z)</li>
                                <li>Digits (0-9)</li>
                                <li>Characters (_-) can be used as separators</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5">
                        <img className="-mt-8" src="/images/icon/band.svg" alt="sucess" />
                        <div className="flex mt-10 flex-col">
                            <div className="text-sm text-[#b6afff65]">
                                <p>Your account ID cannot contain:</p>
                            </div>
                            <ul className="text-sm ml-3 mt-3 text-[#B5AFFF] list-disc">
                                <li>Characters &quot;@&quot; or &quot;.&quot;</li>
                                <li>More than 64 characters (including .near)</li>
                                <li>Fewer than 2 characters</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex text-sm flex-col mt-10 gap-1">
                    <p className="text-[#b6afff65]">Prefer a traditional crypto wallet id?</p>
                    <p className="text-[#b6afffa5] underline">Use Implicit Account</p>
                </div>
                <div className="mt-8 w-full flex flex-col justify-center items-center">
                    {/* <button onClick={handleCreateAccount} disabled={!account&&true} className={`px-6 py-3 ${account?"bg-[#2775CA] hover:bg-[#4f95e1]":"bg-black bg-opacity-25 "} w-3/4 rounded-3xl text-white font-semibold`}>Continue</button> */}
                    <button type="submit" disabled={!account&&true} className={`px-6 py-3 ${account?"bg-[#2775CA] hover:bg-[#4f95e1]":"bg-black bg-opacity-25 "} w-3/4 rounded-3xl text-white font-semibold`}>Continue</button>
                </div>
            </form>
        </div>
    )
}