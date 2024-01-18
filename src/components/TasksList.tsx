import { useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import useDarkMode from '../hooks/useDarkMode'
import axios from 'axios'

const TasksList = (props: any) => {
	const { isDarkMode } = useDarkMode()
	const [todos, setTodos] = useState<any>([])

	const getTodos = async () => {
		const res = await axios
			.get('https://todolist-b1fe7-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
			.then(res => setTodos([res.data]))
	}

	useEffect(() => {
		getTodos()
	}, [])

	console.log(todos)

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
