import "./style.css";
import {
  setupEventListeners,
  renderProjects,
  setActiveProject,
} from "./domHandler";

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setActiveProject(0);
  setupEventListeners();
});
