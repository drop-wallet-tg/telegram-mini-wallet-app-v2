import dynamic from "next/dynamic"

const Vibe = dynamic(()=>import("@/components/Wallet/Vibe"),{ssr:false})

export default function VibePage(){
    return(
        <Vibe/>
    )
}