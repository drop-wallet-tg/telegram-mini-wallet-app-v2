import Footer from "@/components/Footer";
import { getNFT } from "@/hooks/SDK";
import WebApp from "@twa-dev/sdk";
import { useEffect,useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const Header = dynamic(()=>import("@/components/Header"),{ssr:false})


export default function ShowNFT(){
    const [account,setAccount] = useState<string>('');
    const [nfts, setNFTs] = useState<any>([]);
    const [totalNft,setTotalNFT] = useState<number>(0);
    const [pending,setPending] = useState<boolean>(false);

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
        if(account){
            loadNFT();
        }
    },[account])
    const loadNFT = async() =>{
        setPending(true)
        const {data} = await getNFT(account);
        //setNFTs(data.nft);
        if(Object.keys(data).length > 0){
            let totalNft = 0;
            let listNFT:any = [];
            const contractOwnedList = Object.keys(data.nft);
            contractOwnedList.forEach((item, index) => {
                totalNft += data.nft[item].length;
                listNFT.push(<Link href={`/wallet/nfts/collection/${data.nft[item][index].nft_contract_id}`} className="flex flex-col items-start relative">
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
    //console.log(nfts)
    return(
        <div className="w-full bg-[#180E35] relative">
            <div className="min-h-screen">
                <Header/>
                <div className="p-5 h-[85vh]">
                    <div className="flex flex-row justify-between items-center">
                        <label className="text-xl text-white font-semibold">My Collectibles</label>
                        <img width={18} src="/images/svg/redo.svg" alt="icon_loading" />
                    </div>
                    <div className="flex mt-3 text-white text-[0.7rem] flex-row gap-5">
                        <div className="pl-2 pr-1 py-1 gap-3 rounded-md flex flex-row items-center bg-[#2f2649]">
                            <p>Total NFTs</p>
                            <p className="px-4 text-white py-1 rounded-tr-md rounded-br-md bg-[#180E35]">{totalNft}</p>
                        </div>
                        <div className="pl-2 pr-1 py-1 gap-3 rounded-md flex flex-row items-center bg-[#2f2649]">
                            <p>Total Floor Price</p>
                            <p className="px-4 text-white py-1 rounded-tr-md rounded-br-md bg-[#180E35]">0Ⓝ</p>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-row gap-3 flex-wrap">
                        {
                            !pending
                            ? nfts
                            : <div className="flex flex-row gap-5 items-start relative animate-pulse">
                                <div className="h-24 w-24 bg-[#271a56] rounded-lg"></div>
                                <div className="h-24 w-24 bg-[#271a56] rounded-lg"></div>
                                <div className="h-24 w-24 bg-[#271a56] rounded-lg"></div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}