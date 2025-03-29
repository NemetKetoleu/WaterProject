import { Project } from '../types/Project'; 
// We import the 'Project' type, which defines how a project should look (like its name, type, etc.)

// This tells the program what the answer from the website (API) will look like
interface FetchProjectsResponse {  
    projects: Project[];      // A list of projects we get back from the website (an array of Project objects)
    totalNumProjects: number; // The total number of projects (so we know how many projects there are in total)
}

// This is the main web address for the water project
const API_URL = 'https://waterproject-hilton-backend.azurewebsites.net/Water'; 
// We store the main website address in a variable, so it's easy to use when we need it in different parts of the code

// This function gets a list of projects from the website, with some choices like how many to show
export const fetchProjects = async ( 
    pageSize: number,               // How many projects we want to see on each page
    pageNum: number,                // Which page we want to see (if there are multiple pages)
    selectedCategories: string[]    // Which categories we want to filter by (like "water", "environment", etc.)
): Promise<FetchProjectsResponse> => {  
  try {
    // This turns the categories we choose into a part of the website address
    const categoryParams = selectedCategories 
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`) // Turns each category into a piece of the URL
      .join('&'); // Joins them all together to form a proper query string for the URL

    // This asks the website for the projects and gets the response
    const response = await fetch( 
      `${API_URL}/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    ); 
    // If the website didn’t respond correctly, show an error
    if (!response.ok) {
      throw new Error('Failed to fetch projects'); 
    }

    // Turn the response into a format we can use and return it
    return await response.json(); 
  } catch (error) {
    console.error('Error fetching projects:', error);  
    // If something went wrong, tell us what happened
    throw error;  // Let the program know there was an error
  }
};

// This function adds a new project to the website
export const addProject = async (newProject: Project): Promise<Project> => {  
  try {
    // This sends a request to the website to add the new project
    const response = await fetch(`${API_URL}/AddProject`, {
      method: 'POST', // We are sending new data (so we use POST method)
      headers: {
        'Content-Type': 'application/json', // We’re sending the data in a special format (JSON)
      },
      body: JSON.stringify(newProject), // Turn the new project into JSON so the website understands it
    });

    // If the website didn’t respond correctly, show an error
    if (!response.ok) {
      throw new Error('Failed to add project');
    }
    // Return the new project that was added
    return await response.json(); // This will be the project that was added, including any changes made by the server (like an ID)
  } catch (error) {
    console.error('Error adding project', error);
    // If something went wrong, tell us what happened
    throw error; // Let the program know there was an error
  }
};

// This function updates an existing project on the website
export const updateProject = async (
    projectId: number,        // The ID of the project we want to change (we need this to find the right project)
    updatedProject: Project   // The new details for the project (what has changed)
): Promise<Project> => {  
  try {
    // This sends a request to update the project
    const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
      method: 'PUT',    // We are updating existing data, so we use PUT method
      headers: {
        'Content-Type': 'application/json', // This tells the server that we are sending JSON data in the request body
      },
      body: JSON.stringify(updatedProject), // Convert the updated project into JSON so the website understands it
    });

    // Return the updated project
    return await response.json(); // This is the updated project after changes
  } catch (error) {
    console.error('Error updating project:', error); 
    // If something went wrong, tell us what happened
    throw error; // Let the program know there was an error
  }
};

// This function deletes a project from the website
// It takes the projectId of the project to delete
export const deleteProject = async (projectId: number): Promise<void> => {  
  try {
    // This sends a request to delete the project
    const response = await fetch(`${API_URL}/DeleteProject/${projectId}`, {
      method: 'DELETE', // We are deleting data, so we use DELETE method
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  } catch (error) {
    console.error('Error deleting project:', error); 
    // If something went wrong, tell us what happened
    throw error; // Let the program know there was an error
  }
};
