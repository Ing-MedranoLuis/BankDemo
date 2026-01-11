import type { Movements } from '@/data/bankingData';
import  { useState } from 'react'

export const useMovements = () => {
      const [allMovements, setAllMovements] = useState<Movements[]>([]);
 
    return {
        allMovements,
        setAllMovements
    }
     
       
         
          
   
  
}
