import type { Movements, User } from "@/data/bankingData"
import { Deposit } from "./Deposit"
import { useMovements } from "@/hooks/useMovements"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import { motion } from "motion/react"

import { Transfer } from "./Transfer"

export interface Prop{
  user: User,
  setUser: Dispatch<SetStateAction<User>>,
  allUser:User[]
}
export const BankMain = ({ user,setUser,allUser }: Prop) => {
  const { allMovements, setAllMovements } = useMovements();
  
  useEffect(() => {
    getAccBalance(),
      console.log(allUser)
   
  }, [allMovements])
  

  const getAccBalance = (): User => {
    
    const getAllDepositsByAccNumber:Movements[] = allMovements.filter(e => e.fromAccId == user.accNumber);
    const totalBalance = getAllDepositsByAccNumber.reduce((sum, item) => sum + item.amount, 0)
    console.log(totalBalance)
    setUser(prev => ({ ...prev, balance: totalBalance }))
    return user;
     
  }
  return (
    <>
      <section>
        <div className="flex flex-row justify-between">
          <h1 className="text-shadow-lg text-white font-display px-4">{user.email}</h1>  
          <h1 className="text-shadow-lg text-white font-display px-4">Acc: {user.accNumber}</h1>  
        </div>
        
      </section>
    <section className=" w-full h-auto flex items-center font-display">
      
      <div className="p-5 max-w-90  bg-white w-full md-h-full h-auto rounded-4xl shadow-2xl max-h-3/4 m-auto ">
              <div className="flex flex-col items-center md-flex md-items-normal  ">
                <div className=" flex justify-center w-2/4 w-full">
                  <h1 className="text-yellow-500  text-center text-2xl md-text-3xl text-shadow-sm">Welcome Sr: {user.userName.toUpperCase()}</h1>
                </div>
                <motion.div initial={{scale:0}} animate={{scale:1}} className="w-2/4 full flex justify-center ">
                    <h1 className="  font-balance text-5xl md-text-8xl text-green-300 text-shadow-lg "> ${ user.balance}.00</h1>
                </motion.div>
              </div>
             
        <section>
          <div className="flex flex-col md-flex-row ">
            <div className="w-2/4 w-full order-2">
                <Deposit user={user} AllDeposits={allMovements} setAllDeposits={setAllMovements} />
                 <Transfer users={allUser} user={user} allMovement={allMovements} setAllMovements={setAllMovements}  />
                 
            </div>
            <motion.div initial={{scale:0}} animate={{scale:1}} className="w-4/4 md-w-2/4 order-1 md-order-2 flex justify-center ">
              <img className="w-3/4 md-w-3/4 pt-5 mb-4" src="img\card.png" alt="" />
            </motion.div>

          </div>
               
          <div>

          </div>
               <div className=" rounded p-4 max-w-4/4 m-auto" >
                 <h1 className="text-center py-2 animate-bounce text-yellow-500 text-shadow-sm">Movements</h1>
                 {
                  (allMovements.length!=0)
                   ? allMovements.map(e => (
                  
                  <div key={e.id}  className="text-xs">
                   
                       {allUser.filter(u => u.accNumber == e.toAccId)
                         .map((username) => (
                           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`${e.type=='Deposit'?'border-green-100':'border-red-100'} flex border border-gray-100 rounded-xl p-2 my-2 flex-row justify-between`}>
                        <h1 key={username.accNumber}>To: {username.userName}</h1>
                        <h1 key={username.accNumber} className={`${e.type=="Deposit"?'text-green-500':'text-red-500'}`}>${ e.amount}</h1>
                          <h1 key={username.accNumber} className="text-gray-500">{e.date}</h1>
                          <h1 key={username.accNumber} className={`${e.type=='Transfer'?"text-red-500":'text-green-500'} text-center`}>{e.type}</h1>
                      </motion.div>
                    ))}
                    
                  </div>


                ))
                



                : <h1 className="text-red-500 text-xs">No movements</h1>
            }
          </div>
        </section>
         
          </div>   
      </section>
      </>
  )
}
