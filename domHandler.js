const domHandler = (function () {
    const projectList = document.getElementById("project-list");
    const addProjectBtn = document.getElementById("add-project");

    function renderProjects() {
        projectList.innerHTML = "";

        projectManager.getProjects().forEach(project => {
            const projectItem = document.createElement("li");
            projectItem.textContent = project.title;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => {
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

return { setupEventListeners, renderProjects };
})();