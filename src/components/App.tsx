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
    const action = search.get("action")
    const app = search.get("app")
    const router = useRouter();
    const [account, setAccount] = useState<string|null>(null)
    const [isPassword, setIsPassword] = useState<string|null>(null);
    useEffect(()=>{
        WebApp.CloudStorage.getItem("account",(err,rs)=>{
            setAccount(account)
            if(!rs){
                router.push("/wallet")
            }
        })
    },[account])

    
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