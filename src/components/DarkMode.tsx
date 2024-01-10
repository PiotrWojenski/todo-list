import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import useDarkMode from '../hooks/useDarkMode'

const DarkMode = () => {
	const { isDarkMode, toggleDarkMode } = useDarkMode()

	console.log(isDarkMode)
	return (
		<div>
			<DarkModeIcon
				className={isDarkMode ? 'cursor-pointer' : 'cursor-pointer opacity-25'}
				onClick={() => toggleDarkMode('dark')}
			/>

			<LightModeIcon
				className={!isDarkMode ? 'cursor-pointer' : 'cursor-pointer opacity-25'}
				onClick={() => toggleDarkMode('light')}
			/>
		</div>
	)
}

export default DarkMode
