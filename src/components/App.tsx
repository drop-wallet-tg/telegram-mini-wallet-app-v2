"use client"
import dynamic from "next/dynamic"
import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router"
import {decode as base64_decode} from 'base-64';
const Home = dynamic(()=>import("@/components/Home"),{ssr:false})
const PasswordScreen = dynamic(()=>import("@/components/PasswordScreen"),{ssr: false})

const App = () => {
    const search = useSearchParams()
    const param = base64_decode(search.get("tgWebAppStartParam") as string);
    const action = search.get("action")
    const app = search.get("app")
    const router = useRouter();
    const [isPassword, setIsPassword] = useState<string|null>(null);
    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>{
            if(!rs){
                router.push("/wallet")
            }
        })
    },[])

    
    useEffect(()=>{
        WebApp.CloudStorage.getItem("passwordScreen",(err,rs)=>{
            setIsPassword(rs as string)
            if(!rs){
                switch(action){
                    case "openApp":
                        switch(app){
                            case "potlock":
                                router.push("/digital/potlock")
                            default:
                                return ;
                        }
                    default:
                        return;
                }
            }
        })
    },[param])

    return (
        !isPassword?<Home/>:<PasswordScreen/>
    );
};

export default App;