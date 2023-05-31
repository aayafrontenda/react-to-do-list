export default function separateCompleted(todos) {
    const modifiedCopy = [];
        todos.forEach((prevTodo) => {
            if (!prevTodo.completed) {
                modifiedCopy.push(prevTodo);
            }
        });
        todos.forEach((prevTodo) => {
            if (prevTodo.completed) {
                modifiedCopy.push(prevTodo)
            }
        });
        return modifiedCopy;
}