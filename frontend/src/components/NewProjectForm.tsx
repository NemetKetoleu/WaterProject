import { useState } from 'react'; 
// This is like saying, "Hey, I want to use some tools from a special box called React, and the tool I need is called 'useState'."
import { Project } from '../types/Project'; 
// We're saying, "I want to use a special thing called 'Project' from a file that's one folder back."
import { addProject } from '../api/ProjectsAPI'; 
// This is like saying, "I want to use a tool called 'addProject' from another file that helps add new projects."

// Here, we're making a rule for our form: it needs two things. One thing happens if it works (onSuccess) 
// and one thing happens if you want to cancel (onCancel).
interface NewProjectFormProps { 
  onSuccess: () => void; 
  onCancel: () => void; 
}

const NewProjectForm = ({ onSuccess, onCancel }: NewProjectFormProps) => { 
  // We are making a new "form" for adding a project. We're saying that this form needs to know what to do
  // when it's successful and when it's canceled.

  // We make a place (called formData) to hold all the information for the project, 
  // like the name, type, and status. We start with empty info.
  // This is where we define the initial state of our form data.
  const [formData, setFormData] = useState<Project>({ 
    projectId: 0, 
    projectName: '', 
    projectType: '', 
    projectRegionalProgram: '', 
    projectImpact: 0, 
    projectPhase: '', 
    projectFunctionalityStatus: '', 
  });

  // This is a tool that listens when you change anything in the form (like typing something).
  // It updates the formData with whatever you type in the input boxes.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
    // This says, "Okay, change that part of the project form with the new thing you typed in."
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    // This tool listens when you try to send the form.
    e.preventDefault(); 
    // We tell the form, "Don't do anything automatically, like refreshing the page."
    await addProject(formData); 
    // Then, we use the 'addProject' tool to save the project information.
    onSuccess(); 
    // If everything worked, we tell it to do the "success" action we got earlier.
  };

  return ( 
    // This is the "return" part, where we tell the program what to show on the screen.
    <form onSubmit={handleSubmit}> 
      {/* We're saying, "When the form gets submitted, use the handleSubmit tool." */}
      <h2>Add New Project</h2> 
      {/* This makes a title that says "Add New Project." */}

      <label> 
        Project Name: 
        <input 
          type="text" 
          name="projectName" 
          value={formData.projectName} 
          onChange={handleChange} 
        /> 
      </label>
      {/* This shows a box where you can type the name of the project. When you type, it calls handleChange to update the name. */}

      <label> 
        Project Type: 
        <input 
          type="text" 
          name="projectType" 
          value={formData.projectType} 
          onChange={handleChange} 
        /> 
      </label>
      {/* Another box for typing the type of project. */}

      <label> 
        Regional Program: 
        <input 
          type="text" 
          name="projectRegionalProgram" 
          value={formData.projectRegionalProgram} 
          onChange={handleChange} 
        /> 
      </label>
      {/* A box for typing where the project is happening (region). */}

      <label> 
        Impact: 
        <input 
          type="number" 
          name="projectImpact" 
          value={formData.projectImpact} 
          onChange={handleChange} 
        /> 
      </label>
      {/* A box to type how much the project impacts (like a number). */}

      <label> 
        Project Phase: 
        <input 
          type="text" 
          name="projectPhase" 
          value={formData.projectPhase} 
          onChange={handleChange} 
        /> 
      </label>
      {/* A box for typing what stage the project is at (like "start", "middle", "done"). */}

      <label> 
        Project Functionality Status: 
        <input 
          type="text" 
          name="projectFunctionalityStatus" 
          value={formData.projectFunctionalityStatus} 
          onChange={handleChange} 
        /> 
      </label>
      {/* A box for typing whether the project is working well or not. */}

      <button type="submit">Add Project</button> 
      {/* A button that will submit (send) the form to add the project. */}

      <button type="button" onClick={onCancel}> 
        Cancel 
      </button> 
      {/* A button that will cancel adding the project and call the "onCancel" function. */}
    </form> 
  );
};

export default NewProjectForm; 
// This says, "Make this form available to be used by other parts of the project."