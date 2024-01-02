// app.tsx
import './App.css'
import AddTask from './components/addTasks/AddTask'
import { useState } from 'react'

interface Task {
	id: string
	value: string
	isCompleted?: boolean
}

function App() {
	const [tasksList, setTasksList] = useState<Task[]>([])

	const addTask = (task: Task) => {
		setTasksList([...tasksList, task])
	}

	const removeTask = (taskId: string) => {
		const updatedTasks = tasksList.filter(task => task.id !== taskId)
		setTasksList(updatedTasks)
	}

	const completeTask = (taskId: string) => {
		const updatedTasks = tasksList.map(task => (task.id === taskId ? { ...task, isCompleted: true } : task))
		setTasksList(updatedTasks)
	}

	return (
		<div className="App">
			<AddTask addNewTask={addTask} />
			<ul className="flex flex-col items-center mt-3">
				{/* Wyświetlanie listy zadań */}
				{tasksList.map((task: any) => (
					<div className="flex items-center justify-between w-1/2" key={task.id}>
						<li
							className={`inline-block p-1 mt-2 border-solid border-2 border-blue-900 text-left overflow-auto ${
								task.isCompleted ? 'bg-green-500' : ''
							}`}>
							{task.value}
						</li>
						<div className="flex space-x-2 ml-2">
							<button
								className="border border-solid border-1 border-blue-400 rounded-xl"
								onClick={() => removeTask(task.id)}>
								Remove
							</button>
							<button
								className="border border-solid border-1 border-blue-400 rounded-xl"
								onClick={() => completeTask(task.id)}>
								Completed
							</button>
						</div>
					</div>
				))}
			</ul>
		</div>
	)
}

export default App
