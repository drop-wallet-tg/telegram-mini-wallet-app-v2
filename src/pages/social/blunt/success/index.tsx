import dynamic from "next/dynamic"

const Success = dynamic(()=>import("@/components/Social/Blunt/BluntSuccess"),{ssr:false})

export default function BluntSuccess(){
    return(
        <Success/>
    )
}