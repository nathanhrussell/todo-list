const domHandler = (function () {
    const projectList = document.getElementById("project-list");
    const addProjectBtn = document.getElementById("add-project");

    let activeProjectIndex = 0;

    function setActiveProject(index) {
        const projectItems = document.querySelectorAll("#project-list li");
        if (projectItems.length === 0 || index >= projectItems.length) return;
    
        activeProjectIndex = index;
        projectItems.forEach(item => item.classList.remove("selected-project"));
        projectItems[index].classList.add("selected-project");
        
        const activeProject = projectManager.getProjects()[index];
        document.getElementById("project-title").textContent = projectManager.getProjects()[index].title;

        renderTodos(activeProject);
    }

    function renderProjects() {
        projectList.innerHTML = "";

        projectManager.getProjects().forEach((project, index) => {
            const projectItem = document.createElement("li");
            projectItem.textContent = project.title;
            projectItem.dataset.index = index;

            projectItem.addEventListener("click", () => {
                setActiveProject(index);
            });

            if (project.title !== "Default Project") {
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "X";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.onclick = (event) => {
                    event.stopPropagation();
                    projectManager.removeProject(project.title);
                    renderProjects();
                };
                projectItem.appendChild(deleteBtn);
            }
            projectList.appendChild(projectItem);
        });
    }

    function renderTodos(project) {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";

        project.todos.forEach(todo => {
            const todoItem = document.createElement("li");
            todoItem.classList.add(`priority-${todo.priority.toLowerCase()}`);
            todoItem.innerHTML = `
            <span>${todo.title} - Due: {todo.dueDate}</span>
            <button class="delete-todo">X</button>
        `;

            todoItem.querySelector(".delete-todo").addEventListener("click", () => {
                project.todos = project.todos.filter(t => t !== todo);
                renderTodos(project);
            });

            todoList.appendChild(todoItem);

        });
    }

    function setupEventListeners() {

        addProjectBtn.addEventListener("click", () => {
            const projectName = prompt("Enter project name:");
            if (!projectName) return;
    
            projectManager.addProject(projectName);
            renderProjects();
        });
    

        const addTodoBtn = document.getElementById("add-todo");
    
        addTodoBtn.addEventListener("click", () => {
            const title = prompt("Enter to-do title:");
            if (!title) return;
    
            const description = prompt("Enter description (optional):");
            const dueDate = prompt("Enter due date (YYYY-MM-DD):");
            const priority = prompt("Enter priority (High, Medium, Low):");
    

            const activeProject = projectManager.getProjects()[activeProjectIndex];
    
            if (activeProject) {
                projectManager.addTodoToProject(activeProject.title, title, description, dueDate, priority);
                renderTodos(activeProject);
            }
        });
    }
    

return { setupEventListeners, renderProjects, setActiveProject };
})();