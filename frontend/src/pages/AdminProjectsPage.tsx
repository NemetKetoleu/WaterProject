// This is the Admin Projects Page, where an admin can view, add, edit, and delete projects
import { useEffect, useState } from 'react';
import { Project } from '../types/Project';  // Import Project type to define the structure of project data
import { deleteProject, fetchProjects } from '../api/ProjectsAPI';  // Import functions for deleting and fetching projects
import Pagination from '../components/Pagination';  // Adding Pagination to our AdminProjectsPage to handle multiple pages of projects
// Pagination is a component that helps navigate through multiple pages of projects
import NewProjectForm from '../components/NewProjectForm';  // Import the form to add a new project
import EditProjectForm from '../components/EditProjectForm';  // Import the form to edit an existing project

const AdminProjectsPage = () => {
  // State variables to hold the data and handle different UI states
  const [projects, setProjects] = useState<Project[]>([]);  // List of projects to show
  const [error, setError] = useState<string | null>(null);  // To store error messages
  const [loading, setLoading] = useState(true);  // To show if the page is still loading
  const [pageSize, setPageSize] = useState<number>(10);  // Number of projects per page
  const [pageNum, setPageNum] = useState<number>(1);  // Current page number
  const [totalPages, setTotalPages] = useState<number>(0);  // Total number of pages
  const [showForm, setShowForm] = useState(false);  // To toggle between showing and hiding the "Add Project" form
  const [editingProject, setEditingProject] = useState<Project | null>(null);  // The project to edit

  // useEffect is a hook that runs when the page loads or when pageSize or pageNum changes
  useEffect(() => {
    const loadProjects = async () => {
      try {
        // pageSize and pageNum could have been static number like 10 and 1, meaning showing 10 projects on the first page in our Admin page
        const data = await fetchProjects(pageSize, pageNum, []);  // Fetch projects for the current page
        setProjects(data.projects);  // Take the projects we just got from the server (stored in data.projects) and put them into the projects state so we can use them in our app.
        // "project state" is like a conatiner storing the list of projects to display and manage in the app. 
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));  // Calculate the total pages
      } catch (err) {
        // If there's an error, set the error state with the error message
        setError((err as Error).message);  // "err" is the error that occurred, and we take its message and store it in the "error" state
                                           // message is just a property of the Error object, and it contains the string that describes the problem.
      } finally {
        // Whether successful or not, stop the loading state
        setLoading(false);
      }
    };

    loadProjects();  // Call the loadProjects function to fetch the data
  }, [pageSize, pageNum]);  // Dependency array, triggers when pageSize or pageNum changes

  // This function handles deleting a project
  const handleDelete = async (projectId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');  // Ask the admin for confirmation
    if (!confirmDelete) return;  // If they cancel, stop the function

    try {
      // Try to delete the project from the server
      await deleteProject(projectId);
      // After successful deletion, remove the project from the state
      setProjects(projects.filter((p) => p.projectId !== projectId));
    } catch (error) {
      // If something goes wrong, show an alert
      alert('Failed to delete project. Please try again.');
    }
  };

  // If we're still loading, show a "Loading..." message
  if (loading) return <p>Loading projects...</p>;
  // If there's an error, show the error message in red
  if (error) return <p className="text-red-500">Opps! There an error: {error}</p>;

  return (
    <div>
      <h1>Admin - Projects</h1>  {/* Title of the page */}

      {/* Button to show the form to add a new project, if not already showing */}
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}  // When clicked, show the "Add Project" form
        >
          Add Project
        </button>
      )}

      {/* If the form is visible, show the form to add a new project */}
      {showForm && (
        <NewProjectForm
          onSuccess={() => {
            setShowForm(false);  // Close the form after successfully adding a project
            fetchProjects(pageSize, pageNum, []).then((data) =>
              setProjects(data.projects)  // Refresh the list of projects after adding
            );
          }}
          onCancel={() => setShowForm(false)}  // Close the form without adding
        />
      )}

      {/* If we're editing a project, show the edit form */}
      {/* Pass the project being edited to the EditProjectForm so it can display the current details.*/}
      {editingProject && (
        <EditProjectForm
          project={editingProject}
                // If the editing is successful, do the following:
          onSuccess={() => {
            setEditingProject(null);  // Close the edit form after successful update
            fetchProjects(pageSize, pageNum, []).then((data) =>
              setProjects(data.projects)  // Refresh the list of projects after editing
            );
          }}
          onCancel={() => setEditingProject(null)}  // Close the form without editing
        />
      )}

      {/* Table to show all the projects */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Regional Program</th>
            <th>Impact</th>
            <th>Phase</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* This takes each project from the list (projects) and creates a row (<tr>) in the table for each one, displaying the project's details in each column (<td>). */}
          {projects.map((p) => (
            <tr key={p.projectId}>
              <td>{p.projectId}</td>
              <td>{p.projectName}</td>
              <td>{p.projectType}</td>
              <td>{p.projectRegionalProgram}</td>
              <td>{p.projectImpact}</td>
              <td>{p.projectPhase}</td>
              <td>{p.projectFunctionalityStatus}</td>
              <td>
                {/* Button to edit a project */}
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditingProject(p)}  // When clicked, open the edit form for this project
                >
                  Edit
                </button>
                {/* Button to delete a project */}
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleDelete(p.projectId)}  // When clicked, delete the project
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

            {/* This is the Pagination part that lets you go to different pages */}
            <Pagination
            currentPage={pageNum}  // The page you're on right now
            totalPages={totalPages}  // How many pages there are in total
            pageSize={pageSize}  // How many projects you see on each page
            onPageChange={setPageNum}  // This tells the app to go to a different page
            onPageSizeChange={(newSize) => {
                setPageSize(newSize);  // This changes how many projects you see on each page
                setPageNum(1);  // This takes you back to the first page when the page size changes
            }}

      />
    </div>
  );
};

export default AdminProjectsPage;  // Export this page to be used in other parts of the app
