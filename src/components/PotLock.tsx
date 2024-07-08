import Header from "@/components/Header";
import Link from "next/link";
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import axios from "axios";


const PotLock = () =>{
    const [accountId,setAccountId] = useState<string|null>(null); 
    const [projects,setProjects] = useState<any>([]||JSON.parse(localStorage.getItem("potlock") as string));

    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccountId(rs as string))
        //setAllRegistrations(JSON.parse(localStorage.getItem("allRegistrations") as string))
        loadData();
    },[accountId])

    const loadData = async() =>{
        const response = await axios.get("/api/potlock");
        localStorage.setItem("potlock",JSON.stringify(response.data))
        //console.log("response",response.data)
        setProjects(response.data);
    }
    
    const truncate = (str:string)=>{
        if(str.length > 80){
            return str.slice(0,80)+"..."
        }
        return str;
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
                                {!project.registrant.near_social_profile_data.backgroundImage.nft
                                    ? project.registrant.near_social_profile_data.backgroundImage.url
                                    ?<img className="card-img" src={project.registrant.near_social_profile_data.backgroundImage.url} alt="background" />
                                    :<img className="card-img" src={`https://ipfs.near.social/ipfs/${project.registrant.near_social_profile_data.backgroundImage.ipfs_cid}`} alt="background" />
                                    : <img className="card-img" src={project.registrant.near_social_profile_data.backgroundImage.nft.media} alt="background" />
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
                                    <button className="donation-button">Donate</button>
                                </div>
                            </div>
                        )):(
                            <div className="flex flex-col gap-5">
                                <CardSkeleton/>
                                <CardSkeleton/>
                            </div>
                        )}
                        {/* <div className="card">
                            <img className="card-img" src="https://ipfs.near.social/ipfs/bafybeieq3idn4iiqlc77rpnaevpvnmhodq2v2dqp7qoxzvm5drhqyhk2fy" alt="background" />
                            <div className="card-body">
                                <img className="card-avatar" src="https://ipfs.near.social/ipfs/bafybeiesrsf4fpdmlfgcnxpuxiqlgw2lk3bietdt25mvumrjk5yhf2c54e" alt="avatar" />
                                <p className="card-title">WebAssembly Music</p>
                                <p className="card-description">Music created in code, and a live-coding tool that I call "WebAssembly Music". I...</p>
                                <div className="card-tag-container">
                                    <div className="card-tag">
                                        School
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <p className="total-donate">$100</p>
                                <button className="donation-button">Donate</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PotLock;