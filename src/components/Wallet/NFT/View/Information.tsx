"use client"
import dynamic from "next/dynamic";
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { getNFT } from "@/hooks/SDK";
import Link from "next/link";


const Header = dynamic(()=>import("@/components/Header"),{ssr:false})

export default function Information({params}:{params:string}){
    const [nfts, setNFTs] = useState<any>([]);
    const [account,setAccount] = useState<string>('');
    const [NFTName,setNFTName] = useState<string>('');
    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
        localStorage.setItem("contract_name",params)
        if(account){
            loadNFT();
        }
    },[account])
    const loadNFT = async() =>{
        const {data} = await getNFT(account);
        if(Object.keys(data).length > 0){
            let totalNft = 0;
            let listNFT:any = [];
            const contractOwnedList = Object.keys(data.nft);
            contractOwnedList.forEach((item, index) => {
                totalNft += data.nft[item].length;
                if(data.nft[item][index].nft_contract_id == params){
                    setNFTName(data.nft[item][0].nft_contract_name)
                    
                    //console.log("item",data.nft[item][1])
                    for(let i = 0;i<data.nft[item].length;i++){
                        console.log("nft",data.nft[item][i])
                        listNFT.push(<Link href={`/wallet/nfts/collection/${data.nft[item][i].nft_contract_id}/token/${data.nft[item][i].token_id}`} className="flex flex-col items-start relative">
                            {data.nft[item][i].media?(
                                <img className="rounded-xl" width={110} src={data.nft[item][i].media} alt="NFT"/>
                            ):(
                                <img width={110} src="/images/svg/card.svg" alt="NFT"/>
                            )}
                            {/* py-2 text-[0.7rem] absolute ml-2 w-full bottom-0 flex flex-row items-center  gap-2 */}
                            <div className="title">
                                <div className="sub-title">
                                    <p className="text-[#b5afff]">
                                    {data.nft[item][i].title
                                            ? data.nft[item][i].title
                                            : "Unkown Title"}
                                    </p>
                                </div>
                            </div>
                        </Link>)
                    }
                }
                
            });
            setNFTs(listNFT)
        }
    }
    console.log(nfts)
    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            <Header/>
            <div className="p-5">
                <div className="flex flex-row items-center text-center">
                    <Link href="/wallet/nfts">
                        <img src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-lg text-white font-bold m-auto">{NFTName}</label>
                </div>
                <div className="mt-6 flex text-sm gap-0.5 flex-wrap">
                    <div className="flex border border-[#261654] rounded-lg shadow-lg text-white ">
                        <div className="flex bg-[#261654] px-2 py-[0.2rem] rounded-l-lg items-center flex-nowrap">
                            <p className="font-semibold">Contract</p>
                        </div>
                        <div className="flex px-2 py-[0.2rem] rounded-lg items-center flex-nowrap">
                            <p className="font-semibold">{params}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-row gap-3 flex-wrap">
                    {nfts}
                </div>
            </div>
        </div>
    )
}