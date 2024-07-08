"use client"
import { useState,useEffect } from "react"
import Footer from "../Footer"
import "./styles.module.css"
import { CheckBalance, getAmount, getNFT, getToken } from "@/hooks/SDK";
import Big from 'big.js';
import axios from "axios";
import WebApp from "@twa-dev/sdk";
import dynamic from "next/dynamic";
import Link from "next/link";


const Header = dynamic(()=>import("@/components/Header"),{ssr:false})
const CreateWallet = dynamic(()=>import("@/components/Wallet/CreateWallet"),{ssr:false})

const Home = () => {
    const [account,setAccount] = useState<string|null>(null);
    const [balance,setBalance]= useState<number>(0);
    const [token,setToken] = useState<any>([]);
    const [nfts, setNFTs] = useState<any>([]);
    const [totalNft,setTotalNFT] = useState<number>(0);
    const [pending,setPending] = useState<boolean>(false);

    
    useEffect(()=>{
        localStorage.setItem("linkIndex",'0')
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
        if(account){
            load();
            loadNFT();
            loadToken();
        }
    },[account])
    

    const load = async()=>{
        const nearBalance =  await getAmount(account as string)
        const tokenPrice  = (await axios.get(`${process.env.NEXT_PUBLIC_NETWORK_ID =="mainnet"  ? process.env.REFFINANCE_MAINNET  : process.env.REFFINANCE_TESTNET}`)).data;
        const nearMetadata = {
            spec: 'ft-1.0.0',
            name: 'NEAR',
            symbol: 'NEAR',
            icon: "/assets/near.svg",
            reference: null,
            reference_hash: null,
            decimals: 24
        }
        const parsedNearBalance = Big(nearBalance)
            .div(Big(10).pow(nearMetadata.decimals))
            .toFixed(5);
            
        const nearUsdPrice = parseFloat(tokenPrice['wrap.near'].price);
        
        const nearBalanceInUsd = parseFloat(parsedNearBalance) * nearUsdPrice ;
        setBalance(nearBalanceInUsd)
    }
    const loadToken = async() =>{
        const tokenBalance = await CheckBalance(account as string);
        const token = await getToken(account as string);
        WebApp.CloudStorage.setItem("token",JSON.stringify(token));
        setToken(tokenBalance)
    }

    const loadNFT = async() =>{
        setPending(true)
        const {data} = await getNFT(account as string);
        //setNFTs(data.nft);
        if(Object.keys(data).length > 0){
            let totalNft = 0;
            let listNFT:any = [];
            const contractOwnedList = Object.keys(data.nft);
            contractOwnedList.forEach((item, index) => {
                totalNft += data.nft[item].length;
                //console.log("nft",data.nft[item].at(-1))
                listNFT.push(<Link key={index} href={`/wallet/nfts/collection/${data.nft[item][index].nft_contract_id}`} className="flex flex-col items-start relative">
                    {data.nft[item].at(-1).media?(
                        <img className="rounded-xl" width={110} src={data.nft[item].at(-1).media} alt="NFT"/>
                    ):(
                        <img width={110} src="/images/svg/card.svg" alt="NFT"/>
                    )}
                    {/* py-2 text-[0.7rem] absolute ml-2 w-full bottom-0 flex flex-row items-center  gap-2 */}
                    <div className="title">
                        <div className="sub-title">
                            <p className="text-[#b5afff]">
                            {data.nft[item][index].nft_contract_id
                                    ? data.nft[item][index].nft_contract_id
                                    : "Unkown Title"}
                            </p>
                        </div>
                        <div className="sub-length">
                            <p>{data.nft[item].length}</p>
                        </div>
                    </div>
                </Link>)
            });
            setNFTs(listNFT)
            setTotalNFT(totalNft);
            setPending(false)
        }else{
            setPending(false)
            setTotalNFT(0)
        }
    }

    //console.log("user telegram",WebApp.initDataUnsafe.user?.id)
    console.log("balance",balance)
    return(
        <div>
            {account?(
            <div className="w-full bg-[#180E35]">
                <div className="min-h-screen">
                {/* Top Header */}
                <Header/>
                {/* Container Top */}
                <div className="relative">
                    <div className="flex items-center overflow-y-scroll scroll-smooth flex-col mt-5 justify-center">
                        <div className="text-center flex flex-row gap-2 items-center">
                            <span className="text-sm text-[#716D9C]">Available Balance</span>
                            <img src="./images/svg/info.svg" alt="info"/>
                        </div>
                        <div className="text-center mt-1">
                            {balance == 0 || balance > 0
                            ? <h2 className="text-[60px] text-white font-semibold">${balance.toFixed(2)}</h2>
                            : <div className="animate-pulse">
                                <div className="h-20 w-24 bg-[#271a56] rounded-lg"></div>
                            </div>
                            }
                        </div>
                        <div className="mt-5">
                            <div className="flex flex-row text-[#f2f1ff95] justify-between items-center gap-2">
                                <Link href="/wallet/send" className="flex flex-col gap-3 cursor-pointer justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" loading="lazy" alt="icon" />
                                        <img width={20} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src="/images/svg/home.svg" alt="icon" />
                                    </div>
                                    <label>Send</label>
                                </Link>
                                <Link href="/wallet/nfts/mint" className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" loading="lazy" alt="icon" />
                                        <img width={20}  src="/images/svg/add.svg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="icon" />
                                    </div>
                                    <label>Mint NFT</label>
                                </Link>
                                <Link href="/wallet/vibe" className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" loading="lazy" alt="icon" />
                                        <img width={20} src="/images/svg/x.svg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="icon" />
                                    </div>
                                    <label>Vibe</label>
                                </Link>
                                <Link href="/social/blunt" className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" loading="lazy" alt="icon" />
                                        <img width={23} src="/assets/blunt.svg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="icon" />
                                    </div>
                                    <label>Blunt Dao</label>
                                </Link>
                                <Link href="/social/post" className="flex flex-col gap-3 justify-center items-center">
                                    <div className="relative">
                                        <img src="/images/svg/background_icon.svg" loading="lazy" alt="icon" />
                                        <img width={20} src="/images/svg/post.svg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" alt="icon" />
                                    </div>
                                    <label>Post</label>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Container Top */}
                    <div className="mt-5">
                        <div className="mt-3 px-4 py-2">
                            <div className="flex flex-row justify-between items-center">
                                <label className="text-sm font-semibold text-[#716D9C]">My Assets</label>
                                <img width={15} src="/images/svg/redo.svg" alt="icon_loading" />
                            </div>
                            {token?token.length == 0?(
                                <div className="h-[13vh] flex flex-row justify-between items-center px-5 mt-3 rounded-lg w-full bg-[#2f2649]">
                                    <div className="flex flex-row gap-3">
                                        <img src="/images/logo/icon_near.svg" width={45} alt="logo" />
                                        <div className="flex flex-col justify-between items-start">
                                            <p className=" text-white font-semibold">NEAR</p>
                                            <small className="text-[#1d5cb0] font-medium">0 NEAR</small>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <p className="text-white">$0.00</p>
                                        <div className="flex flex-row gap-1.5">
                                            <img src="/images/icon/icon_up.svg" alt="icon"/>
                                            <small className="text-[#26a269]">8.7%</small>
                                        </div>
                                    </div>
                                </div>
                            ):(
                                token.length>0&&token.map((dt:any,i:number)=>(
                                    <div key={i} className="h-[13vh] flex flex-row justify-between items-center px-5 mt-3 rounded-lg w-full bg-[#2f2649]">
                                        <div className="flex flex-row gap-3">
                                            <img src="/images/logo/icon_near.svg" width={45} alt="logo" />
                                            <div className="flex flex-col justify-between items-start">
                                                <p className="text-white font-semibold">NEAR</p>
                                                {dt.balance
                                                ?<small className="text-[#1d5cb0] font-medium">
                                                    {dt.balance} {dt.symbol}
                                                </small>
                                                :<small className="h-4 animate-pulse -ml-2 w-20 bg-[#271a56] rounded-lg"></small>
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            {dt.balanceInUsd
                                            ? <p className="text-white">${dt.balanceInUsd}</p>
                                            : <p className="h-4 animate-pulse mb-2 w-20 bg-[#271a56] rounded-lg"></p>
                                            }
                                            <div className="flex flex-row gap-1.5">
                                                <img src="/images/icon/icon_up.svg" alt="icon"/>
                                                <small className="text-[#26a269]">8.7%</small>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ):(
                                <div className="h-[13vh] flex flex-row justify-between items-center px-5 mt-3 rounded-lg w-full bg-[#150f30] animate-pulse">
                                    <div className="flex flex-row gap-3">
                                        <div className="h-12 w-12 bg-[#271a56] rounded-full"></div>
                                        <div className="flex flex-col justify-between items-start">
                                        <div className="h-4 w-16 bg-[#271a56] rounded-lg"></div>
                                        <div className="h-4 w-24 bg-[#271a56] rounded-lg mt-2"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <div className="h-4 w-20 bg-[#271a56] rounded-lg"></div>
                                        <div className="flex flex-row gap-1.5">
                                        <div className="h-4 w-4 bg-[#271a56] rounded-lg my-2"></div>
                                        <div className="h-4 w-8 bg-[#271a56] rounded-lg my-2"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 px-4 py-2">
                            <div className="flex flex-row justify-between items-center">
                                <label className="text-[#716D9C] text-sm font-semibold">My Assets</label>
                                <div className="flex flex-row gap-2 items-center">
                                    <Link href={"/wallet/nfts"} className="text-[#b5afff] text-sm font-semibold">
                                        <span>Total NFTs</span>
                                    </Link>
                                    <p className="text-[#b6afff78] text-sm font-semibold">{totalNft}</p>
                                    <img width={12} src="/images/svg/redo.svg" alt="icon_loading" />
                                </div>
                            </div>
                            <div className={`mt-3 flex flex-row gap-5 w-full relative`}>
                                {
                                    !pending
                                    ?nfts
                                    :<div className="flex flex-row gap-5 items-start relative animate-pulse">
                                        <div className="h-24 w-24 bg-[#271a56] rounded-lg"></div>
                                        <div className="h-24 w-24 bg-[#271a56] rounded-lg"></div>
                                        <div className="h-24 w-24 bg-[#271a56] rounded-lg"></div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                
            </div>
            <Footer/>
        </div>
            ):(
                <CreateWallet/>
            )
            }
        </div>
    )
}

export default Home;

