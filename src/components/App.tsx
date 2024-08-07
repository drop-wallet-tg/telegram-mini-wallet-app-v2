"use client"
import dynamic from "next/dynamic"
import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"

const Home = dynamic(()=>import("@/components/Home"),{ssr:false})
const PasswordScreen = dynamic(()=>import("@/components/PasswordScreen"),{ssr: false})

const App = () => {
    const [isPassword, setIsPassword] = useState<string|null>(null)

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