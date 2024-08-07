"use client"
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { addBlunt, followBlunt, getNFTBlunt, mintBlunt, mintNFT, postSocial, submitTransaction } from "@/hooks/SDK";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = dynamic(()=>import("@/components/Header"),{ssr:false})

export default function BluntDao(){
    const [account,setAccount] = useState<string>('');
    const [privateKey,setPrivateKey] = useState<string>('');
    const [cid,setCid] = useState<string>('');
    const [refered,setRefered] = useState<string>('');
    const [msgRefered,setMsgRefered] = useState<string>('');
    const [content,setContent] = useState<string>('');
    const [msgContent,setMsgContent] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [loadingIPFS,setLoadingIPFS] = useState<boolean>(false);
    const [blunt,setBlunt] = useState<string>('');
    const [ProofOfSesh,setProofOfSech] = useState<string>('');
    const [status,setStatus] = useState<string>('');
    const router = useRouter();

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string));
        WebApp.CloudStorage.getItem("privateKey",(err,rs)=>setPrivateKey(rs as string));
        WebApp.CloudStorage.getItem("proofofsesh",(err,rs)=>setProofOfSech(rs as string));
    },[account,privateKey])

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
    const handleContent = (event:any)=>{
        const content = event.target.value;
        if(content.length<1){
            setMsgContent("");
        }else{
            setContent(content)
        }
    }

    const handleVaildNearAccount = async(event:any)=>{
        const refered = event.target.value.toLowerCase();
        setRefered(refered)
        var format = /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/g;
		if (!format.test(refered.toLowerCase())) {
			setMsgRefered(`<span style='color:red'>Error not a valid Near address.</span>`);
		}else if (!refered.includes(".near")) {
            setMsgRefered("<span style='color:red'>Error not a valid Near address.</span>");
        } 
        else {
			setMsgRefered("");
            const {
                data
            } = await getNFTBlunt(refered);
            if (data.nft["nft.bluntdao.near"]?.length > 0){
                setRefered(refered);
            }else{
                setRefered('');
                setMsgRefered("<span style='color:red'>The referred user doesn't exist.</span>");
            }
        }
    }

    const handlePostBluntDao = async()=>{
        console.log("mint nft")
        setLoading(true)
        if(refered){
            if(ProofOfSesh){
                const signedDelegate = await postSocial(
                    account,
                    cid,
                    privateKey,
                    content
                )
                const rs = await submitTransaction(signedDelegate);
                if (rs.transaction_outcome?.outcome?.status) {
                    //localStorage.setItem("nonce",rs.transaction.nonce)
                    // await ctx.replyWithHTML(`<b>✅ You posted on NEAR Social (<img href="https://near.social/mob.near/widget/MainPage.N.Post.Page?accountId=${accountId}&blockHeight=${data.transaction.nonce}">Open</a>) </b>`, keyboards.back());
                    const tokenId = Date.now() + "";
                    const title = `BluntDao NFT #${blunt}`;
                    const description = `${content} @bluntdao.near #ProofOfSesh #BluntDAO #${blunt}`;
                    const token_id = `bluntdao.${blunt}.${tokenId}`;
                    const signedDelegates = await mintNFT(
                        account,
                        title,
                        description,
                        cid,
                        privateKey,
                        account,
                        token_id
                    )
                    await submitTransaction(signedDelegates)
                    router.push(`/social/blunt/success?title=${title}&nonce=${rs.transaction.nonce}`)
                    setLoading(false)
                }
            }else{
                const {
                    data
                } = await getNFTBlunt(refered)
                console.log("nft",data.nft)
                let seriesId = 0;
                if (blunt == "blunt") {
                    seriesId = 1;
                } else if (blunt == "spliff") {
                    seriesId = 2;
                } else if (blunt == "joint") {
                    seriesId = 3;
                }
                if (data.nft["nft.bluntdao.near"]?.length > 0) {
                    const signedDelegate = await mintBlunt(account,seriesId.toString());
                    const result = await submitTransaction(signedDelegate);
                    const tokenId = Date.now() + "";
                    const title = `BluntDao NFT #${blunt}`;
                    const description = `${content} @bluntdao.near #ProofOfSesh #BluntDAO #${blunt}`;
                    const token_id = `bluntdao.${blunt}.${tokenId}`;
                    const signedDelegateMint = await mintNFT(
                        account,
                        title,
                        description,
                        cid,
                        privateKey,
                        account,
                        token_id
                    )
                    //localStorage.setItem("title",title);
                    await submitTransaction(signedDelegateMint)
                    if (result) {
                        WebApp.CloudStorage.setItem("proofofsesh","true");
                        const content = `Just got onboard with a ${blunt.toUpperCase()} by @${refered} via #ProofOfSesh to #BluntDAO @bluntdao.near Now I'm an #OGValidator, sesh with me IRL to get onboarded`
                        const delegate =  await postSocial(
                            account,
                            cid,
                            privateKey,
                            content
                        )
                        const rs = await submitTransaction(delegate);
                        if (rs.final_execution_status == "FINAL") {
                            const {
                                data
                            } = await getNFTBlunt(account);
                            //localStorage.setItem("contractId",data.nft["nft.bluntdao.near"][0].nft_contract_id);
                            //localStorage.setItem("tokenId",data.nft["nft.bluntdao.near"][0].token_id);
                            //localStorage.setItem("nonce",rs.transaction.nonce)
                            const addDelegate = await addBlunt(
                                account,
                                blunt,
                                privateKey,
                                rs.transaction.nonce
                            )
                            await submitTransaction(addDelegate)
                            const followDelegate = await followBlunt(
                                account,
                                privateKey
                            )
                            await submitTransaction(followDelegate);
                            router.push(`/social/blunt/success?title=${title}&contractId=${data.nft["nft.bluntdao.near"][0].nft_contract_id}&tokenId=${data.nft["nft.bluntdao.near"][0].token_id}&nonce=${rs.transaction.nonce}`)
                        } 
                    }
                } else {
                    setLoading(false)
                    setStatus(
                        `<b style='color:red;font-size:14px;'>An og with this wallet doesn't exits.</b>`
                    );
                }
            }
        }else{
            setLoading(false);
            setStatus(
                `<b style='color:red;font-size:14px;'>Please enter refered.</b>`
            );
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
                    <Link href="/home">
                        <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-lg text-white font-bold m-auto">Blunt DAO</label>
                </div>
                
                <div className="mt-8 w-full">
                    
                    <label className="mb-12 mt-2 text-white">Take a picture of the smoking stick</label><br/>
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
                        className="flex mt-3 cursor-pointer appearance-none justify-center rounded-md border border-dashed border-[#331e72] bg-transparent px-3 py-6 text-sm transition hover:border-[#38217d] focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
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
                    <label htmlFor="content" className="text-white">Content</label>
                    <textarea onChange={handleContent} name="content" className={`w-full h-20 text-white ${msgContent?"border border-red-600":"border-none"} bg-[#331e72] mt-2 mb-2 px-4 py-3 rounded-lg focus:outline-none placeholder-[#545ba9]`} placeholder="Send a message to say what you feel"/>
                    {msgContent&&(
                        <div dangerouslySetInnerHTML={{__html:msgContent}}/>
                    )}
                </div>
                <div className="mt-2 flex flex-col">
                    <label htmlFor="rate" className="text-white">Watchu smoking</label>
                    <select onChange={(event)=>setBlunt(event.target.value)} name="rate" className="bg-[#331e72] hover:bg-[#473480] mt-3 text-white rounded-lg px-3 py-2 w-full">
                        <option selected disabled>Select Watchu smoking on</option>
                        <option value="blunt">🔥 BLUNT</option>
                        <option value="joint">🤙 JOINT</option>
                        <option value="spliff">👽 SPLIFF</option>
                    </select>
                </div>
                <div className="mt-4">
                    <label htmlFor="refered" className="text-white">Refered</label>
                    <input value={refered} onChange={handleVaildNearAccount} type="text" name="refered" className={`w-full text-white ${msgRefered?"border border-red-600":"border-none"} bg-[#331e72] mt-2 mb-2 px-4 py-3 rounded-lg focus:outline-none placeholder-[#545ba9]`} placeholder="Who referred you put their .near"/>
                    {msgRefered&&(
                        <div dangerouslySetInnerHTML={{__html:msgRefered}}/>
                    )}
                </div>
                {status&&(
                        <div className="bg-red-200 px-6 py-3 my-4 rounded-md flex items-center mx-auto max-w-lg">
                            <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
                                <path fill="currentColor"
                                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                </path>
                            </svg>
                            <small className="text-red-800 text-[0.4rem]" dangerouslySetInnerHTML={{__html:status}}/>
                        </div>
                    )}
                <div className="mt-12 w-full">
                    <button onClick={handlePostBluntDao} disabled={!refered}  className={`${refered?"bg-[#2775CA] hover:bg-[#5290D4]":"bg-black bg-opacity-30"} px-6 py-3 w-full rounded-3xl text-white font-bold`}>Post</button>
                </div>
            </div>
            
        </div>
    )
}