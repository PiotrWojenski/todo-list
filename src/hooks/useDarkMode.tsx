import { useState } from 'react'

const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)

	const toggleDarkMode = (typeMode: string): void => {
		setIsDarkMode(typeMode === 'dark')
	}
	return { isDarkMode, toggleDarkMode }
}

export default useDarkMode
