const projectManager = (function () {
    let projects = [];

    function createProject(title) {
        return { title, todos: [] };
    }

    function addProject(title) {
        const newProject = createProject(title);
        projects.push(newProject);
        return newProject
    }

    function getProjects() {
        return projects;
    }

    function removeProject(title) {
        projects = projects.filter(project => project.title !== title);
    }

    return { addProject, getProjects, removeProject };

})();

