

import {
  Card,
 
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Deposit, type MovementsProps } from "./Deposit"
import { Transfer } from "./Transfer"

export function ActionsButtons({AllDeposits,setAllDeposits,user,allUser }:MovementsProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="deposit">
        <TabsList>
          <TabsTrigger className="text-[#61a2b4]" value="deposit">Deposit</TabsTrigger>
                  <TabsTrigger className="text-[#61a2b4]" value="transfer">Transfer</TabsTrigger>
                  <TabsTrigger className="text-[#61a2b4]" value="withdrawal">Withdrawal</TabsTrigger>
                  <TabsTrigger className="text-[#61a2b4]" value="others">Others</TabsTrigger>
        </TabsList>
        <TabsContent value="deposit" className=" ">
          <Card className="border-none shadow-none">
           <Deposit allUser={allUser} user={user}AllDeposits={AllDeposits} setAllDeposits={setAllDeposits}/>
          </Card>
        </TabsContent>
        <TabsContent value="transfer">
          <Card className="border-none shadow-none">
            <Transfer users={allUser} user={user} allMovement={AllDeposits} setAllMovements={setAllDeposits}  />
          </Card>
              </TabsContent>
                <TabsContent value="withdrawal">
          <Card className="border-none shadow-none">
            <Transfer users={allUser} user={user} allMovement={AllDeposits} setAllMovements={setAllDeposits}  />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
