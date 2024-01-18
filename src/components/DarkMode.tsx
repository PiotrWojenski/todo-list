import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useContext } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
// import useDarkMode from '../hooks/useDarkMode'

const DarkMode = () => {
	// const { isDarkMode, toggleDarkMode } = useDarkMode()
	const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext)

	console.log('isDarkMode', isDarkMode)
	return (
		<div>
			<DarkModeIcon
				className={isDarkMode ? 'cursor-pointer' : 'cursor-pointer opacity-25'}
				onClick={() => {
					toggleDarkMode('dark')
					console.log('Dark Mode clicked')
				}}
			/>

			<LightModeIcon
				className={!isDarkMode ? 'cursor-pointer' : 'cursor-pointer opacity-25'}
				onClick={() => {
					toggleDarkMode('light')
					console.log('Light Mode clicked')
				}}
			/>
		</div>
	)
}

export default DarkMode
