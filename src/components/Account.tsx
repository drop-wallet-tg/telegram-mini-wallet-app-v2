import WebApp from "@twa-dev/sdk";

type Account = {
    name: string,
    privateKey: string
}

export default function Account({data}:{data:any}){
    const selectIndex = Number(localStorage.getItem("item"))??0;
    
    function strucate(str: string){
        let account;
        if(str){
            if(str.length > 10){
                const format = str.replace(".near","");
                account = format.slice(0,3)+'...'+format.slice(-3);
            }else{
                account = str;
            }
        }
        return account as string;
    }

    const handleChooseAccount = (data:Account,i:number) =>{
        if(data){
            localStorage.setItem("item",i.toString())
            WebApp.CloudStorage.setItem("privateKey",data.privateKey);
            WebApp.CloudStorage.setItem("account",data.name);
            location.replace("/")
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