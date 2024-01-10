import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const DarkMode = (props: any) => {
	return (
		<div>
			<DarkModeIcon className="cursor-pointer" onClick={props.toggleDarkMode} />
			<LightModeIcon className="cursor-pointer" onClick={props.toggleDarkMode} />
		</div>
	)
}

export default DarkMode
