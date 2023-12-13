'use client'
import Image from 'next/image'
import countries from "@/json/countries.json";
import { useState } from 'react';
const Countries = () => {
    const [value, setValue] = useState('')
    return (
        <>
            <div className="flex flex-col gap-5">
                <h1 className="text-6xl font-bold">Where in the world?</h1>
                <div className="flex gap-2">
                    <input type="search" placeholder="Search" className="w-full rounded-md p-2 text-black font-bold border-gray-300 focus:border-blue-500 focus:outline-none" value={value} onChange={(e) => {
                        setValue(e.target.value)
                    }} />
                    <button className="bg-gray-700 p-2 rounded-md" onClick={() => {
                        setValue('')
                    }}>
                        Clear
                    </button>
                </div>
            </div>
            {
                value != '' ? countries.filter((country) => country.name.toLowerCase().includes(value.toLowerCase())).map((country) => (
                    <div key={country.capital} className="flex px-10 py-2 cursor-pointer items-center bg-gray-700 rounded-lg justify-center text-white hover:bg-gray-300 hover:text-black transition-all">
                        <h2 className=" text-2xl font-bold m-auto">{country.name}</h2>
                    </div>
                )) : countries.map((country) => (
                    <div key={country.capital} className="flex px-10 py-2 cursor-pointer items-center bg-gray-700 rounded-lg justify-center text-white hover:bg-gray-300 hover:text-black transition-all">
                        <h2 className=" text-2xl font-bold m-auto">{country.name}</h2>
                    </div>
                ))
            }
        </>
    )
}

export default Countries