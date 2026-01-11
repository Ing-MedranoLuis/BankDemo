import  { BankMain } from "@/components/BankMain";
import { LogIn } from "@/components/LogIn"
import { useLogIn } from "@/hooks/useLogIn"



export const Index = () => {
  const { user,logIn,handleInputs,setUser,users } = useLogIn();
  

  return (
    <div className="h-auto py-5 bg-gradient-to-t from-gray-100 from-0% to-amber-400 to-100%">
      <section className="h-full ">
        {(user.isLoggedIn
          ?
          <section className="h-full">
             <BankMain user={user} setUser={setUser} allUser={users}/>
          </section>
          : 
          <section className="h-full  flex justify-center items-center">
            <LogIn logIn={logIn} handleInputs={handleInputs} user={user} />
          </section>)}
     </section>
    </div>
  )
}
