import Header from "@/components/Header";
import Link from "next/link";
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import Big from "big.js";
import { viewMethod,connectAccount } from "@/hooks/SDK";




const PotLock = () =>{
    const [accountId,setAccountId] = useState<string|null>(null);
    const [privateKey,setPrivateKey] = useState<string|null>(null); 
    const [projects,setProjects] = useState<any>([]||JSON.parse(localStorage.getItem("potlock") as string));
    const [isShow, setIsShow] = useState<boolean>(false);
    const [select,setSelect] = useState<any>(["NEAR","/assets/near-white.svg","near"]);
    const [showModal,setShowModal] = useState<boolean>(false);
    const [nameProject, setNameProject] = useState<string|null>(null);
    const [nearBalance, setNearBalance] = useState<number|null>(null);
    const [amount,setAmount] = useState<string|null>(null);
    const [status,setStatus] = useState<string|null>(null);
    const [needsToVerify,setNeedsToVerify] = useState<boolean>(false);
    const [disable,setDisable] = useState<boolean>(false);
    const [confirmDonate,setConfirmDonate] = useState<boolean>(false);
    const [isNote,setIsNote] = useState<boolean>(false);
    const [nearToUsd, setNearToUsd] = useState<number|null>(null);
    const [note, setNote] = useState<string>('');
    const [projectId, setProjectID] = useState<string|null>(null);

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccountId(rs as string))
        WebApp.CloudStorage.getItem("privateKey",(err,rs)=>setPrivateKey(rs as string))
        loadData();
        loadNearToUsd()
        if(accountId){
            loadBalance();
            checkIsUserHuman();
        }
    },[accountId])

    const loadNearToUsd = async()=>{
        const res = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd");
        setNearToUsd(res.data.near.usd)
    }

    const loadData = async() =>{
        const response = await axios.get("/api/potlock");
        localStorage.setItem("potlock",JSON.stringify(response.data))
        setProjects(response.data.sort(()=>{ return 0.5 - Math.random() }));
    }
    
    const checkIsUserHuman = async() =>{
        const isUserHumanVerified = await viewMethod({contractId:"v1.nadabot.near",method:"is_human" ,args:{
            account_id: accountId
        }});
        const needsToVerify = isUserHumanVerified === false;
        setNeedsToVerify(needsToVerify);
    }

    const truncate = (str:string)=>{
        if(str.length > 80){
            return str.slice(0,80)+"..."
        }
        return str;
    }
    
    const loadBalance = async()=>{
        const nearBalanceRes = await axios.get(
            `https://near-mainnet.api.pagoda.co/eapi/v1/accounts/${accountId}/balances/NEAR`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "dce81322-81b0-491d-8880-9cfef4c2b3c2",
                },
            }
        );
        nearBalanceRes.data.balance?
        setNearBalance(parseFloat(Big(nearBalanceRes.data.balance.amount).div(Big(10).pow(24)).toFixed(2)))
        :null;
    }

    const CardSkeleton = () =>(
        <div className="card-skeleton-container">
            <div className="header-skeleton"/>
            <div className="profile-image-skeleton"/>
            <div className="title-skeleton"/>
            <div className="description-skeleton"/>
            <div className="tag-skeleton"/>
            <div className="donations-info-container-skeleton">
                <div className="donations-info-item-skeleton">
                    <div className="footer-item-skeleton"/>
                </div>
                <div className="donations-info-item-skeleton">
                    <div className="footer-item-skeleton"/>
                </div>
            </div>
        </div>
    )

    const handleAmoutChange = (event:any) => {
        let amount = event.target.value.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
        if (amount === ".") amount = "0.";
        setAmount(amount);
        // error if amount is greater than balance
        if (Number(amount) > Number(nearBalance) && nearBalance !== null) {
            setStatus("You don’t have enough balance to complete this transaction.");
            setDisable(true)
        } else if (parseFloat(amount) < 0.1) {
            setStatus("Minimum donation is 0.1 NEAR.");
        }
    };

    const handleShowModal = (name:string) =>{
        setNameProject(name)
        setShowModal(true)
    }

    const Alert = ({ error }:{error:string}) => (
        <div className="alert">
            <div className="icon">
                <svg viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 4.49L18.53 17.5H3.47L11 4.49ZM11 0.5L0 19.5H22L11 0.5ZM12 14.5H10V16.5H12V14.5ZM12 8.5H10V12.5H12V8.5Z"
                        fill="#F6767A"
                    />
                </svg>
            </div>
            <div>{error}</div>
        </div>
    );

    const VerifyInfo = () => (
        <div className="verify">
            <div className="icon">
                <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M0.75 15.125H17.25L9 0.875L0.75 15.125ZM9.75 12.875H8.25V11.375H9.75V12.875ZM9.75 9.875H8.25V6.875H9.75V9.875Z"
                    fill="#ECC113"
                />
                </svg>
            </div>
            <div className="text">
                Your contribution won't be matched unless verified as human before the matching round ends.
            </div>
            <Link href="https://app.nada.bot/" target="_blank">
                Verify you’re human
            </Link>
        </div>
    );      

    const handleProcessDonate = () =>{
        setShowModal(false);
        setConfirmDonate(true);
        setStatus("");
    }

    const handleNote = (event:any) =>{
        const note = event.target.value;
        if (note.length > 100) {
            setStatus(`Note must be less than 100    characters`);
            return;
        }
        if(!note){
            setStatus("")
        }
        setNote(note);
    }

    const handleDonation = async() =>{
        // const signerAccount = await connectAccount(accountId as string,privateKey as string);
        // const donationAmountIndivisible = Big(Number(amount)).mul(
        //     new Big(10).pow(24)
        // );
        // const args = {
        //     message: note,
        //     recipient_id: projectId,
        // };
        // const transactions:any = [];
        // let requiredDepositFloat = 0.012; // base amount for donation storage
        // requiredDepositFloat += 0.0001 * note.length; // add 0.0001 NEAR per character in message
        // transactions.push({
        //     contractName: "donate.potlock.near",
        //     methodName: "donate",
        //     args: args,
        //     deposit: donationAmountIndivisible.toFixed(0),
        //     gas: "300000000000000",
        // });
        // try{
        //     const result = await signerAccount.signAndSendTransaction({
        //         receiverId:"donate.potlock.near",
        //         actions: transactions
        //     })
        //     console.log(result)
        //     location.replace("/digital/potlock")
        // }catch(error){
        //     console.log(error)
        // }
        location.replace("/digital/potlock")
    }

    //console.log(nearToUsd)

    return(
        <div className="w-full flex justify-between flex-col bg-[#180E35]">
            <div className="min-h-screen">
                <Header/>
                <div className="p-5">
                    <div className="flex flex-row items-center text-center">
                        <Link href="/">
                            <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                        </Link>
                        <label className="text-lg text-white font-bold m-auto">PotLock</label>
                    </div>
                    <div className="mt-5 flex flex-col gap-5">
                        {projects.length > 0 ? projects.slice(0,10).map((project:any,index:number)=>(
                            <div className="card" key={index}>
                                {project.registrant.near_social_profile_data.backgroundImage&&!project.registrant.near_social_profile_data.backgroundImage.nft
                                    ? project.registrant.near_social_profile_data.backgroundImage.url
                                    ?<img className="card-img" src={project.registrant.near_social_profile_data.backgroundImage.url} alt="background" />
                                    :<img className="card-img" src={`https://ipfs.near.social/ipfs/${project.registrant.near_social_profile_data.backgroundImage.ipfs_cid}`} alt="background" />
                                    : <img className="card-img" src={project.registrant.near_social_profile_data.backgroundImage&&project.registrant.near_social_profile_data.backgroundImage.nft.media} alt="background" />
                                }
                                <div className="card-body">
                                    {!project.registrant.near_social_profile_data.image.nft
                                        ? project.registrant.near_social_profile_data.image.url
                                        ? <img className="card-avatar" src={project.registrant.near_social_profile_data.image.url} alt="avatar" />
                                        : <img className="card-avatar" src={`https://ipfs.near.social/ipfs/${project.registrant.near_social_profile_data.image.ipfs_cid}`} alt="avatar" />
                                        : <img className="card-avatar" src={project.registrant.near_social_profile_data.image.nft.media} alt="avatar" />
                                    }
                                    <p className="card-title">{project.registrant.near_social_profile_data.name}</p>
                                    <p className="card-description">{truncate(project.registrant.near_social_profile_data.description)}</p>
                                    <div className="card-tag-container">
                                        {
                                            project.registrant.near_social_profile_data.plCategories && JSON.parse(project.registrant.near_social_profile_data.plCategories).map((tag:any,idx:number)=>{
                                                return(
                                                    <div className="card-tag" key={idx}>
                                                        {tag}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <p className="total-donate">${project.registrant.total_donations_in_usd?project.registrant.total_donations_in_usd:0}</p>
                                    <button onClick={()=>handleShowModal(project.registrant.near_social_profile_data.name)} className="donation-button">Donate</button>
                                </div>
                            </div>
                        )):(
                            <div className="flex flex-col gap-5">
                                <CardSkeleton/>
                                <CardSkeleton/>
                            </div>
                        )}
                    </div>
                </div>
                {
                    showModal&&(
                        <div className="fixed bg-black bg-opacity-70 top-0 left-0 min-h-screen w-full overflow-hidden backdrop-blur-lg">
                        <div className="fixed m-auto bg-white max-h-[450px] h-full left-0 right-0 top-0 bottom-0 z-50 rounded-lg">
                            <div className="h-20 p-5 bg-[#180E35] w-full rounded-t-md">
                                <p className="font-semibold text-white text-lg mt-2">Donate to {nameProject}</p>
                            </div>
                            <div className="px-5 mt-2 py-4">
                                <label className="text-base font-medium text-gray-900">
                                    Amount
                                </label>
                                <div className="flex flex-row border border-gray-300 rounded-md mt-1 items-center focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50">
                                    <input
                                        onChange={handleAmoutChange}
                                        value={amount as string}
                                        placeholder="Amount"
                                        type="text"
                                        className="h-10 w-full bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
                                    />
                                    <div className="relative">
                                        <button onClick={()=>setIsShow(prv=>!prv)} id="dropdown-button" className="flex flex-row gap-1 w-28 px-4 py-3 text-sm font-medium text-black border-l border-gray-300 rounded-r-md outline-none items-center">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <img width={15} src={select[1]} alt="logo" />
                                                    <span className="font-semibold">NEAR</span>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                </svg>
                                        </button>
                                        {isShow&&(
                                            <div id="dropdown-menu" className="w-full absolute right-0 mt-1 rounded-md bg-white border border-gray-300 z-10 p-1 space-y-1">
                                                <button onClick={()=>{
                                                    setSelect(["NEAR","/assets/near-white.svg","near"])
                                                    setIsShow(false)
                                                }} className="px-4 items-center flex flex-row gap-2 py-2 w-full text-start outline-none text-black hover:bg-[#473480] cursor-pointer rounded-md">
                                                    <img width={15} src="/assets/near-white.svg" alt="logo" />
                                                    <span className="font-semibold text-sm">NEAR</span>
                                                </button>                     
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-row justify-end mt-2">
                                    <p>{nearBalance} NEAR  <small className="text-[#00000088]">available</small></p>
                                </div>
                            </div>
                            {status&&(
                                <div className="-mt-5 px-5">
                                    <Alert error={status as string}/>
                                </div>
                            )}
                            {needsToVerify&&
                                <div className="px-5">
                                    <VerifyInfo/>
                                </div>
                            }
                            <div className="absolute bottom-4 right-0 flex flex-row gap-5 w-3/4 justify-end float-end px-5">
                                <button
                                onClick={()=>setShowModal(false)}
                                    className="relative inline-flex w-[150px] items-center justify-center rounded-md border border-red-400 bg-white px-3.5 py-2.5 font-semibold text-red-700 transition-all duration-200 hover:bg-red-100 hover:text-red-500 focus:bg-gray-100 focus:text-red-500 focus:outline-none"
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button
                                    //disabled={needsToVerify||disable}
                                    onClick={handleProcessDonate}
                                    className={`inline-flex w-full disabled:bg-gray-300 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
                                    type="button"
                                >
                                    Proceed to donate
                                </button>
                            </div>
                        </div>
                    </div>
                    )
                }
                {
                    confirmDonate&&(
                        <div className="fixed bg-black bg-opacity-70 top-0 left-0 min-h-screen w-full overflow-hidden backdrop-blur-lg">
                            <div className="fixed m-auto bg-white max-h-[620px] h-full left-0 right-0 top-0 bottom-0 z-50 rounded-lg">
                                <div className="h-20 p-5 bg-[#180E35] w-full rounded-t-md flex flex-row items-center gap-14">
                                    <button onClick={()=>{
                                        setConfirmDonate(false);
                                        setShowModal(true);
                                        setIsNote(false);
                                    }}>
                                        <svg width={18} height={18} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#fff"></path> </svg>
                                    </button>
                                    <p className="font-semibold text-white text-lg mt-2">Confirm donation</p>
                                </div>
                                <div className="px-5 mt-2 py-4">
                                    <p className="text-base font-medium text-gray-900">
                                        Total amount
                                    </p>
                                    <div className="flex flex-row gap-2 items-center text-lg">
                                        <img width={18} src="/assets/near-white.svg" alt="logo" />
                                        <span className="font-semibold text-xl" >{amount&&amount}</span>
                                        <span className="font-semibold text-xl">NEAR</span>
                                        <span className="font-semibold text-[#00000092]">~ ${nearToUsd&&(nearToUsd*Number(amount)).toFixed(2)}</span>
                                    </div>
                                    <div className="mt-10">
                                        <p className="text-base font-medium text-gray-900">
                                            Breakdown
                                        </p>
                                        <div className="mt-2 border text-[#00000093] border-gray-300 shadow-sm flex flex-col gap-3 rounded-lg max-h-[200px] w-full p-5">
                                            <div className="flex flex-row justify-between items-center">
                                                <span>Protocol fee (2.5%)</span>
                                                <div className="flex gap-2">
                                                    <span className="text-black">{amount?Number(amount)*0.25:0}</span>
                                                    <img width={15} src="/assets/near-white.svg" alt="logo" />
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-between items-center">
                                                <span>On-Chain Storage</span>
                                                <div className="flex gap-2">
                                                    <span className="text-black">&#60;0.01</span>
                                                    <img width={15} src="/assets/near-white.svg" alt="logo" />
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-between items-center">
                                                <span>Project allocation (97.5%)</span>
                                                <div className="flex gap-2">
                                                    <span className="text-black">{amount?Number(amount)*0.975:0}</span>
                                                    <img width={15} src="/assets/near-white.svg" alt="logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        isNote
                                        ?(
                                            <div className="mt-4">
                                                <label className="font-medium" htmlFor="note">Note</label>
                                                <textarea onChange={handleNote} id="note" rows={2} className="block mt-1 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 focus:outline-none" placeholder="Write your thoughts here..."></textarea>
                                            </div>
                                        )
                                        :(
                                            <button onClick={()=>setIsNote(true)} className="mt-8 flex gap-2 items-center">
                                                <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.249054 13.7509H3.06155L11.3566 5.4559L8.54405 2.6434L0.249054 10.9384V13.7509ZM1.74905 11.5609L8.54405 4.7659L9.23405 5.4559L2.43905 12.2509H1.74905V11.5609Z" fill="#7B7B7B"></path> <path d="M11.7766 0.468398C11.4841 0.175898 11.0116 0.175898 10.7191 0.468398L9.34655 1.8409L12.1591 4.6534L13.5316 3.2809C13.8241 2.9884 13.8241 2.5159 13.5316 2.2234L11.7766 0.468398Z" fill="#7B7B7B"></path> </svg>
                                                <p className="text-sm font-medium">Add Note</p>
                                            </button>
                                        )
                                    }
                                    {status&&(
                                        <div className="mt-5">
                                            <Alert error={status as string}/>
                                        </div>
                                    )}
                                    <div className="absolute bottom-5 right-0 px-5">
                                        <button
                                        onClick={handleDonation}
                                            className={`inline-flex w-[200px] disabled:bg-gray-300 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80`}
                                            type="button"
                                        >
                                            Confirm donation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PotLock;