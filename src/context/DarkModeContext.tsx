import { set } from 'firebase/database'
import { createContext, useState, ReactNode } from 'react'

type DefaultStateProps = {
	isDarkMode: boolean
	toggleDarkMode(typeDarkMode: string): void
}

type DarkModeProviderProps = {
	children: ReactNode
}

const defaultState: DefaultStateProps = {
	isDarkMode: false,
	toggleDarkMode: (typeDarkMode: string) => {},
}

export const DarkModeContext = createContext(defaultState)

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	const toggleDarkMode = (typeDarkMode: string) => {
		if (typeDarkMode === 'dark') {
			setIsDarkMode(true)
		} else {
			setIsDarkMode(false)
		}
		setIsDarkMode(typeDarkMode === 'dark')
	}

	return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}
