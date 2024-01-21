import React, { useContext } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { DarkModeContext } from '../context/DarkModeContext'

const DarkMode = () => {
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)

	return (
		<div>
			<DarkModeIcon
				className={`darkModeIcon ${isDarkMode ? 'cursor-pointer' : 'cursor-pointer opacity-25'}`}
				onClick={() => {
					toggleDarkMode(isDarkMode ? 'light' : 'dark')
					console.log('Dark Mode clicked')
				}}
			/>

			<LightModeIcon
				className={`lightModeIcon ${!isDarkMode ? 'cursor-pointer' : 'cursor-pointer opacity-25'}`}
				onClick={() => {
					toggleDarkMode(isDarkMode ? 'light' : 'dark')
					console.log('Light Mode clicked')
				}}
			/>
		</div>
	)
}

export default DarkMode
