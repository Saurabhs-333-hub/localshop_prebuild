import React from 'react'

const Header = () => {
    return (
        <>
            <div className="flex justify-between items-center p-4 bg-slate-700 text-white">
                <h1 className="text-3xl">Localshop</h1>
                <div className="flex justify-between items-center gap-10">
                    <button className="p-2 bg-slate-700 rounded-lg m-auto text-white hover:text-cyan-300 transition-all">Get Started</button>
                    <button className="p-2 bg-slate-700 rounded-lg m-auto text-white hover:text-cyan-300 transition-all">Signup</button>
                </div>
            </div>
        </>
    )
}

export default Header