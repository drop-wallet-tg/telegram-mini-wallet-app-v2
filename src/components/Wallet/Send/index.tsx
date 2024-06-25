"use client"
import { getAmount, getState, getToken, submitTransaction, transferToken } from "@/hooks/SDK";
import WebApp from "@twa-dev/sdk";
import { useEffect,useState } from "react";
import axios from "axios";
import Big from "big.js";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Header = dynamic(()=>import("@/components/Header"),{ssr:false})



export default function Send(){
    const [account,setAccount] = useState<string>('');
    const [privateKey,setPrivateKey] = useState<string>("");
    const [isShow, setIsShow] = useState<boolean>(false);
    const [balance,setBalance] = useState<string>('');
    const [balanceUSD,setBalanceUSD] = useState<string>('');
    const [token,setToken] = useState<any>([]);
    const [select,setSelect] = useState<string>("NEAR");
    const [amount,setAmount] = useState<string>("");
    const [addressSend,setAddressSend] = useState<string>("");
    const [msgAccount,setMsgAccount] = useState<string>("");
    const [status,setStatus] = useState<string>("");
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
        WebApp.CloudStorage.getItem("privateKey",(err,rs)=>setPrivateKey(rs as string))
        if(account){
            loadToken();
            loadBalance();   
        }    
    },[account])
    const loadBalance = async()=>{
        const nearBalance = await getAmount(account)
        const parsedNearBalance = Big(nearBalance)
        .div(Big(10).pow(24))
        .toFixed(5);
        setBalance(parsedNearBalance);
    }

    const loadToken = async()=>{
        const token = await getToken(account);
        console.log("newtoken",token)
        setToken(token);
    }

    const loadBalanceUSD = async(amount:string)=>{
        const tokenPrice  = (await axios.get(`${process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet"  ? process.env.REFFINANCE_MAINNET  : process.env.REFFINANCE_TESTNET}`)).data;
        const nearUsdPrice = parseFloat(tokenPrice['wrap.near'].price);
        const nearBalanceInUsd = parseFloat(amount) * nearUsdPrice ;
        setBalanceUSD(nearBalanceInUsd.toFixed(2))
    }

    const handleChangeAmount = (e:any) =>{
        console.log(e.target.value)
        if(e.target.value.length > 0){
            loadBalanceUSD(e.target.value);
            setAmount(e.target.value);
        }else{
            setAmount("");
            loadBalanceUSD("")
        }
    }
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
    const handleTransferToken = async(e:any)=>{
        e.preventDefault();			
        console.log("transfer");
        setLoading(true);
        if(addressSend){
            if(amount){
                let isEnoughAmount = false;
                let contract = "";
                let decimal = 0;
                token.forEach((element:any) => {
                    if (element.symbol == select) {
                        if (amount <= element.balance) {
                            contract = element.contract;
                            decimal = element.decimals;
                            isEnoughAmount = true;
                        }
                    }
                });
                if(isEnoughAmount){
                    if(addressSend){
                        const stateAccount = await getState(addressSend);
                        if (
                            stateAccount?.response?.type == "AccountDoesNotExist" ||
                            stateAccount?.response?.type == "REQUEST_VALIDATION_ERROR"
                        ) {
                            setMsgAccount(
                                `<b style='color:red;font-size:14px;'>This address does not exist. try again</b>`
                            );
                        } else if(stateAccount?.response?.amount){
                            try{
                                if(amount){
                                    const amounts = (
                                        parseFloat(amount) *
                                        Math.pow(10, decimal)
                                    ).toLocaleString("fullwide", {
                                        useGrouping: false
                                    }) + "";
                                    // console.log(privateKey)
                                    // console.log(addressSend)
                                    // console.log(amounts)
                                    // console.log(contract)
                                    const signedDelegate = await transferToken(
                                        privateKey,
                                        account,
                                        addressSend,
                                        amounts,
                                        contract?contract:"NEAR"
                                        );
                                        console.log(signedDelegate)
                                    const data = await submitTransaction(signedDelegate);
                                    if(data.final_execution_status == "FINAL"){
                                        location.replace(`/wallet/send/success?hash=${data.transaction.hash}`);
                                    }else{
                                        setLoading(false)
                                        setStatus("<b>Error cannt transfer. try again</b>")
                                    }
                                    
                                }
                            }catch(error){
                                setStatus(`<b>${error}</b>`)
                            }
                        }
                    }
                }else{
                    setLoading(false)
                    setStatus(`<b>Not enough balance! Please deposit ${contract?contract:"NEAR"} in your account.</b>`)
                }

            }else{
                setLoading(false)
                setStatus(`<b>Please enter amount you want to send.</b>`)
            }
        }else{
            setLoading(false)
            setStatus(`<b>Please enter address send to.</b>`)
        }
    }
    //console.log("token",token)
    return(
        (
            <div className="w-full min-h-screen bg-[#180E35] relative">
                <Header/>
                {loading&&(
                    <div className="flex z-50 transition-all absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 w-full justify-center items-center h-full">
                        <div className="rounded-full h-12 w-12 bg-violet-900 animate-ping"></div>
                    </div>
                )}
                <form onSubmit={handleTransferToken} className="p-5">
                    <div className="flex flex-row items-center text-center">
                        <Link href="/">
                            <img src="/images/icon/Arrow.svg" alt="arrow" />
                        </Link>
                        <label className="text-lg text-white font-bold m-auto">Send</label>
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
                    <div className="mt-10 m-auto flex justify-center items-center flex-col">
                        <input onChange={handleChangeAmount}  placeholder="0" type="text" className="text-5xl w-[280px] text-white font-bold bg-transparent border-none outline-none px-4 py-2 text-center"/>
                        <div className="text-[#bdbdbda2] mt-2 text-sm ">≈ {balanceUSD} USD</div>
                        <div className="flex flex-row gap-2 mt-2 items-center">
                            <span className="text-[#bdbdbda2] text-sm">Available: <strong>{balance?balance:"~"}</strong></span>
                            <button className="border border-[#383841b8] px-2 rounded-full text-sm text-white hover:bg-[#bdbdbd45]"><small>Use Max</small></button>
                        </div>
                    </div>
                    <div className="relative mt-10">
                        <label className="text-white">Select Asset</label>
                        <button onClick={()=>setIsShow(prv=>!prv)} id="dropdown-button" className="flex mt-2 justify-between w-full px-4 py-3 text-sm font-medium text-white bg-[#331e72] hover:bg-[#473480] rounded-full shadow-sm outline-none">
                            {token.length > 0 ?token.map((dt:any,i:number)=>{
                                if(select==""){
                                    return(
                                        <div key={i} className="mr-2 flex flex-row gap-2 items-center">
                                            <img width={23} src="/assets/near.svg" alt="logo" />
                                            <span className="font-semibold">NEAR</span>
                                        </div>
                                    )
                                }else if(dt.symbol==select){
                                    return(
                                        <div key={i} className="mr-2 flex flex-row gap-2 items-center">
                                            <img width={23} src={dt.icon} alt="logo" />
                                            <span className="font-semibold">{dt.symbol}</span>
                                        </div>
                                    )
                                }
                            }):(
                                <div className="mr-2 flex flex-row gap-2 items-center">
                                    <img width={23} src="/assets/near.svg" alt="logo" />
                                    <span className="font-semibold">NEAR</span>
                                </div>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        {isShow&&(
                            <div id="dropdown-menu" className="w-full absolute right-0 mt-3 rounded-md bg-[#444b9a] z-10 p-1 space-y-1">
                                {token.length > 0?token.map((dt:any,i:number)=>(
                                    <button onClick={()=>{
                                        setSelect(dt.symbol)
                                        setIsShow(false)
                                    }} key={i} className="px-4 flex flex-row gap-2 py-2 w-full text-start outline-none text-white hover:bg-[#473480] cursor-pointer rounded-md">
                                        <img width={23} src={dt.icon} alt="logo" />
                                        <span className="font-semibold text-sm">{dt.symbol}</span>
                                    </button>  
                                )):(
                                    <button onClick={()=>{
                                        setSelect("NEAR")
                                        setIsShow(false)
                                    }} className="px-4 flex flex-row gap-2 py-2 w-full text-start outline-none text-white hover:bg-[#473480] cursor-pointer rounded-md">
                                        <img width={23} src="/assets/near.svg" alt="logo" />
                                        <span className="font-semibold text-sm">NEAR</span>
                                    </button>
                                )}                         
                            </div>
                        )}
                    </div>
                    <div className="mt-5">
                        <label className="text-white">Send To</label>
                        <input onChange={handleVaildNearAccount} type="text" className="w-full text-white bg-[#331e72] mt-2 mb-2 px-4 py-3 rounded-full focus:outline-none placeholder-[#545ba9]" placeholder="Send to account ID"/>
                        <small className="text-white">The account ID must be valid such as.near or contain exactly 64 characters.</small>
                        {msgAccount&&<div dangerouslySetInnerHTML={{__html:msgAccount}}/>}
                    </div>
                    <div className="mt-10 w-full">
                        <button type="submit" className="px-6 py-3 bg-[#2775CA] w-full rounded-3xl text-white font-bold">Send</button>
                    </div>
                </form>
        </div>
        )
    )
}