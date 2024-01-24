import React, { useContext } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { DarkModeContext } from '../context/DarkModeContext'

const DarkMode = () => {
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)

	return (
		<div className="flex items-center space-x-2 p-4 md:p-8 lg:p-12">
			<DarkModeIcon
				className={`darkModeIcon ${isDarkMode ? 'cursor-pointer' : 'opacity-25'}`}
				onClick={() => {
					toggleDarkMode(isDarkMode ? 'light' : 'dark')
				}}
			/>

			<LightModeIcon
				className={`lightModeIcon ${!isDarkMode ? 'cursor-pointer' : 'opacity-25'}`}
				onClick={() => {
					toggleDarkMode(isDarkMode ? 'light' : 'dark')
				}}
			/>
		</div>
	)
}

export default DarkMode
