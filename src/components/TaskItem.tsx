const TaskItem = (props: any) => {
	return (
		<li className="border border-solid border-black rounded-md p-1 overflow-hidden">
			<h2 className={props.taskInfo.isCompleted ? 'line-through' : ''}>{props.taskInfo.value}</h2>
			<button onClick={() => props.removeTask(props.taskInfo.id)}>Remove</button>
			<input onClick={() => props.completeTask(props.taskInfo.id)} type="checkbox" />
		</li>
	)
}

export default TaskItem
