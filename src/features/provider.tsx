'use client'
import { store } from '@/context/store'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider