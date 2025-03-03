const domHandler = (function () {
    const projectList = document.getElementById("project-list");
    const addProjectBtn = document.getElementById("add-project");

    let activeProjectIndex = 0;

    function setActiveProject(index) {
        const projectItems = document.querySelectorAll("#project-list li");
        if (projectItems.length === 0 || index >= projectItems.length) return; // Prevents errors
    
        activeProjectIndex = index;
    
        projectItems.forEach(item => item.classList.remove("selected-project"));
        projectItems[index].classList.add("selected-project");
    
        document.getElementById("project-title").textContent = projectManager.getProjects()[index].title;
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

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = (event) => {
                event.stopPropagation();
                projectManager.removeProject(project.title);
                renderProjects();
            };

            projectItem.appendChild(deleteBtn);
            projectList.appendChild(projectItem);
        });
    }

    function setupEventListeners() {
        addProjectBtn.addEventListener("click", () => {
            const projectName = prompt("Enter project name:");
            if (!projectName) return;

            projectManager.addProject(projectName);
            renderProjects();
    });
}

return { setupEventListeners, renderProjects, setActiveProject };
})();