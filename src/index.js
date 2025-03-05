import "./style.css";
import { setupEventListeners, renderProjects, setActiveProject } from "./domHandler";
import { projectManager } from "./projectManager";

document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    setActiveProject(0);
    setupEventListeners();
});