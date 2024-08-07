"use client"
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import WebApp from "@twa-dev/sdk";

const ChangePassword = () =>{
    const [isView, setIsView] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [isNotMatch, setIsNotMatch] = useState<boolean>(false)
    const [isDisable, setIsDisable] = useState<boolean>(true);
    const [status, setStatus] = useState<string|null>(null)
    const [passwordConfirm, setPasswordConfirm] = useState<string|null>(null)
    const [question, setQuestion] = useState<string|null>(null)
    const [answer, setAnswer] = useState<string|null>(null)
    const [error, setError] = useState<string|null>(null)

    const handleChangePassword = (event:any) =>{
        setPassword(event.target.value.trim())
    }

    const handleConfirmPassword = (event:any) =>{
        const pass = event.target.value.trim();
        setPasswordConfirm(pass)
        if(pass==password){
            setIsNotMatch(false)
            setIsDisable(false)
        }else{
            setIsNotMatch(true)
        }
    }

    const changeQuestion = (event:any) =>{
        const question = event.target.value;
        setQuestion(question)
    }

    const changeAnswer = (event:any) =>{
        const answer = event.target.value;
        setAnswer(answer)
    }

    const onSetPassword = () =>{
        if(password&&passwordConfirm&&question&&answer){
            WebApp.CloudStorage.setItem("passwordScreen",password)
            WebApp.CloudStorage.setItem("question",question as string)
            WebApp.CloudStorage.setItem("answer",answer as string)
            setPassword('')
            setPasswordConfirm('')
            setQuestion('')
            setAnswer('')
            setStatus("<b>Change password successfull</b>")
            setTimeout(() => {
                setStatus(null)
            }, 1500);
        }else{
            setError("<b>Please fill in the field!</b>")
            setTimeout(() => {
                setError(null)
            }, 1500);
        }
    }  

    return(
        <div className="w-full min-h-screen bg-[#180E35] relative">
            <Header/>
            {status&&(
                <div className="absolute w-full top-16 left-0">
                    <div className="bg-[#ACE1AF] px-4  py-2 w-2/3 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg">
                        <svg viewBox="0 0 24 24" className="text-[#00A86B] w-5 h-5 sm:w-5 sm:h-5 mr-3">
                            <path fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                            </path>
                        </svg>
                        <div className="text-[#00A86B] text-sm" dangerouslySetInnerHTML={{__html:status as string}}/>
                    </div>
                </div>
            )}
            {
                error&&(
                    <div className="absolute w-full top-16 left-0">
                        <div className="bg-red-200 px-4 py-2 my-4 w-2/3 rounded-md text-lg flex gap-2 items-center mx-auto max-w-lg">
                            <img width={18} src="/assets/icon/error.svg" alt="icon" />
                            <div className="text-[#E32636] text-sm" dangerouslySetInnerHTML={{__html:error as string}}/>
                        </div>
                    </div>
                )
            }
            <div className="p-5">
                <div className="flex flex-row items-center text-center">
                    <Link href="/wallet/setting">
                        <img className="bg-black bg-opacity-25 rounded-full hover:bg-opacity-35" src="/images/icon/Arrow.svg" alt="arrow" />
                    </Link>
                    <label className="text-lg text-white font-bold m-auto">Change Password</label>
                </div>
                <div className="mt-12 text-white">
                    <h2 className="font-bold text-2xl">Create a new password</h2>
                    <span className="text-sm text-[#8a8989]">You will use this to unlock your wallet</span>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="flex flex-row w-full px-3 py-2 bg-black bg-opacity-30 rounded-full items-center">
                            <input value={password} onChange={handleChangePassword} placeholder="Enter Password" type={`${isView?"text":"password"}`} className="w-full px-2 bg-transparent border-none outline-none placeholder:text-[#9191918a]" />
                            <button onClick={()=>setIsView((prv)=>!prv)} className="bg-white bg-opacity-10 rounded-full p-2 flex justify-center items-center">
                                {
                                    isView?
                                    <img width={20} height={20} src="/assets/icon/view.svg" alt="icon" />
                                    :<img width={20} height={20} src="/assets/icon/not-view.svg" alt="icon" />
                                }
                            </button>
                        </div>
                        <input value={passwordConfirm as string} type="password" onChange={handleConfirmPassword} className={`${isNotMatch?"border border-red-500 text-red-500":"border-none"} w-full px-5 py-3 bg-black bg-opacity-30 rounded-full outline-none placeholder:text-[#9191918a]`} placeholder="Confirm Password" />
                    </div>
                    {
                        isNotMatch&& <small className="mt-1 ml-3 text-[#DC143C]">Password not match</small>
                    }
                    <div className="mt-3 ml-2 ">
                        <div className="w-[100px] bg-gray-200 bg-opacity-15 rounded-lg ">
                            <div style={{
                                height: "8px",
                                width: `${password?.length <= 0?"0%":password.length > 1 && password.length<5?"30%":password.length > 5 && password.length<10?"70%":password.length>10&&"100%"}`,
                                backgroundColor: `${password?.length < 5?"#DC143C":password.length>5&&password.length<9?"#FFC300":password.length>10&&"#50C878"}`,
                                transition: "width 0.5s",
                                borderRadius: "50px"
                            }}/>
                        </div>
                        <small className="mt-2 text-[#ffffff8a]">{password?.length <= 0?"Too weak":password.length >= 1 && password.length<=5?"Too weak":password.length > 5 && password.length<=10?"Medium":password.length>10&&"Strong"}</small>
                    </div>
                </div>
                <div className="mt-5 text-white">
                    <h2 className="text-white font-bold text-2xl">Password hint</h2>
                    <span className="text-sm text-[#8a8989]">You can reset password when forgot password</span>
                    <div className="mt-5 flex flex-col gap-3">
                        <div className="flex flex-col">
                            <input value={question as string} onChange={changeQuestion} type="text" className={` w-full px-5 py-3 bg-black bg-opacity-30 rounded-full outline-none placeholder:text-[#9191918a]`} placeholder="Security Question" />
                            {question&&
                                question?.length > 120&&<small className="mt-1 ml-3 text-[#DC143C]">Question too long</small>
                            }
                        </div>
                        <input value={answer as string} onChange={changeAnswer} type="text" className={` w-full px-5 py-3 bg-black bg-opacity-30 rounded-full outline-none placeholder:text-[#9191918a]`} placeholder="Answer" />
                    </div>
                </div>
                <div className="mt-10">
                    <button onClick={onSetPassword} disabled={isDisable} className="px-3 py-2 w-full rounded-full bg-[#411EDF] mt-4 hover:bg-opacity-85 disabled:bg-opacity-55 disabled:text-[#c2c2c2] text-[#fff] ">
                        <span className="font-semibold">Change password</span>
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default ChangePassword;