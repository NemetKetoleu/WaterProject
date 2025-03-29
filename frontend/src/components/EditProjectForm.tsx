import { useState } from 'react'; 
// We are bringing in a tool called 'useState' from React. This tool helps us keep track of changes in the form.
import { Project } from '../types/Project'; 
// We are using a blueprint called 'Project' to make sure the data we handle matches the structure of a project.
import { updateProject } from '../api/ProjectsAPI'; 
// We are bringing in a helper function called 'updateProject' that will send the updated project information to the server.

interface EditProjectFormProps { 
  project: Project; 
  onSuccess: () => void; 
  onCancel: () => void; 
}
// This is like a rulebook for the form. It says the form needs:
// - 'project': The project we want to edit.
// - 'onSuccess': What to do when the project is successfully updated.
// - 'onCancel': What to do if the user decides to cancel editing.

const EditProjectForm = ({ 
  project, 
  onSuccess, 
  onCancel, 
}: EditProjectFormProps) => { 
  // This is the main form for editing a project. It takes the project to edit and what to do when the user is done or cancels.

  const [formData, setFormData] = useState<Project>({ ...project }); 
  // We are creating a box (called 'formData') to hold the project's details. 
  // It starts with the current project information.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    // This function runs whenever the user types something in an input box.
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
    // It updates the 'formData' box with the new value the user typed in.
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    // This function runs when the user clicks the "Update Project" button.
    e.preventDefault(); 
    // We stop the form from doing its default action (like refreshing the page).
    await updateProject(formData.projectId, formData); 
    // We send the updated project information to the server using the 'updateProject' helper.
    onSuccess(); 
    // If everything works, we call the 'onSuccess' function to let the app know the update was successful.
  };

  return ( 
    <form onSubmit={handleSubmit}> 
      {/* This is the form that shows on the screen. When the user submits it, 'handleSubmit' will run. */}
      <h2>Add New Project</h2> 
      {/* This is the title of the form. It tells the user they are editing a project. */}

      <label> 
        Project Name: 
        <input 
          type="text" 
          name="projectName" 
          value={formData.projectName} 
          onChange={handleChange} 
        /> 
      </label>
      {/* This is a box where the user can type the name of the project. 
          When they type, it updates the 'projectName' in 'formData'. */}

      <label> 
        Project Type: 
        <input 
          type="text" 
          name="projectType" 
          value={formData.projectType} 
          onChange={handleChange} 
        /> 
      </label>
      {/* This is a box where the user can type the type of the project. 
          When they type, it updates the 'projectType' in 'formData'. */}

      <label> 
        Regional Program: 
        <input 
          type="text" 
          name="projectRegionalProgram" 
          value={formData.projectRegionalProgram} 
          onChange={handleChange} 
        /> 
      </label>
      {/* This is a box where the user can type the regional program for the project. 
          When they type, it updates the 'projectRegionalProgram' in 'formData'. */}

      <label> 
        Impact: 
        <input 
          type="number" 
          name="projectImpact" 
          value={formData.projectImpact} 
          onChange={handleChange} 
        /> 
      </label>
      {/* This is a box where the user can type the project's impact as a number. 
          When they type, it updates the 'projectImpact' in 'formData'. */}

      <label> 
        Project Phase: 
        <input 
          type="text" 
          name="projectPhase" 
          value={formData.projectPhase} 
          onChange={handleChange} 
        /> 
      </label>
      {/* This is a box where the user can type the phase of the project (e.g., "Planning", "In Progress"). 
          When they type, it updates the 'projectPhase' in 'formData'. */}

      <label> 
        Project Functionality Status: 
        <input 
          type="text" 
          name="projectFunctionalityStatus" 
          value={formData.projectFunctionalityStatus} 
          onChange={handleChange} 
        /> 
      </label>
      {/* This is a box where the user can type whether the project is working or not. 
          When they type, it updates the 'projectFunctionalityStatus' in 'formData'. */}

      <button type="submit">Update Project</button> 
      {/* This is a button that the user clicks to save the changes to the project. */}

      <button type="button" onClick={onCancel}> 
        Cancel 
      </button> 
      {/* This is a button that the user clicks to cancel editing the project. 
          It calls the 'onCancel' function to stop editing. */}
    </form> 
  );
};

export default EditProjectForm; 
// This makes the 'EditProjectForm' available to be used in other parts of the app.