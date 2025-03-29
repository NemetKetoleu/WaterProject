import { useEffect, useState } from 'react'; // Importing tools to manage the component's state and side effects
import { Project } from '../types/Project'; // Importing the type that represents a project
import { useNavigate } from 'react-router-dom'; // Importing a tool to navigate to different pages
import { fetchProjects } from '../api/ProjectsAPI'; // Importing the function to fetch projects from the website
import Pagination from './Pagination'; // Importing a component that handles page navigation

// This is the main function that displays the list of projects
function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  // State variables to store the projects, page number, page size, and other things
  const [projects, setProjects] = useState<Project[]>([]); // Store the list of projects
  const [pageSize, setPageSize] = useState<number>(10); // Store the number of projects per page
  const [pageNum, setPageNum] = useState<number>(1); // Store the current page number
  const [totalPages, setTotalPages] = useState<number>(0); // Store the total number of pages
  const navigate = useNavigate(); // Tool to help navigate to other pages when needed
  const [error, setError] = useState<string | null>(null); // Store any errors that happen
  const [loading, setLoading] = useState(true); // Show if the page is still loading

  // This will run when the page loads or when page size, page number, or categories change
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true); // Start loading
        const data = await fetchProjects(pageSize, pageNum, selectedCategories); // Get projects from the website
        setProjects(data.projects); // Save the list of projects
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize)); // Calculate how many pages there are
      } catch (error) {
        setError((error as Error).message); // If something goes wrong, save the error message
      } finally {
        // The finally block ensures that this code runs no matter what happens before it (whether there was an error or not).
        setLoading(false); // Stop loading, this will run no matter what (even if there was an error). It ensures that the loading state is set to false once the process is complete, whether the data is fetched successfully or an error occurs.
      }
      // Note: The loading state is set to false in the finally block to ensure it runs regardless of success or failure of the fetch operation.
      // This ensures that the loading state is updated correctly, allowing the component to re-render and show either the projects or an error message.      
    };

    loadProjects(); // Run the function to load projects
  }, [pageSize, pageNum, selectedCategories]); // Re-run if these things change

// Show a friendly, beautiful loading message while the projects are being loaded
if (loading) return <p>Please wait Bro, we are fetching the latest projects for you...</p>;

  // If there's an error, show the error message
if (error) return <p className="text-red-500">Oops! Something went wrong. Please try again later.</p>;

  return (
    <>
      {/* Display each project in a "card" format */}
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            {/* List details about the project */}
            <ul className="list-unstyled">
              <li>
                <strong>Project Type: </strong>
                {p.projectType}
              </li>
              <li>
                <strong>Regional Program: </strong>
                {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact: </strong>
                {p.projectImpact} Individuals Served
              </li>
              <li>
                <strong>Project Phase: </strong>
                {p.projectPhase}
              </li>
              <li>
                <strong>Project Status: </strong>
                {p.projectFunctionalityStatus}
              </li>
            </ul>

            {/* Button that takes you to the donation page for this project */}
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${p.projectName}/${p.projectId}`) // Go to the donation page for this project
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}

      {/* Pagination component to move between pages */}
      <Pagination
        currentPage={pageNum} // Show the current page number
        totalPages={totalPages} // Show the total number of pages
        pageSize={pageSize} // Show how many projects per page
        onPageChange={setPageNum} // Handle the change when the page number is updated
        onPageSizeChange={(newSize) => {
          setPageSize(newSize); // Change the page size
          setPageNum(1); // Go back to the first page if page size changes
        }}
      />
    </>
  );
}

export default ProjectList;
