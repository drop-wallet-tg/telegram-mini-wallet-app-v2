import dynamic from "next/dynamic";

const Blunt = dynamic(()=>import("@/components/Social/Blunt/index"),{ssr:false})

export default function BluntDao(){
    return(
        <Blunt/>
    )
}