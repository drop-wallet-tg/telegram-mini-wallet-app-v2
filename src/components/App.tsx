"use client"
import dynamic from "next/dynamic"
import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router"
import {decode as base64_decode, encode as base64_encode} from 'base-64';
const Home = dynamic(()=>import("@/components/Home"),{ssr:false})
const PasswordScreen = dynamic(()=>import("@/components/PasswordScreen"),{ssr: false})

const App = () => {
    const search = useSearchParams()
    const param = atob(search.get("tgWebAppStartParam") as string);
    const action = search.get("action")
    const app = search.get("app")
    const router = useRouter();
    const [isPassword, setIsPassword] = useState<string|null>(null);
    
    useEffect(()=>{
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
        
    },[param])
    
    useEffect(()=>{
        WebApp.CloudStorage.getItem("passwordScreen",(err,rs)=>{
            setIsPassword(rs as string)
        })
    },[])

    return (
        !isPassword?<Home/>:<PasswordScreen/>
    );
};

export default App;