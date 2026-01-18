import type { Movements, User } from '@/data/bankingData'
import  {  useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { motion } from "motion/react"
export interface MovementsProps{
    AllDeposits: Movements[],
    setAllDeposits: Dispatch<SetStateAction<Movements[]>>
    user: User,
    allUser:User[]
}

export const Deposit = ( {AllDeposits,setAllDeposits,user }:MovementsProps) => {
    const [deposit, setDeposit] = useState<Movements>({
        id: 0,
        fromAccId: 0,
        amount: 0,
        type: '',
        toAccId: 0,
        date:0
    })
  

    //handle current deposit
    const handleDeposit = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDeposit(prev => ({
            ...prev,
            [name]:value
        }))
    }
    //Add Deposit-------------------
    const addDeposit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if(deposit.amount>5000) return alert('must be less than 5000')
        if(deposit.amount<100)return alert('must be greater than 100')
        if(deposit.toAccId==user.accNumber)return alert("Should be adifferent acc")
        
        const updatedDeposit: Movements =
        {
            id: AllDeposits.length + 1,
            fromAccId: user.accNumber,
            toAccId: Number(deposit.toAccId),
            type: 'Deposit',
            amount: Number(deposit.amount),
            date: Date.now(),
             }
        setAllDeposits(prev => ([...prev, updatedDeposit]))
        //clear deposit input
        setDeposit(prev=>({...prev,amount:0,toAccId:0}))
    }
   
    

  return (
      <section>
          <motion.div  initial={{scale:0}} animate={{scale:1}}>
              <form onSubmit={(e)=>addDeposit(e)}
                  className="rounded-xl grid grid-cols-1 md:grid-cols-3 gap-2  shadow p-4 max-w-lg">
               <div className="flex flex-col items">
               <label className='text-center text-[#61a2b4] text-xs'>Acc</label>
                <input
                  type="number"
                  name="toAccId"
                  value={deposit.toAccId}
                  onChange={handleDeposit}
                  className="border text-sm p-1 rounded-xl text-[#61a2b4]  "
                   />
               </div>

  <div className="flex flex-col">
    <label className='text-center text-xs text-[#61a2b4] '>Amount</label>
    <input
      type="number"
      name="amount"
      value={deposit.amount}
      onChange={handleDeposit}
      className="border text-sm p-1 rounded-xl text-[#61a2b4] "
    />
                  </div>
                  <div className='grid grid-cols-1'>
                      <button type='submit' className='text-sm border border-[#61a2b4] py-2 rounded-xl bg-[#61a2b4]  text-white cursor-pointer'><i className="bi bi-send"></i></button>
                  </div>
</form> 
          </motion.div>
    </section>
  )
}
