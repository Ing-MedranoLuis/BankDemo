import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from "@/data/bankingData"

import type { ChangeEvent, FormEvent } from "react"

interface Props{
  user: User,
  logIn: (e: FormEvent<HTMLFormElement>) => void,
  handleInputs: (e: ChangeEvent<HTMLInputElement>) => void,

}
export function LogIn({logIn,handleInputs,user }:Props) {

  
  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader>
        <CardTitle>Login to your Bank account demo</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e)=>logIn(e)} >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                type="text"
                placeholder="m@example.com"
                name="userName"
                value={user.userName}
                onChange={(e)=>handleInputs(e)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={user.password}
                onChange={(e)=>handleInputs(e)}
                required
              />
            </div>
          </div>
           <Button  type="submit" className="w-full">
          Login
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
       
        <Button variant="outline" className="w-full">
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}
