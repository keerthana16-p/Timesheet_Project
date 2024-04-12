import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ProjectHistory.css';

const ProjectCard = ({ project }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Project Details</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <strong>Project Id: </strong> {project.id}
                    </li>
                    <li className="list-group-item">
                        <strong>Name: </strong> {project.name}
                    </li>
                    <li className="list-group-item">
                        <strong>Domain: </strong> {project.domain}
                    </li>
                    <li className="list-group-item">
                        <strong>Start Date: </strong> {project.startDate}
                    </li>
                    <li className="list-group-item">
                        <strong>End Date: </strong> {project.endDate}
                    </li>
                    <li className="list-group-item">
                        <strong>Priority: </strong> {project.priority}
                    </li>
                </ul>
            </div>
        </div>
    );
};

const ProjectHistory = ({ email }) => {
    const [projectNames, setProjectNames] = useState([]);
    const [projects, setProjects] = useState([]);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchProjectNames = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/resources/getResources/${sessionStorage.responseEmail}`);
                const projects = response.data; 
                console.log('projects', projects);

                const projectNames = projects.map(project => project.projectName);
                console.log('projectNames', projectNames);
                setProjectNames(projectNames);

            } catch (error) {
                console.error('Error fetching project names:', error);
            }
        };
        fetchProjectNames();
    }, []);

    useEffect(() => {
        const fetchProjectsDetails = async () => {
            try {
                const projectsDetailsPromises = projectNames.map(async projectName => {
                    const response = await axios.get(`http://localhost:5000/api/projects/getdetails/${projectName}`);
                    return response.data;
                });
                const projectsDetails = await Promise.all(projectsDetailsPromises);
                console.log("Project details", projectsDetails);
                setProjects(projectsDetails);
                console.log("Projects", projects);
            } catch (error) {
                console.error('Error fetching projects details:', error);
            }
        };

        if (projectNames.length > 0) {
            fetchProjectsDetails();
        }
    }, [projectNames, username, role]);

    return (
        <div className="project-list">
            {projects.flatMap((projectArray, index) => (
                projectArray.map((project, subIndex) => (
                    <ProjectCard key={index * 1000 + subIndex} project={project} />
                ))
            ))}
        </div>
    );
};

export default ProjectHistory;
