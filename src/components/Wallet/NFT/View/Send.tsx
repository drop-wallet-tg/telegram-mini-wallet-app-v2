"use client"
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { getState, submitTransaction, transferNFT } from "@/hooks/SDK";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Header = dynamic(()=>import("@/components/Header"),{ssr:false})


export default function Send(){
    const [account,setAccount] = useState<string>('');
    const [privateKey,setPrivateKey] = useState<string>("");
    const [nft,setNFT] = useState<any>(JSON.parse(localStorage.getItem("nft") as string));
    const [contractName,setContractName] = useState<string>(localStorage.getItem("contract_name") as string);
    const [tokenId,setTokenId] = useState<string>(localStorage.getItem("tokenId") as string);
    const [addressSend,setAddressSend] = useState<string>("");
    const [msgAccount,setMsgAccount] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);
    const [status,setStatus] = useState<string>('');

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string));
        WebApp.CloudStorage.getItem("privateKey",(err,rs)=>setPrivateKey(rs as string));
    },[account])
    //console.log("nft",nft.media)
    const handleVaildNearAccount = (event:any)=>{
        const nearAccount = event.target.value;
        var format = /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/g;
		if (!format.test(nearAccount.toLowerCase())) {
			setMsgAccount(`<b style='color:red;font-size:14px;'>Error not a valid Near address.</b>`);
		}else if (!nearAccount.includes(".near")) {
            setMsgAccount("<b style='color:red;font-size:14px;'>Error not a valid Near address.</b>");
        } 
        else {
			setMsgAccount("");
            setAddressSend(nearAccount);
        }
    }
    const handleTransferNFT = async()=>{			
        console.log("transfer nft")
        setLoading(true);
        const stateAccount = await getState(addressSend);
        if (
			stateAccount.response?.type == "AccountDoesNotExist" ||
			stateAccount.response.type == "REQUEST_VALIDATION_ERROR"
		) {
			setMsgAccount(
				`<b style='color:red;font-size:14px;'>this address does not exist. try again</b>`
			);
		}
        if(stateAccount.response.amount){
            const signedDelegate = await transferNFT(privateKey,account,addressSend,tokenId,contractName);
		    const data = await submitTransaction(signedDelegate);
            if (data.transaction_outcome.outcome.status) {
                setLoading(false)
                localStorage.setItem("hash",data.transaction.hash);
                location.replace(`/wallet/nfts/collection/${contractName}/token/${tokenId}/sendSingle/success`)
            }else{
                setStatus("<b>Error cannt transfer. try again</b>")
            }
            
        }
    }
    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            <Header/>
            {loading?(
                <div className="flex justify-center -mt-12 items-center h-screen">
                    <div className="rounded-full h-12 w-12 bg-violet-800 animate-ping"></div>
                </div>
            ):(
                <div className="p-5 h-[85vh]">
                <div className="flex flex-row items-center text-center">
                    <Link href={`/wallet/nfts/collection/${contractName}/token/${tokenId}`}>
                        <img src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-xl shadow-lg text-white font-bold m-auto ">Send</label>
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
                <div className="mt-10 flex flex-col items-center justify-center">
                {nft.media?(
                        <img width={180} className="rounded-lg" src={nft.media} alt="image" />
                    ):(
                        <img src="/images/svg/card.svg" alt="image" />
                    )}
                    <span className="mt-5 text-white font-semibold">
                    {nft.title
                        ? nft.title
                        : "Unkown Title"
                    }
                    </span>
                    <small className="mt-1 text-[#7c7c7c]">
                        {
                            contractName&&(
                                `(${contractName} #${tokenId})`
                            )
                        }
                    </small>
                </div>
                <div className="mt-5">
                    <label className="text-white">Send To</label>
                    <input onChange={handleVaildNearAccount} type="text" className="w-full text-white bg-[#331e72] mt-2 mb-2 px-4 py-3 rounded-full focus:outline-none placeholder-[#545ba9]" placeholder="Send to account ID"/>
                    <small className="text-white">The account ID must be valid such as.near or contain exactly 64 characters.</small>
                    {msgAccount&&<div dangerouslySetInnerHTML={{__html:msgAccount}}/>}
                </div>
                <div className="mt-10 w-full">
                    <button onClick={handleTransferNFT} className="px-6 py-3 bg-[#2775CA] w-full rounded-3xl text-white font-bold">Send</button>
                </div>
            </div>
            )}
        </div>
    )
}