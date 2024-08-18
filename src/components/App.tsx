"use client"
import dynamic from "next/dynamic"
import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
const Home = dynamic(()=>import("@/components/Home"),{ssr:false})
const PasswordScreen = dynamic(()=>import("@/components/PasswordScreen"),{ssr: false})

const App = () => {
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
        })
    },[])

    return (
        !isPassword?<Home/>:<PasswordScreen/>
    );
};

export default App;