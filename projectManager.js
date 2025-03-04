const projectManager = (function () {
    let projects = [{ title: "Default Project", todos: [] }];

    function createTodo(title, description, dueDate, priority) {
        return {
            title,
            description,
            dueDate,
            priority,
            completed: false,
            toggleComplete() {
                this.completed = !this.completed;
            }
        };
    }

    function addTodoToProject(projecTitle, todo) {
        const project = projects.find(proj => proj.title === projecTitle);
        if(project) {
            project.todos.push(todo);
        };
    }

    function createProject(title) {
        return { title, todos: [] };
    }

    function addProject(title) {
        const newProject = createProject(title);
        projects.push(newProject);
        return newProject;
    }

    function getProjects() {
        return projects;
    }

    function removeProject(title) {
        if (title === "Default Project") return;
        projects = projects.filter(project => project.title !== title);
    }

    return { addProject, getProjects, removeProject, addTodoToProject };

})();

