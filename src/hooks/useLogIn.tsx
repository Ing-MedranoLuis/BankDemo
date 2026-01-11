import type { User } from '@/data/bankingData'
import  {  useState, type ChangeEvent, type FormEvent } from 'react'

export const useLogIn = () => {
    const [user, setUser] = useState<User>({
        userName: '',
        password: '',
        isLoggedIn: false,
        accNumber: 0,
        balance: 0,
        email:'ing.luis@gmail.com'
    })
    const [users, setUsers] = useState<User[]>([{
        userName: 'Luis',
        password: '123',
        isLoggedIn: false,
        accNumber: 1,
        balance: 0,
        email:'ing.luismedrano0723@gmail.com'
    },{
        userName: 'ing23',
        password: '123',
        isLoggedIn: false,
        accNumber: 2,
        balance: 100,
        email:'test@gmail.com'
        },{
        userName: 'test',
        password: '123',
        isLoggedIn: false,
        accNumber: 3,
        balance: 100,
        email:'test@gmail.com'
        },])
    
   

    const handleInputs = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setUser(prev => ({...prev,[name]:value}))
    }
    const logIn = (e: FormEvent<HTMLFormElement> | null) => {
        e?.preventDefault();
        const actualUser = users.find
            (e => e.userName.toLocaleLowerCase() == user.userName
                .toLocaleLowerCase() && e.password.toLocaleLowerCase()
                == user.password.toLocaleLowerCase());
        if (actualUser) {
            
            setUser(prev => ({ ...prev, isLoggedIn: !prev.isLoggedIn,accNumber:actualUser.accNumber,balance:actualUser.balance }))
    
        } else
        {
            alert('Usuario no encontrado')
        }
    }

  
    return {user,users,setUser,setUsers,handleInputs,logIn
    
}
}
