import Link from "next/link"
import { useState } from "react"
import WebApp from "@twa-dev/sdk";
import * as Near from "near-api-js";
import { getAccount } from "@/hooks/SDK";

export default function ImportWallet(){
    const [privateKey,setPrivateKey] = useState<string>('');
    const [publicKey, setPublicKey] = useState<string>('');
    const [status,setStatus] = useState<string>('');
    const [loading,setLoading] = useState<boolean>(false);

    const handlePrivateKey = async(event:any)=>{
        const privateKey = event.target.value;
        if(privateKey.length > 90 && privateKey.startsWith("ed25519")){
            setPrivateKey(privateKey)
            const keypair = Near.KeyPair.fromString(privateKey);
            const publicKey = keypair.getPublicKey().toString();
            setPublicKey(publicKey);
        }else{
            setStatus("<b>Invalid key. Please check your input and try again!</b>")
        }
    }

    const handleFind = async() => {
        setLoading(true)
        const account = await getAccount(publicKey);
        if(account){
            WebApp.CloudStorage.setItem("privateKey",privateKey);
            WebApp.CloudStorage.setItem("account",account[0]);
            WebApp.CloudStorage.removeItem("seed");
            setLoading(false)
            location.replace("/")
        }else{
            setLoading(false)
            setStatus("<b>Invalid key. Please check your input and try again!</b>");
        }
    }
    return(
        <div className="w-full min-h-screen flex justify-between flex-col bg-[#180E35]">
            {loading&&(
                    <div className="flex z-50 transition-all fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 w-full justify-center items-center h-screen">
                        <div className="rounded-full h-12 w-12 bg-violet-900 animate-ping"></div>
                    </div>
                )}
            <div className="p-5">
                <Link href="/">
                    <img className="bg-black bg-opacity-20 w-8 h-8 rounded-full hover:bg-opacity-25"  src="/images/icon/Arrow.svg" alt="arrow" />
                </Link>
                <div className="mt-10">
                
                </div>
                <div className="mt-10">
                    <h5 className="text-white font-semibold text-2xl">Private Key</h5>
                    <p className="text-white text-opacity-60 mt-2">Provide the wallet's private key to import the wallet</p>
                </div>
                <div className="mt-10">
                    <span className="text-white font-semibold">Private crypto key</span>
                    <textarea onChange={handlePrivateKey} className="mt-2 w-full h-28 px-3 py-2 text-white rounded-lg border border-gray-200 border-opacity-30 shadow-sm bg-transparent outline-none focus:border-white focus:border-opacity-65"></textarea>
                </div>
                <div className="mt-5">
                    <span className="text-white font-semibold">Public Key</span>
                    <div className="mt-2 break-words w-full h-28 px-3 py-2 text-white rounded-lg border border-gray-200 border-opacity-30 shadow-sm bg-transparent outline-none focus:border-white focus:border-opacity-65">
                        <code>
                            {publicKey?publicKey:"-"}
                        </code>
                    </div>
                </div>
                {status&&(
                        <div className="bg-red-200 px-6 py-4 my-4 mt-5 rounded-md text-lg flex items-center mx-auto max-w-lg">
                            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                                <path fill="currentColor"
                                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                </path>
                            </svg>
                            <div className="text-red-800 text-[0.5rem]" dangerouslySetInnerHTML={{__html:status}}/>
                        </div>
                    )}
                <div className="mt-10 flex flex-row justify-center items-center">
                    <button onClick={handleFind} disabled={!publicKey&&true} className={`w-3/4  h-[50px] ${publicKey?"bg-blue-700 bg-opacity-50 hover:bg-blue-600":"bg-black bg-opacity-20"} rounded-full`}>
                        <span className="text-white font-semibold">Import Account</span>
                    </button>
                </div>
            </div>
        </div>
    )
}