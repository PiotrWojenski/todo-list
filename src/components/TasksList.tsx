import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import useDarkMode from '../hooks/useDarkMode'
import axios from 'axios'

const TasksList = (props: any) => {
	const { isDarkMode } = useDarkMode()
	const [todos, setTodos] = useState<any>([])

	const getTodos = async () => {
		try {
			const response = await axios.get('YOUR_FIREBASE_DATABASE_URL/todos.json')
			if (response.data) {
				const data = Object.values(response.data)
				setTodos(data)
			} else {
				setTodos([])
			}
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	useEffect(() => {
		// Update the component state when props.tasksList changes
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

// .get('https://todolist2-dfa46-default-rtdb.firebaseio.com/todos.json')
