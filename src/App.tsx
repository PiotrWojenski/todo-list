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
			<ul>
				{/* Wyświetlanie listy zadań */}
				{tasksList.map((task: any) => (
					<li key={task.id}>{task.value}</li>
				))}
			</ul>
		</div>
	)
}

export default App
