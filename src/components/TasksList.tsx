import React from 'react'
import TaskItem from './TaskItem'
import useDarkMode from '../hooks/useDarkMode'

const TasksList = (props: any) => {
	const { isDarkMode } = useDarkMode()
	return (
		<div className={isDarkMode ? 'darkMode' : 'lightMode'}>
			<div className="w-1/2 mx-auto ">
				<ul className="break-words ">
					{props.tasksList.map((item: any) => {
						return (
							<TaskItem
								changeEditMode={props.changeEditMode}
								key={item.id}
								taskInfo={item}
								removeTask={props.removeTask}
								completeTask={props.completeTask}
							/>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default TasksList
