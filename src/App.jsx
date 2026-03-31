import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  let [length, setlength] = useState(8)
  let [numberallowed, setnumber] = useState(false)
  let [charallowed, setcharater] = useState(false)
  let [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallowed) str += "0123456789"
    if (charallowed) str += "$%#@_-!"

    for (let i = 0; i < length; i++) {
      const value = Math.floor(Math.random() * str.length)
      pass += str.charAt(value)
    }

    setPassword(pass)
    // It saves the generated password

  }, [length, numberallowed, charallowed])

  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator])
  // useEffect()-> Runs automatically when passwordGenerator changes (length or number or character)


  const copytoclipboard=()=>{
    navigator.clipboard.writeText(password);
    alert("copied to clipboard")
  }

// 👉 Copies password to clipboard
//  Shows alert

  return (
    <>
      <div className='w-full px-2 max-w-md bg-gray-500 mx-auto shadow-md rounded-lg text-red-500'>
        <h1 className='text-white text-center'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            placeholder='Password'
            className='outline-none w-full bg-amber-50 px-2'
            readOnly
          />
          <button onClick={copytoclipboard} className='outline-none bg-blue-500 text-white py-1.5 px-3'>
            Copy
          </button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>

            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(Number(e.target.value))}
            />
            <label>Length: {length}</label>

            <input
              type="checkbox"
              checked={numberallowed}
              onChange={() => setnumber(prev => !prev)}
            />
            <label>Numbers</label>

            <input
              type="checkbox"
              checked={charallowed}
              onChange={() => setcharater(prev => !prev)}
            />
            <label>Characters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App