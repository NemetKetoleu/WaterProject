import { useEffect, useState } from 'react';
import { Project } from './types';


function ProjectList() {
    const [projetcs, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('https://localhost:5000/Water/AllProjects');
            const data = await response.json();
            setProjects(data);
        }

        fetchProjects();
    }, []);


  return (
    <>
        <h1>Water Project</h1>
        <p>This is the project list page.</p>
        <br/>
        {projetcs.map((p) => 

            <div id="projectcard">
                <h3>{p.projectName}</h3>

                <ul>
                    <li>Project Type: {p.projectType}</li>
                    <li>Regional Program: {p.projectRegionalProgram}</li>
                    <li>Impact: {p.projectImpact} Individual Service</li>
                    <li>Phase: {p.projectPhase}</li>
                    <li>Project Status: {p.projectFunctionalityStatus}</li>
                </ul>
            </div>

        )}
    </>
  )
}

export default ProjectList;