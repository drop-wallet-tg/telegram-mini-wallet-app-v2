"use client"
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { getVibe, mintNFT, submitTransaction } from "@/hooks/SDK";
import dynamic from "next/dynamic";
import Link from "next/link";


const Header = dynamic(()=>import("@/components/Header"),{ssr:false})


export default function Vibe(){
    const [account,setAccount] = useState<string>('');
    const [privateKey,setPrivateKey] = useState<string>('');
    const [cid,setCid] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const [msgDesc,setMsgDesc] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [loadingIPFS,setLoadingIPFS] = useState<boolean>(false);
    const [friendliness,setFriendliness] = useState<string>('');
    const [enegry,setEnegry] = useState<string>('');
    const [density,setDensity] = useState<string>('');
    const [diversity,setDiversity] = useState<string>('');

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string));
        WebApp.CloudStorage.getItem("privateKey",(err,rs)=>setPrivateKey(rs as string));
    },[account,privateKey])

    const numberSelect = [1,2,3,4,5,6,7,8,9,10];

    const handleUploadFile = async(event:any)=>{
        try {
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

    const handleDescription = (event:any)=>{
        const description = event.target.value;
        if(description.length<1){
            setMsgDesc("");
        }else{
            setDescription(description);
        }   
    }

    const handlePostVibe = async()=>{
        console.log("post vibe");
        //location.replace("/wallet/vibe/success")
        setLoading(true)
        const signedDelegate = await getVibe(
            account,
            cid,
            privateKey,
            friendliness,
            enegry,
            density,
            diversity,
            description
        );
        const data = await submitTransaction(signedDelegate);
        const nonce = data.transaction.nonce;
        if (data.transaction_outcome?.outcome?.status) {
            // await ctx.replyWithHTML(
            //     `<b>✅ You successfully posted on NEAR Social for vibes. <img href="https://near.social/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${data.transaction.nonce}">(See link)</a>\n⌛️ The image will take ~10 minutes to show on NEAR Social </b>`, keyboards.home()
            // );
            // localStorage.setItem("content",description);
            // localStorage.setItem("nonce",nonce);
            const tokenId = Date.now() + "";
            const title = `${account.replace(".near", "")} ${new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}`;
            const content = `#ProofOfVibes #   @proofofvibes.near ${description} \n ## **Vibe-rating**  ❤️ **Friendliness:** ${friendliness}/10 ⚡️ **Energy:** ${enegry}/10 🧊 **Density:** ${density}/10 🌈 **Diversity:** ${diversity}/10`;
            const signedDelegate = await mintNFT(
                account,
                title,
                content,
                cid,
                privateKey,
                account,
                tokenId
            )
            const data = await submitTransaction(signedDelegate);
            if(data.final_execution_status == "FINAL"){
                location.replace(`/wallet/vibe/success?content=${description}&nonce=${nonce}`)
            }
        }
    }

    const handleEnough = () =>{
        if(account&&
            cid&&
            privateKey&&
            friendliness&&
            enegry&&
            density&&
            diversity&&
            description)
        {
            return true;
        }else{
            return false
        }
    }

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
                        <img src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-lg text-white font-bold m-auto">Vibe</label>
                </div>
                <div className="mt-8 w-full">
                    
                    <label className="mb-12 mt-2 text-white">Image for post</label><br/>
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
                            <span className="text-xs font-medium text-gray-600">
                            Drop files to Attach, or&nbsp;
                            <span className="text-blue-600 underline">browse</span>
                            </span>
                        </span>
                        <input onChange={handleUploadFile} id="photo-dropbox" type="file" className="sr-only" />
                        </label>
                        )
                    )}
                </div>
                <div className="mt-5">
                    <label htmlFor="description" className="text-white">Content for post</label>
                    <textarea onChange={handleDescription} name="description" className={`w-full h-20 text-white ${msgDesc?"border border-red-600":"border-none"} bg-[#331e72] mt-2 mb-2 px-4 py-3 rounded-lg focus:outline-none placeholder-[#545ba9]`} placeholder="Send a message to say what you feel"/>
                    {msgDesc&&(
                        <div dangerouslySetInnerHTML={{__html:msgDesc}}/>
                    )}
                </div>
                <div className="mt-2 flex flex-col">
                    <label htmlFor="rate" className="text-white">Rate the ⚡️energy</label>
                    <small className="text-[#FF8F00]">⚡️ The vibe calm or very active</small>
                    <select onChange={(event)=>setEnegry(event.target.value)} name="rate" className="bg-[#331e72] hover:bg-[#473480] mt-3 text-white rounded-lg px-3 py-2 w-full">
                        <option selected disabled>Select rate the ⚡️energy</option>
                        {numberSelect.map((dt:any,i:number)=>(
                            <option key={i} value={dt}>{dt}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-5 flex flex-col">
                    <label htmlFor="friendliness" className="text-white">Rate the ❤️ friendliness </label>
                    <small className="text-[#FF6969]">❤️ How friendly was people</small>
                    <select name="friendliness" onChange={(event)=>setFriendliness(event.target.value)} className="bg-[#331e72] hover:bg-[#473480] mt-3 text-white rounded-lg px-3 py-2 w-full">
                        <option selected disabled>Select rate the ❤️ friendliness </option>
                        {numberSelect.map((dt:any,i:number)=>(
                            <option key={i} value={dt}>{dt}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-5 flex flex-col">
                    <label htmlFor="density" className="text-white">Rate the 🧊 density</label>
                    <small className="text-[#3ABEF9]">🧊 You were alone or was the vibe packed</small>
                    <select name="density" onChange={(event)=>setDensity(event.target.value)} className="bg-[#331e72] hover:bg-[#473480] mt-3 text-white rounded-lg px-3 py-2 w-full">
                        <option selected disabled>Select rate the 🧊 density</option>
                        {numberSelect.map((dt:any,i:number)=>(
                            <option key={i} value={dt}>{dt}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-5 flex flex-col">
                    <label htmlFor="diversity" className="text-white">Rate the 🌈 diversity</label>
                    <small className="text-[#40A578]">🌈 The vibe full of the same type of people or was the culture diverse</small>
                    <select name="diversity" onChange={(event)=>setDiversity(event.target.value)} className="bg-[#331e72] hover:bg-[#473480] mt-3 text-white rounded-lg px-3 py-2 w-full">
                        <option selected disabled>Select rate the 🌈 diversity</option>
                        {numberSelect.map((dt:any,i:number)=>(
                            <option key={i} value={dt}>{dt}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-12 w-full">
                    <button onClick={handlePostVibe} disabled={!handleEnough()} className={`${handleEnough()?"bg-[#2775CA] hover:bg-[#5290D4]":"bg-black bg-opacity-30"} px-6 py-3  w-full rounded-3xl text-white font-bold`}>Post</button>
                </div>
            </div>
            
        </div>
    )
}