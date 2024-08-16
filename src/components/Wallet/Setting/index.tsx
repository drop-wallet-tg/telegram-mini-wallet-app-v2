"use client"
import Footer from "@/components/Footer";
import { useState,useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import dynamic from "next/dynamic";
import Link from "next/link";


const Header = dynamic(()=>import("@/components/Header"),{ssr:false})


export default function Setting(){
    const [account,setAccount] = useState<string>('');
    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>setAccount(rs as string))
    },[account])

    function struncate(str: string){
        let account;
        if(str){
            if(str.length > 30){
                const format = str.replace(".near","");
                account = format.slice(0,3)+'...'+format.slice(-3);
            }else{
                account = str;
            }
        }
        return account as string;
    }

    return(
        <div className="w-full bg-[#180E35]">
            <div className="min-h-screen">
                <Header/>
                <div className="p-5 mt-5 relative">
                    <div className="flex flex-row gap-5 items-center px-2">
                        <div className="h-30 w-30 rounded-full p-3 bg-[#ffffff1a]">
                            <img width={55} src="/images/logo/logo.svg" alt="icon" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-white font-semibold text-lg">{account&&struncate(account).includes(".near")?account.replace(".near", ""):struncate(account)}</label>
                            <small className="text-[#bdbdbd]">-</small>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        <p className="text-white font-semibold">Wallet Settings</p>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="/wallet/setting/connected-apps" className="flex flex-row gap-5 items-center text-white hover:text-[#d6d6d6d2]">
                                <img width={30} src="/assets/icon/connect.svg" alt="icon" />
                                <div className="flex flex-col">
                                    <p className="font-semibold">Connected Apps</p>
                                    <small className="text-[#bdbdbd]">Manage app access to your wallet</small>
                                </div>
                            </Link>
                            <img width={20} src="/assets/icon/arrow-right.svg" alt="icon" />
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="/wallet/setting/security" className="flex flex-row gap-5 items-center text-white hover:text-[#d6d6d6d2]">
                                <img width={30} src="/assets/icon/security.svg" alt="icon" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold">Security and Recovery</p>
                                    <small className="text-[#bdbdbd]">Manage your wallet&apos;s secret phrase and private keys</small>
                                </div>
                            </Link>
                            <img width={20} src="/assets/icon/arrow-right.svg" alt="icon" />
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="/wallet/setting/change-password" className="flex flex-row gap-5 items-center text-white hover:text-[#d6d6d6d2]">
                                <img width={30} src="/assets/icon/change-password.svg" alt="icon" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold">Change Password</p>
                                    <small className="text-[#bdbdbd]">Change the password used to unlock your wallet</small>
                                </div>
                            </Link>
                            <img width={20} src="/assets/icon/arrow-right.svg" alt="icon" />
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="/wallet/setting/remove-password" className="flex flex-row gap-5 items-center text-white hover:text-[#d6d6d6d2]">
                                <img width={30} src="/assets/icon/delete-password.svg" alt="icon" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold">Remove Password</p>
                                    <small className="text-[#bdbdbd]">Delete user password no longer need to login</small>
                                </div>
                            </Link>
                            <img width={20} src="/assets/icon/arrow-right.svg" alt="icon" />
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="/wallet/logout" className="flex flex-row gap-5 items-center text-white hover:text-[#d6d6d6d2]">
                                <img width={30} src="/assets/icon/logout.svg" alt="icon" />
                                <div className="flex flex-col">
                                    <p className="font-semibold ">Log Out</p>
                                    <small className="text-[#bdbdbd]">Log out this account from wallet</small>
                                </div>
                            </Link>
                            <img width={20} src="/assets/icon/arrow-right.svg" alt="icon" />
                        </div>
                        <p className="text-white font-semibold mt-5">App Settings</p>
                        <div  className="flex flex-row px-3 mt-2 items-center justify-between cursor-pointer text-white ">
                            <Link href="https://wallet.genadrop.xyz/support" className="flex flex-row gap-5 items-center hover:text-[#d6d6d6d2]">
                                <svg stroke="currentColor" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" focusable="false" className="chakra-icon css-1yg2ldx" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path fill-rule="nonzero" d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zm-2-1V9.157l-6-5.454-6 5.454V19h12zm-6-2l-3.359-3.359a2.25 2.25 0 1 1 3.182-3.182l.177.177.177-.177a2.25 2.25 0 1 1 3.182 3.182L12 17z"></path></g></svg>
                                <div className="flex flex-col">
                                    <p className="font-semibold ">Drop Wallet Community</p>
                                    <small className="text-[#bdbdbd]">Come and join us</small>
                                </div>
                            </Link>
                            <img width={20} src="/assets/icon/arrow-right.svg" alt="icon" />
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="https://wallet.genadrop.xyz/support" className="flex flex-row gap-5 items-center text-white hover:text-[#d6d6d6d2]">
                                <svg stroke="currentColor" fill="#ffffff" strokeWidth="0" viewBox="0 0 16 16" focusable="false" className="chakra-icon css-1yg2ldx" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M7.549 10.078c.46.182.88.424 1.258.725.378.3.701.65.97 1.046a4.829 4.829 0 0 1 .848 2.714V15H9.75v-.438a3.894 3.894 0 0 0-1.155-2.782 4.054 4.054 0 0 0-1.251-.84 3.898 3.898 0 0 0-1.532-.315A3.894 3.894 0 0 0 3.03 11.78a4.06 4.06 0 0 0-.84 1.251c-.206.474-.31.985-.315 1.531V15H1v-.438a4.724 4.724 0 0 1 .848-2.713 4.918 4.918 0 0 1 2.229-1.77 2.994 2.994 0 0 1-.555-.493 3.156 3.156 0 0 1-.417-.602 2.942 2.942 0 0 1-.26-.683 3.345 3.345 0 0 1-.095-.739c0-.423.08-.82.24-1.189a3.095 3.095 0 0 1 1.626-1.627 3.067 3.067 0 0 1 2.386-.007 3.095 3.095 0 0 1 1.627 1.627 3.067 3.067 0 0 1 .157 1.928c-.06.237-.148.465-.266.684a3.506 3.506 0 0 1-.417.608c-.16.187-.345.35-.554.492zM5.812 9.75c.301 0 .584-.057.848-.17a2.194 2.194 0 0 0 1.162-1.163c.119-.269.178-.554.178-.854a2.138 2.138 0 0 0-.643-1.538 2.383 2.383 0 0 0-.697-.472 2.048 2.048 0 0 0-.848-.178c-.3 0-.583.057-.847.17a2.218 2.218 0 0 0-1.17 1.17c-.113.264-.17.547-.17.848 0 .3.057.583.17.847.115.264.27.497.466.697a2.168 2.168 0 0 0 1.552.643zM15 1v7h-1.75l-2.625 2.625V8H9.75v-.875h1.75v1.388l1.388-1.388h1.237v-5.25h-8.75v1.572a7.255 7.255 0 0 0-.438.069 2.62 2.62 0 0 0-.437.123V1H15z"></path></svg>
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold">Report Issues or Give Feedback</p>
                                    <small className="text-[#bdbdbd]">Let us know what we can improve on</small>
                                </div>
                            </Link>
                            <img width={20} src="/assets/icon/arrow-right.svg" alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}