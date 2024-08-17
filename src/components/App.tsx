"use client"
import dynamic from "next/dynamic"
import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router"

const Home = dynamic(()=>import("@/components/Home"),{ssr:false})
const PasswordScreen = dynamic(()=>import("@/components/PasswordScreen"),{ssr: false})

const App = () => {
    const search = useSearchParams()
    const param = search.get("tgWebAppStartParam");
    const router = useRouter();
    //tgWebAppStartParam
    //console.log("param",param)
    const [isPassword, setIsPassword] = useState<string|null>(null);
    useEffect(()=>{
        if(param=="potlock"){
            router.push("/digital/potlock")
        }else if(param == "send"){
            router.push("/wallet/send")
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