import { useState } from 'react'

const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState<any>(null)

	const toggleDarkMode = (typeMode: string): void => {
		setIsDarkMode((prevState: any) => !prevState)
		if (typeMode === 'dark') {
			setIsDarkMode(true)
		} else {
			setIsDarkMode(false)
		}
	}
	return { isDarkMode, toggleDarkMode }
}

export default useDarkMode
