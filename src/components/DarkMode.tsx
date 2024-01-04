import React from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const DarkMode = (props: any) => {
	return (
		<div>
			<DarkModeIcon onClick={props.toggleDarkMode} />
			<LightModeIcon onClick={props.toggleDarkMode} />
		</div>
	)
}

export default DarkMode
