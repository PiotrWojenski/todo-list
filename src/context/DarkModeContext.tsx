import { createContext, useState } from 'react'

type defaultStateProp = {
	isDarkMode: boolean
	toggleDarkMode(typeDarkMode: string): void
}

type darkModeProvider = {
	children: React.ReactNode
}

const deafultState: defaultStateProp = {
	isDarkMode: false,
	toggleDarkMode: (typeDarkMode: string) => {},
}

export const DarkModeContext = createContext(deafultState)

export const DarkModeProvider = ({ children }: darkModeProvider) => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	const toggleDarkMode = (typeDarkMode: string) => {
		if (typeDarkMode === 'dark') {
			setIsDarkMode(true)
		} else {
			setIsDarkMode(false)
		}
	}

	return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}
