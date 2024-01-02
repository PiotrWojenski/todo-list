import './App.css'
import AddTask from './components/addTasks/AddTask'
import { useState } from 'react'

function App() {
	const [tasksList, setTasksList] = useState<any>([])

	const taskHandler = (task: any) => {
		setTasksList([...tasksList, task])
	}

	return (
		<div className="App">
			<AddTask addNewTask={taskHandler} />
			<ul className="flex flex-col items-center mt-3">
				{/* Wyświetlanie listy zadań */}
				{tasksList.map((task: any) => (
					<li className="p-1 mt-2 border-solid border-2 border-blue-900 w-1/4 text-center" key={task.id}>
						{task.value}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
