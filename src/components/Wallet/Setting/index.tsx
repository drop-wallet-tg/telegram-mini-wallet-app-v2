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
                            <Link href="/wallet/setting/connected-apps" className="flex flex-row gap-8 items-center text-white hover:text-[#d6d6d6d2]">
                                <svg stroke="currentColor" fill="#ffffff" strokeWidth="0" viewBox="0 0 16 16" focusable="false" className="chakra-icon css-1yg2ldx" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.617 3.844a2.87 2.87 0 0 0-.451-.868l1.354-1.36L13.904 1l-1.36 1.354a2.877 2.877 0 0 0-.868-.452 3.073 3.073 0 0 0-2.14.075 3.03 3.03 0 0 0-.991.664L7 4.192l4.327 4.328 1.552-1.545c.287-.287.508-.618.663-.992a3.074 3.074 0 0 0 .075-2.14zm-.889 1.804a2.15 2.15 0 0 1-.471.705l-.93.93-3.09-3.09.93-.93a2.15 2.15 0 0 1 .704-.472 2.134 2.134 0 0 1 1.689.007c.264.114.494.271.69.472.2.195.358.426.472.69a2.134 2.134 0 0 1 .007 1.688zm-4.824 4.994l1.484-1.545-.616-.622-1.49 1.551-1.86-1.859 1.491-1.552L6.291 6 4.808 7.545l-.616-.615-1.551 1.545a3 3 0 0 0-.663.998 3.023 3.023 0 0 0-.233 1.169c0 .332.05.656.15.97.105.31.258.597.459.862L1 13.834l.615.615 1.36-1.353c.265.2.552.353.862.458.314.1.638.15.97.15.406 0 .796-.077 1.17-.232.378-.155.71-.376.998-.663l1.545-1.552-.616-.615zm-2.262 2.023a2.16 2.16 0 0 1-.834.164c-.301 0-.586-.057-.855-.17a2.278 2.278 0 0 1-.697-.466 2.28 2.28 0 0 1-.465-.697 2.167 2.167 0 0 1-.17-.854 2.16 2.16 0 0 1 .642-1.545l.93-.93 3.09 3.09-.93.93a2.22 2.22 0 0 1-.711.478z"></path></svg>
                                <div className="flex flex-col">
                                    <p className="font-semibold">Connected Apps</p>
                                    <small className="text-[#bdbdbd]">Manage app access to your wallet</small>
                                </div>
                            </Link>
                            <svg fill="#ffffff" height="13px" width="13px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" strokeWidth="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="/wallet/setting/security" className="flex flex-row gap-9 items-center text-white hover:text-[#d6d6d6d2]">
                                <svg stroke="currentColor" fill="#ffffff" height="1.7rem" width="1.7rem"  strokeWidth="0" viewBox="0 0 16 16" focusable="false" className="chakra-icon css-1yg2ldx" xmlns="http://www.w3.org/2000/svg"><path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"></path><path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"></path></svg>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold">Security and Recovery</p>
                                        <small className="text-[#bdbdbd]">Manage your wallet&apos;s secret phrase and private keys</small>
                                    </div>
                                </Link>
                            <svg fill="#ffffff" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" strokeWidth="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="/wallet/setting/change-password" className="flex flex-row gap-8 items-center text-white hover:text-[#d6d6d6d2]">
                                <svg stroke="currentColor" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" focusable="false" className="chakra-icon css-1yg2ldx" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M2 17h20v2H2v-2zm1.15-4.05L4 11.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H5.3l.85-1.47L4.85 7 4 8.47 3.15 7l-1.3.75.85 1.47H1v1.5h1.7l-.85 1.48 1.3.75zm6.7-.75l1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H15v-1.5h-1.7l.85-1.47-1.3-.75L12 8.47 11.15 7l-1.3.75.85 1.47H9v1.5h1.7l-.85 1.48zM23 9.22h-1.7l.85-1.47-1.3-.75L20 8.47 19.15 7l-1.3.75.85 1.47H17v1.5h1.7l-.85 1.48 1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H23v-1.5z"></path></svg>
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold">Change Password</p>
                                    <small className="text-[#bdbdbd]">Change the password used to unlock your wallet</small>
                                </div>
                            </Link>
                            <svg fill="#ffffff" height="13px" width="13px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" strokeWidth="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link href="/wallet/logout" className="flex flex-row gap-7 items-center text-white hover:text-[#d6d6d6d2]">
                                <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Log_Out"> <path id="Vector" d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                                <div className="flex flex-col">
                                    <p className="font-semibold ">Log Out</p>
                                    <small className="text-[#bdbdbd]">Log out this account from wallet</small>
                                </div>
                            </Link>
                            <svg fill="#ffffff" height="12px" width="12px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" strokeWidth="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
                        </div>
                        <p className="text-white font-semibold mt-5">App Settings</p>
                        <div  className="flex flex-row px-3 mt-2 items-center justify-between cursor-pointer text-white ">
                            <Link target="_blank" href="https://wallet.genadrop.xyz/support" className="flex flex-row gap-8 items-center hover:text-[#d6d6d6d2]">
                                <svg stroke="currentColor" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" focusable="false" className="chakra-icon css-1yg2ldx" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path fill-rule="nonzero" d="M20 20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9H1l10.327-9.388a1 1 0 0 1 1.346 0L23 11h-3v9zm-2-1V9.157l-6-5.454-6 5.454V19h12zm-6-2l-3.359-3.359a2.25 2.25 0 1 1 3.182-3.182l.177.177.177-.177a2.25 2.25 0 1 1 3.182 3.182L12 17z"></path></g></svg>
                                <div className="flex flex-col">
                                    <p className="font-semibold ">Drop Wallet Community</p>
                                    <small className="text-[#bdbdbd]">Come and join us</small>
                                </div>
                            </Link>
                            <svg fill="#ffffff" height="13px" width="13px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" strokeWidth="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
                        </div>
                        <div className="flex flex-row px-3 mt-2 items-center justify-between">
                            <Link target="_blank" href="https://t.me/Dropwalletbot" className="flex flex-row gap-8 items-center text-white hover:text-[#d6d6d6d2]">
                                <svg stroke="currentColor" fill="#ffffff" strokeWidth="0" viewBox="0 0 16 16" focusable="false" className="chakra-icon css-1yg2ldx" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg"><path d="M7.549 10.078c.46.182.88.424 1.258.725.378.3.701.65.97 1.046a4.829 4.829 0 0 1 .848 2.714V15H9.75v-.438a3.894 3.894 0 0 0-1.155-2.782 4.054 4.054 0 0 0-1.251-.84 3.898 3.898 0 0 0-1.532-.315A3.894 3.894 0 0 0 3.03 11.78a4.06 4.06 0 0 0-.84 1.251c-.206.474-.31.985-.315 1.531V15H1v-.438a4.724 4.724 0 0 1 .848-2.713 4.918 4.918 0 0 1 2.229-1.77 2.994 2.994 0 0 1-.555-.493 3.156 3.156 0 0 1-.417-.602 2.942 2.942 0 0 1-.26-.683 3.345 3.345 0 0 1-.095-.739c0-.423.08-.82.24-1.189a3.095 3.095 0 0 1 1.626-1.627 3.067 3.067 0 0 1 2.386-.007 3.095 3.095 0 0 1 1.627 1.627 3.067 3.067 0 0 1 .157 1.928c-.06.237-.148.465-.266.684a3.506 3.506 0 0 1-.417.608c-.16.187-.345.35-.554.492zM5.812 9.75c.301 0 .584-.057.848-.17a2.194 2.194 0 0 0 1.162-1.163c.119-.269.178-.554.178-.854a2.138 2.138 0 0 0-.643-1.538 2.383 2.383 0 0 0-.697-.472 2.048 2.048 0 0 0-.848-.178c-.3 0-.583.057-.847.17a2.218 2.218 0 0 0-1.17 1.17c-.113.264-.17.547-.17.848 0 .3.057.583.17.847.115.264.27.497.466.697a2.168 2.168 0 0 0 1.552.643zM15 1v7h-1.75l-2.625 2.625V8H9.75v-.875h1.75v1.388l1.388-1.388h1.237v-5.25h-8.75v1.572a7.255 7.255 0 0 0-.438.069 2.62 2.62 0 0 0-.437.123V1H15z"></path></svg>
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold">Report Issues or Give Feedback</p>
                                    <small className="text-[#bdbdbd]">Let us know what we can improve on</small>
                                </div>
                            </Link>
                            <svg fill="#ffffff" height="13px" width="13px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" strokeWidth="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}