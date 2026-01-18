import type { Movements, User } from '@/data/bankingData'
import  { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { motion } from "motion/react"

interface MovementsProps{
    allMovement: Movements[],
    setAllMovements: Dispatch<SetStateAction<Movements[]>>
    user: User,
    users:User[]
}

export const Transfer = ( {allMovement,setAllMovements,user,users }:MovementsProps) => {
    const [deposit, setDeposit] = useState<Movements>({
        id: 0,
        fromAccId: 0,
        amount: 0,
        type: '',
        toAccId: 0,
        date:0
    })
    const [userInfo, setUserInfo] = useState<User>({
        accNumber: 0,
        email: '',
        balance: 0,
        userName: '',
        password: '',
        isLoggedIn:false
        
    })
    useEffect(() => {
     getUserAcc()
    }, [userInfo])
    

    //handle current deposit
    const handleTransfer = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDeposit(prev => ({
            ...prev,
            [name]:value
        }))
      
    }
    //get Transfer acc Info
    const getUserAcc = () => {
          const getUserAccInfo = users.find(e => e.accNumber == Number(deposit.toAccId));
        if (getUserAccInfo) {
            setUserInfo(prev => ({
                ...prev,
                accNumber: getUserAccInfo.accNumber,
                email: getUserAccInfo.email,
                userName: getUserAccInfo.userName,
                
            }))
        }
        else {
           
               setUserInfo({
                ...userInfo,
                userName:   deposit.amount === 0 ? '' : 'No acc number found'
             }) 
           
            
        }
    }
    //Add Deposit-------------------
    const addTransfer = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if(deposit.amount>5000) return alert('must be less than 5000')
        if(deposit.amount<100)return alert('Your balance must be greater than 100')
        if(deposit.toAccId==user.accNumber)return alert("Should be adifferent acc")
        if (user.balance < deposit.amount) return alert("Your balance is low")
        
        const accTransferInformation = users.find(u => u.accNumber == Number(deposit.toAccId));
        if (accTransferInformation) {
            
       
            const updatedTransfer: Movements =
            {
                id: allMovement.length + 1,
                fromAccId: user.accNumber,
                toAccId: Number(deposit.toAccId),
                type: 'Transfer',
                amount: Number(-deposit.amount),
                date: Date.now()
            }
            setAllMovements(prev => ([...prev, updatedTransfer]))
        } else {
           
            return alert('User not found')
        }
        //clear deposit input
        setDeposit(prev=>({...prev,amount:0,toAccId:0}))
    }
    useEffect(() => {
     console.log(allMovement)
    }, [allMovement])
    

  return (
      <section className=' text-[#61a2b4]'>
          <motion.div  initial={{scale:0}} animate={{scale:1}}>
              <form onSubmit={(e)=>addTransfer(e)}
                  className="rounded-xl grid grid-cols-1 md:grid-cols-3 gap-2 bg-white shadow  p-4 max-w-lg">
               <div className="flex flex-col items">
               <label className='text-center  text-xs'>Acc</label>
                <input
                  type="number"
                  name="toAccId"
                  value={deposit.toAccId}
                  onChange={handleTransfer}
                  className="border text-sm  p-1 rounded-xl "
                   />
               </div>

              <div className="flex flex-col">
               <label className='text-center text-xs  '>Amount</label>
                 <input
                   type="number"
                   name="amount"
                   value={deposit.amount}
                   onChange={handleTransfer}
                   className="border text-sm p-1 rounded-xl   "
                      />
                      <label className='text-[10px] ' htmlFor="">{userInfo.userName}</label>
                  </div>
                  <div className='grid grid-cols-1'>
                      <button type='submit' className='border border-[#61a2b4] py-2 rounded-xl  '>Transfer</button>
                  </div>
</form> 
          </motion.div>
    </section>
  )
}
