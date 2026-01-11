import type { Movements, User } from '@/data/bankingData'
import  { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { motion } from "motion/react"
interface MovementsProps{
    AllDeposits: Movements[],
    setAllDeposits: Dispatch<SetStateAction<Movements[]>>
    user:User
}

export const Deposit = ( {AllDeposits,setAllDeposits,user }:MovementsProps) => {
    const [deposit, setDeposit] = useState<Movements>({
        id: 0,
        fromAccId: 0,
        amount: 0,
        type: '',
        toAccId: 0,
        date:''
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
            date:new Date(Date.now()).toLocaleDateString("es-DO")
             }
        setAllDeposits(prev => ([...prev, updatedDeposit]))
        //clear deposit input
        setDeposit(prev=>({...prev,amount:0,toAccId:0}))
    }
    useEffect(() => {
     console.log(AllDeposits)
    }, [AllDeposits])
    

  return (
      <section>
          <motion.div  initial={{scale:0}} animate={{scale:1}}>
              <form onSubmit={(e)=>addDeposit(e)}
                  className="rounded-xl grid grid-cols-1 md:grid-cols-3 gap-2  shadow p-4 max-w-lg">
               <div className="flex flex-col items">
               <label className='text-center text-yellow-500 text-xs'>Acc</label>
                <input
                  type="number"
                  name="toAccId"
                  value={deposit.toAccId}
                  onChange={handleDeposit}
                  className="border text-sm p-1 rounded-xl text-yellow-500  "
                   />
               </div>

  <div className="flex flex-col">
    <label className='text-center text-xs text-yellow-500 '>Amount</label>
    <input
      type="number"
      name="amount"
      value={deposit.amount}
      onChange={handleDeposit}
      className="border text-sm p-1 rounded-xl text-yellow-500  "
    />
                  </div>
                  <div className='grid grid-cols-1'>
                      <button type='submit' className='border border-green-500 py-2 rounded-xl  text-green-500'>Deposit</button>
                  </div>
</form> 
          </motion.div>
    </section>
  )
}
