"use client"
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { mintNFT, submitTransaction,MintBase } from "@/hooks/SDK";
import dynamic from "next/dynamic";
import Link from "next/link";


const Header = dynamic(()=>import("@/components/Header"),{ssr:false})

export default function Mint(){
    const [account,setAccount] = useState<string>('');
    const [privateKey,setPrivateKey] = useState<string>('');
    const [file,setFile] = useState<File>();
    const [cid,setCid] = useState<string>('');
    const [title,setTitle] = useState<string>('');
    const [msgTitle,setMsgTitle] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const [msgDesc,setMsgDesc] = useState<string>('');
    const [nearAccount,setNearAccount] = useState<string>('');
    const [msgAccount,setMsgAccount] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [loadingIPFS,setLoadingIPFS] = useState<boolean>(false);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [select,setSelect] = useState<any>(["GENADROP","/assets/genadrop.svg","nft.genadrop.near"]);

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string));
        WebApp.CloudStorage.getItem("privateKey",(err,rs)=>setPrivateKey(rs as string));
    },[account,privateKey])

    const handleUploadFile = async(event:any)=>{
        try {
            setFile(event.target.files[0])
            const data = new FormData();
            data.set("file", event.target.files[0]);
            data.append("metadata", JSON.stringify({ title:"nft" }));
            setLoadingIPFS(true)
            const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.JWT_PINATA_CLOUD}`,
                },
                body: data,
            });
            const { IpfsHash } = await res.json();
            setCid(IpfsHash);
            setLoadingIPFS(false)
            setUploading(true);
        } catch (e) {
            console.log(e);
            setUploading(false);
            alert("Trouble uploading file");
        }
    }

    const handleTitle = (event:any)=>{
        const title = event.target.value;
        const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (regex.test(title)) {
			setMsgTitle(
				"<span style='color:red'>Error NFT title cannot contain special characters!</span><br/><span style='color:red'>Type in Your title for your NFT (min 4 character), no links or special characters</span>"
			);
        }else if (title.length > 20) {
            setMsgTitle(
                "<span style='color:red'>Error NFT title too long!</span><br/><span style='color:red'>Type in Your title for your NFT (min 4 character), no links or special characters</span>"
            );
        }else if(title.length < 3){
            setMsgTitle(
                "<span style='color:red'>Error NFT title too short!</span><br/><span style='color:red'>Type in Your title for your NFT (min 4 character), no links or special characters</span>"
            );
        }else{
            setMsgTitle("")
        }
        if(title.length<1){
            setMsgTitle("");
        }
        if (
            title.length >= 3 &&
            title.length <= 20
        ) {
            setTitle(title);
        }
    }

    const handleDescription = (event:any)=>{
        const description = event.target.value;
        const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (regex.test(description)) {
			setMsgDesc(
				"<span style='color:red'>Error NFT desciption cannot contain special characters!</span>"
			);
        }else if (description.length > 200) {
            setMsgDesc(
                "<span style='color:red'>Error NFT desciption too long!</span><br/><span style='color:red'>Type in Your desciption for your NFT (max 200 character). Links allowed</span>"
            );
        }else{
            setMsgDesc("")
        }
        if(description.length<1){
            setMsgDesc("");
        }
        if (
            description.length <= 200
        ) {
            setDescription(description);
        }
    }

    const handleVaildNearAccount = (event:any)=>{
        const nearAccount = event.target.value;
        var format = /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/g;
		if (!format.test(nearAccount.toLowerCase())) {
			setMsgAccount(`<span style='color:red'>Error not a valid Near address.</span>`);
		}else if (!nearAccount.includes(".near")) {
            setMsgAccount("<span style='color:red'>Error not a valid Near address.</span>");
        } 
        else {
			setMsgAccount("");
            setNearAccount(nearAccount);
        }
    }


    const handleMintNFT = async()=>{
        console.log("mint nft")
        setLoading(true)
        if(select[0]=="GENADROP"){
            try{
                const tokenId = Date.now() + "";
                const signedDelegate = await mintNFT(
                    account,
                    title,
                    description,
                    cid,
                    privateKey,
                    nearAccount,
                    tokenId
                );
                const data = await submitTransaction(signedDelegate);
                if (
                    data.transaction_outcome?.outcome?.status
                        ?.SuccessReceiptId
                ) {
                    setLoading(false);
                    localStorage.setItem("tokenId",tokenId);
                    localStorage.setItem("title",title);
                    location.replace("/wallet/nfts/mint/success")
                }
            }catch(error){
                console.log(error)
            }
        }else if(select[0]=="MINTBASE"){
            const signedDelegate = await MintBase({
                accountId: account,
                privateKey: privateKey,
                title: title,
                description: description,
                media: file as File,
            })
            const data = await submitTransaction(signedDelegate);
            if (
                data.transaction_outcome?.outcome?.status
                    ?.SuccessReceiptId
            ) {
                setLoading(false);
                localStorage.setItem("title",title);
                location.replace("/wallet/nfts/mint/success")
            }
        }else{
            setLoading(false)
            console.log("select error")
        }
        
    }
    console.log("select",select[0])
    return(
        <div className="w-full min-h-screen bg-[#180E35]">
            <Header/>
            {loading&&(
                <div className="flex z-50 transition-all fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 w-full justify-center items-center h-screen">
                    <div className="rounded-full h-12 w-12 bg-violet-900 animate-ping"></div>
                </div>
            )}
            <div className="p-5 pb-12">
                <div className="flex flex-row items-center text-center">
                    <Link href="/">
                        <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-lg text-white font-bold m-auto">Mint NFT</label>
                </div>
                <div className="mt-10 w-full relative">
                    <label className="text-gray-300">Select Contract</label>
                    <button onClick={()=>setIsShow(prv=>!prv)} id="dropdown-button" className="flex mt-2 justify-between w-full px-4 py-3 text-sm font-medium text-white bg-black bg-opacity-25 hover:bg-opacity-35 rounded-lg shadow-sm outline-none">
                            <div className="mr-2 flex flex-row gap-2 items-center">
                                <img width={20} src={select[1]} alt="logo" />
                                <span className="font-semibold">{select[0]}</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                    </button>
                    {isShow&&(
                            <div id="dropdown-menu" className="w-full absolute right-0 mt-3 rounded-md bg-[#444b9a] z-10 p-1 space-y-1">
                                <button onClick={()=>setSelect(["GENADROP","/assets/genadrop.svg","nft.genadrop.near"])} className="px-4 items-center flex flex-row gap-2 py-2 w-full text-start outline-none text-white hover:bg-[#473480] cursor-pointer rounded-md">
                                    <img width={20} src="/assets/genadrop.svg" alt="logo" />
                                    <span className="font-semibold text-sm">GENADROP</span>
                                </button>  
                                <button onClick={()=>setSelect(["MINTBASE","https://www.mintbase.xyz/favicon.ico","minter.artreus.near"])} className="px-4 items-center flex flex-row gap-2 py-2 w-full text-start outline-none text-white hover:bg-[#473480] cursor-pointer rounded-md">
                                    <img width={20} src="https://www.mintbase.xyz/favicon.ico" alt="logo" />
                                    <span className="font-semibold text-sm">MINTBASE</span>
                                </button>                     
                            </div>
                        )}
                </div>
                <div className="mt-5 w-full">
                    <label className="mb-12 mt-2 text-gray-300">Your NFT image</label><br/>
                    {uploading?(
                        <img alt="loading" width={150} height={150} className="mt-3" src={`https://olive-rational-giraffe-695.mypinata.cloud/ipfs/${cid}?pinataGatewayToken=kV2NKhwJtxSznI_jwNRMQDq3L6xOR75S4TxUcb8WkPtZp6dbCde12sdDshGDX-JU`}/>
                    ):(
                        loadingIPFS?(
                            <div className="mt-3">
                                <svg width="36" height="36" fill="#ffffff" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                    </path>
                                </svg>
                            </div>
                        ):(
                            <label
                        className="flex mt-2 cursor-pointer appearance-none justify-center rounded-md border border-dashed border-[#331e72] bg-transparent px-3 py-6 text-sm transition hover:border-[#38217d] focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                        tabIndex={0}>
                        <span className="flex items-center space-x-2">
                            <svg className="h-6 w-6 stroke-[#331e72]" viewBox="0 0 256 256">
                            <path
                                d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                strokeWidth="24"></path>
                            <path
                                d="M80,128a80,80,0,1,1,144,48"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                strokeWidth="24"></path>
                            <polyline
                                points="118.1 161.9 152 128 185.9 161.9"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                strokeWidth="24"></polyline>
                            <line
                                x1="152"
                                y1="208"
                                x2="152"
                                y2="128"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                strokeWidth="24"></line>
                            </svg>
                            <span className="text-xs font-medium text-gray-400">
                            Drop files to Attach, or&nbsp;
                            <span className="text-white underline">browse</span>
                            </span>
                        </span>
                        <input onChange={handleUploadFile} id="photo-dropbox" type="file" className="sr-only" />
                        </label>
                        )
                    )}
                </div>
                <div className="mt-5">
                    <label htmlFor="title" className="text-gray-300">Title NFT</label>
                    <input onChange={handleTitle} type="text" name="title" className={`w-full text-white ${msgTitle?"border border-red-600":"border border-white border-opacity-20"} shadow-sm bg-black bg-opacity-25 mt-2 mb-2 px-4 py-3 rounded-lg focus:outline-none placeholder-[#ffffff3c]`} placeholder="Your title NFT"/>
                    {msgTitle&&(
                        <div dangerouslySetInnerHTML={{__html:msgTitle}}/>
                    )}
                </div>
                <div className="mt-2">
                    <label htmlFor="description" className="text-gray-300">Description NFT</label>
                    <textarea onChange={handleDescription} name="description" className={`w-full h-20 text-white ${msgDesc?"border border-red-600":"border border-white border-opacity-20"} shadow-sm bg-black bg-opacity-25 mt-2 mb-2 px-4 py-3 rounded-lg focus:outline-none placeholder-[#ffffff3c]`} placeholder="Your description NFT"/>
                    {msgDesc&&(
                        <div dangerouslySetInnerHTML={{__html:msgDesc}}/>
                    )}
                </div>
                <div className="">
                    <label htmlFor="account" className="text-gray-300">Valid Near Account</label>
                    <input onChange={handleVaildNearAccount} type="text" name="account" className={`w-full text-white ${msgAccount?"border border-red-600":"border border-white border-opacity-20"} shadow-sm bg-black bg-opacity-25 mt-2 mb-2 px-4 py-3 rounded-lg focus:outline-none placeholder-[#ffffff3c]`} placeholder="Enter valid Near Account"/>
                    {msgAccount&&(
                        <div dangerouslySetInnerHTML={{__html:msgAccount}}/>
                    )}
                </div>
                <div className="mt-5 w-full">
                    <button onClick={handleMintNFT} className="px-6 py-3 bg-[#2775CA] hover:bg-[#5290D4] w-full rounded-3xl text-white font-bold">Mint</button>
                </div>
            </div>
            
        </div>
    )
}