"use client"
import dynamic from "next/dynamic";
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { getNFT } from "@/hooks/SDK";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
const Header = dynamic(()=>import("@/components/Header"),{ssr:false})

export default function SendNFT({tokenId}:{tokenId:string}){
    const [account,setAccount] = useState<string>('');
    const [nft,setNFT] = useState<any>([]);
    const contractName = localStorage.getItem("contract_name")||"";
    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
        localStorage.setItem("tokenId",tokenId)
        if(account){
            loadNFT();
        }
    },[account])
    const loadNFT = async() =>{
        const {data} = await getNFT(account);
        if(Object.keys(data).length > 0){
            let totalNft = 0;
            const contractOwnedList = Object.keys(data.nft);
            contractOwnedList.forEach((item, index) => {
                totalNft += data.nft[item].length;
                for(let i=0;i<totalNft;i++){
                    if(data.nft[item][i].token_id == tokenId){
                        localStorage.setItem("nft",JSON.stringify(data.nft[item][i]))
                        setNFT(data.nft[item][i])
                    }
                }
                
            });
        }
    }

    const struncate = (str: string) =>{
        if(str){
            if(str.length > 80){
                return str.slice(0,80)+"...";
            }
            return str;
        }
    }

    return(
        <div className="w-full bg-[#180E35]">
            <div className="min-h-screen">
                <Header/>
                <div className="p-5 h-[85vh]">
                    <div className="flex flex-row items-center text-center">
                        <Link href={`/wallet/nfts/collection/${contractName}`}>
                            <img src="/images/icon/Arrow.svg" alt="arrow" />
                        </Link>
                        <label className="text-xl shadow-lg text-white font-bold m-auto ">{nft.title}</label>
                    </div>
                    <div className="mt-10 flex flex-col items-center justify-center">
                        {nft.media?(
                            <img width={180} className="rounded-lg" src={nft.media} alt="image" />
                        ):(
                            <img src="/images/svg/card.svg" alt="image" />
                        )}
                        <div className="flex mt-10 flex-row justify-center items-center ">
                            <Link href={`/wallet/nfts/collection/${contractName}/token/${tokenId}/sendSingle`} className="flex bg-[#492ba224] hover:bg-[#3a22839e] px-5 py-3  rounded-md shadow-lg flex-row gap-2 items-center">
                                <span>
                                    <svg stroke="currentColor" fill="#613ccb" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" focusable="false"  width="1.5rem" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path></g></svg>
                                </span>
                                    <span className="font-semibold text-[#613ccb] text-xl">Send</span>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-10">
                            <label htmlFor="description" className="text-[#b5b5b5]">Description</label>
                            <p className="text-white font-semibold mt-2">{struncate(nft.description)}</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}