import WebApp from "@twa-dev/sdk";
import { useRouter } from "next/router";

type Account = {
    name: string,
    privateKey: string
}

export default function Account({data}:{data:any}){
    const selectIndex = Number(localStorage.getItem("item"))??0;
    const router = useRouter()
    function strucate(str: string){
        const format = str&&str.replace(".near","");
        if(format.length > 10){
            return format.slice(0,3)+'...'+format.slice(-3)+".near";
        }
        return format+'.near';
    }

    const handleChooseAccount = (data:Account,i:number) =>{
        if(data){
            localStorage.setItem("item",i.toString())
            WebApp.CloudStorage.setItem("privateKey",data.privateKey);
            WebApp.CloudStorage.setItem("account",data.name);
            router.push("/home")
        }
    }

    return(
        data&&data.map((dt:Account,index:number)=>{
            return(
                <div key={index} onClick={()=>handleChooseAccount(dt,index)} className="flex flex-row gap-8 items-center cursor-pointer px-2 py-1 hover:bg-black hover:bg-opacity-20">
                    {
                        selectIndex==index?<img width={23} src="/assets/check.svg" alt="check" />:<div className="w-[1.3rem] h-[1.3rem] bg-black bg-opacity-30 rounded-full"></div>
                    }
                    <div className="flex flex-col">
                        <p className="text-white font-semibold">{strucate(dt.name).includes(".near")?strucate(dt.name).replace(".near",""):strucate(dt.name)}</p>
                        <small className="text-[#ffffff8a]">{strucate(dt.name)}</small>
                    </div>
                </div>
            )
        })
    )
}