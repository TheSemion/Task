function App() {
    const [tasks, setTasks] = React.useState([]); // Список завдань
    const [newTask, setNewTask] = React.useState(""); // Нове завдання для додавання

    // Завантажуємо завдання з LocalStorage, якщо вони є
    React.useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    // Зберігаємо завдання в LocalStorage щоразу, коли список завдань змінюється
    React.useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Додає нове завдання до списку
    const addTask = () => {
        if (newTask.trim() === "") return; // Перевірка на порожнє завдання
        setTasks([...tasks, newTask]); // Додає нове завдання до списку
        setNewTask(""); // Очищує поле введення
    };

    // Видаляє завдання зі списку
    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index)); // Видаляє завдання за індексом
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                className="input"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)} // Змінює значення введеного завдання
                placeholder="Нове завдання"
            />
            <button onClick={addTask}>Додати завдання</button>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className="task">
                        <span className="tasky">{task}</span>
                        <button onClick={() => deleteTask(index)}>Видалити</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Рендерить наш компонент App у div з id "root"
ReactDOM.render(<App />, document.getElementById("root"));
