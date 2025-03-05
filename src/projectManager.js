const projectManager = (function () {
    let projects = [{ title: "Default Project", todos: [] }];

    function addTodoToProject(projectTitle, title, description, dueDate, time, priority) {
        const project = projects.find(proj => proj.title === projectTitle);
        if(project) {
            project.todos.push({ title, description, dueDate, time, priority, completed: false });
            saveProjects();
        }
    }

    function loadProjects() {
        const storedProjects = localStorage.getItem("projects");
        if (storedProjects) {
            projects = JSON.parse(storedProjects);
        } else {
            projects = [{title: "Default Project", todos: []}];
        }
    }

    function saveProjects() {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function addProject(title) {
        projects.push({ title, todos: [] });
        saveProjects();
    }

    function getProjects() {
        return projects;
    }

    function removeProject(title) {
        projects = projects.filter(project => project.title !== title);
        saveProjects();
    }

    function removeTodoFromProject(projectTitle, todoTitle) {
        const project = projects.find(proj => proj.title === projectTitle);
        if (project) {
            project.todos = project.todos.filter(todo => todo.title !== todoTitle);
            saveProjects();
        }
    }

    loadProjects();

    return { addProject, getProjects, removeProject, addTodoToProject, removeTodoFromProject, saveProjects };

})();

export { projectManager };