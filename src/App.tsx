import { Clipboard, Check } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Slider } from "./components/ui/slider"
import { Checkbox } from "./components/ui/checkbox"
import { useCallback, useEffect, useRef, useState } from "react"

export default function Home() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [allowNum, setAllowNum] = useState(false);
  const [allowChar, setAllowChar] = useState(false);

  const passwordRef = useRef<null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (allowNum) str += "0123456789"
    if (allowChar) str += "!@#$%^&*()_-+="

    for (let i = 1; i <= length; i++) {
      let randomNum = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(randomNum)
    }

    setPassword(pass)

  }, [length, allowNum, allowChar])

  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setIsCopied(false)
      })
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, allowNum, allowChar])

  return (
    <main className="bg-slate-50 w-full h-screen flex justify-center items-center p-4">
      <div className="border-2 rounded-md p-4 sm:w-full md:w-3/4 lg:w-1/2">
        <h1 className="text-center font-medium text-2xl">Password Generator</h1>
        <div className="flex w-full items-center space-x-2 my-6">
          <Input ref={passwordRef} type="text" value={password} readOnly className="cursor-default" />
          <Button onClick={copyPassword} size="icon">{isCopied ? <Check /> : <Clipboard />}</Button>
        </div>
        <div className="flex gap-4 items-center my-6">
          <Slider
            onValueChange={(value) => setLength(value[0])}
            value={[length]}
            max={12}
            min={6}
            step={1}
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="numbers" checked={allowNum} onCheckedChange={() => setAllowNum(prev => !prev)} />
            <label
              htmlFor="numbers"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Numbers
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="characters" checked={allowChar} onCheckedChange={() => setAllowChar(prev => !prev)} />
            <label
              htmlFor="characters"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </main >
  )
}