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

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function renderTodos(project) {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";

        project.todos.forEach(todo => {
            const todoItem = document.createElement("li");
            const capitalisedPriority = capitaliseFirstLetter(todo.priority);
            todoItem.classList.add(`priority-${todo.priority.toLowerCase()}`);
            todoItem.classList.add("todo-item");

            let dueText = todo.dueDate ? `Due: ${todo.dueDate}` : "";
            let timeText = todo.time ? `at ${todo.time}` : "";

            todoItem.innerHTML = `
            <span><strong>${todo.title}</strong>: ${todo.description}</span>
            <span>${capitalisedPriority} Priority | <span>
            <span>${dueText} ${timeText}</span>
            <button class="delete-todo">X</button>
        `;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => {
                todo.toggleComplete();
                renderTodos(project);
            });

            const todoText = document.createElement("span");
            todoText.innerHTML = `<strong>${todo.title}</strong: ${todo.description} (Due: ${todo.dueDate} at ${todo.time})`;

            if (todo.completed) {
                todoText.style.opacity = "0.4";
                todoItem.style.opacity = "0.4";
                todoText.classList.add("completed");
            } else {
                todoText.style.opacity = "1";
                todoItem.style.opacity = "1";
            }
            
            todoItem.querySelector(".delete-todo").addEventListener("click", () => {
                project.todos = project.todos.filter(t => t !== todo);
                renderTodos(project);
            });

            todoList.appendChild(checkbox);
            todoList.appendChild(todoText);
            todoList.appendChild(todoItem);

        });
    }

    function setupEventListeners() {
        const todoFormContainer = document.getElementById("todo-form-container");
        const todoForm = document.getElementById("todo-form");
        const todoTitle = document.getElementById("todo-title");
        const todoDescription = document.getElementById("todo-description");
        const todoDueDate = document.getElementById("todo-due-date");
        const todoPriority = document.getElementById("todo-priority");
        const todoTime = document.getElementById("todo-time");

        const projectForm = document.getElementById("project-form");
        const projectInput = document.getElementById("project-name");
        const addProjectBtn = document.getElementById("add-project");
    
        addProjectBtn.addEventListener("click", () => {
            projectForm.style.display = "block";
            projectInput.focus();
        });

        projectForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const projectName = projectInput.value.trim();
            if (!projectName) return;

            projectManager.addProject(projectName);
            renderProjects();

            projectInput.value = "";
            projectForm.style.display = "none";
        });
    
        document.getElementById("add-todo").addEventListener("click", () => {
            todoFormContainer.style.display = "block";
        });
    
        todoForm.addEventListener("submit", function(event) {
            event.preventDefault();
    
            const title = todoTitle.value.trim();
            const description = todoDescription.value.trim();
            const dueDate = todoDueDate.value.trim();
            const time = todoTime.value.trim();
            const priority = todoPriority.value.trim();
            
            if (!title) {
                alert("A title is required.");
                return;
            }
    
            const activeProject = projectManager.getProjects()[activeProjectIndex];
    
            if (activeProject) {
                projectManager.addTodoToProject(activeProject.title, title, description, dueDate, time, priority);
                renderTodos(activeProject);
            }
    
            todoTitle.value = "";
            todoDescription.value = "";
            todoDueDate.value = "";
            todoTime.value = "";
            todoPriority.value = "medium";
    
            todoFormContainer.style.display = "none";
        });
    }
    
    return { setupEventListeners, renderProjects, setActiveProject };
})();