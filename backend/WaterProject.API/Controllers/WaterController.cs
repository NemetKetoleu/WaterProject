using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    // This tells the app to use this class to handle requests for "WaterController" (e.g., /WaterController)
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        // This connects the controller to the database to get or change data.
        private WaterDbContext _waterContext;

        // This is the constructor where we set up the connection to the database.
        public WaterController(WaterDbContext temp) => _waterContext = temp;

        // This API endpoint gets all the projects, with optional filtering and paging (for large lists).
        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
        {
            // Start with all projects in the database.
            var query = _waterContext.Projects.AsQueryable();

            // If specific project types are provided, filter the projects by type.
            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }

            // Count the total number of projects after applying filters.
            var totalNumProjects = query.Count();

            // Get only the projects for the requested page, with a limit on the number of items per page.
            var something = query
                .Skip((pageNum-1) * pageSize)  // Skip the projects before the current page.
                .Take(pageSize)  // Take only the number of projects for this page.
                .ToList();

            // Create an object to return, containing the projects and the total number of projects.
            var someObject = new
            {
                Projects = something,  // The list of projects for this page.
                TotalNumProjects = totalNumProjects  // Total number of projects, for paging info.
            };

            // Return the object with the projects and total count.
            return Ok(someObject);
        }

        // This API endpoint gets all the different types of projects in the database.
        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes ()
        {
            // Get a list of unique project types from the database.
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)  // Get only the ProjectType column.
                .Distinct()  // Ensure no duplicates (only unique project types).
                .ToList();  // Convert it to a list.

            // Return the list of project types.
            return Ok(projectTypes);
        }

        // This API endpoint adds a new project to the database.
        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject)
        {
            // Add the new project to the "Projects" table in the database.
            _waterContext.Projects.Add(newProject);

            // Save the changes to the database (this actually adds the project).
            _waterContext.SaveChanges();

            // Return the newly added project as a response.
            return Ok(newProject);
        }

        // This API endpoint updates an existing project with new information.
        [HttpPut("UpdateProject/{projectId}")]
        public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
        {
            // Find the existing project by its ID in the database.
            var existingProject = _waterContext.Projects.Find(projectId);

            // Update the project's details with the new values.
            existingProject.ProjectName = updatedProject.ProjectName;
            existingProject.ProjectType = updatedProject.ProjectType;
            existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
            existingProject.ProjectImpact = updatedProject.ProjectImpact;
            existingProject.ProjectPhase = updatedProject.ProjectPhase;
            existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;

            // Update the project in the database.
            _waterContext.Projects.Update(existingProject);
            // Save the changes to the database.
            _waterContext.SaveChanges();

            // Return the updated project as a response.
            return Ok(existingProject);
        }



        // This API endpoint deletes a project by its ID.
        [HttpDelete("DeleteProject/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            // Find the project to delete by its ID.
            var project = _waterContext.Projects.Find(projectId);
            // If the project is not found, return a "not found" error.
            if (project == null)
            {
                return NotFound(new { message = "The project you are looking for were not found Bruh" });
            }

            // Remove the project from the database.
            _waterContext.Projects.Remove(project);
            // Save the changes to the database (this deletes the project).
            _waterContext.SaveChanges();

            // Return a "no content" response, meaning the deletion was successful.
            return NoContent();
        }
    }
}
