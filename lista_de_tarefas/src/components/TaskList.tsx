import React from 'react';
import TaskItem from './TaskItem';

interface Task {
    id: string;
    text: string;
    description: string;
    completed: boolean;
    dueDate: string;
}

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (index: number) => void;
    onChangeStatus: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onChangeStatus }) => {
    return (
        <div id="task-list">
            {tasks.map((task, index) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={() => onEdit(task)}
                    onDelete={() => onDelete(index)}
                    onChangeStatus={() => onChangeStatus(index)}
                />
            ))}
        </div>
    );
};

export default TaskList;