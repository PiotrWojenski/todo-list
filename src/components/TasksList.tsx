import React, { useEffect, useState, useContext } from 'react'
import TaskItem from './TaskItem'
import axios from 'axios'
import { DarkModeContext } from '../context/DarkModeContext'

const TasksList = (props: any) => {
	const { isDarkMode } = useContext(DarkModeContext)
	const [todos, setTodos] = useState<any>([])

	const getTodos = async () => {
		const response = await axios.get('https://todolist2-dfa46-default-rtdb.firebaseio.com/.json')
		if (response.data) {
			const data = Object.values(response.data)
			setTodos(data)
		} else {
			setTodos([])
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	useEffect(() => {
		setTodos(props.tasksList)
	}, [props.tasksList])

	return (
		<div className={isDarkMode ? 'darkMode' : 'lightMode'}>
			<div className="w-1/2 mx-auto ">
				<ul className="break-words ">
					{todos.map((item: any) => (
						<TaskItem
							changeEditMode={props.changeEditMode}
							key={item.id}
							taskInfo={item}
							removeTask={props.removeTask}
							completeTask={props.completeTask}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}

export default TasksList
