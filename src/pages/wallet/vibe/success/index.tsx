import dynamic from "next/dynamic"

const VibeSuccess = dynamic(()=>import("@/components/Wallet/Vibe/VibeSuccess"),{ssr:false})

export default function VibeSuccessPage(){
    return(
        <VibeSuccess/>
    )
}