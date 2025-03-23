using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;
using System;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
        public WaterController(WaterDbContext temp) => _waterContext = temp;

        [HttpGet("AllProjects")]
        // in case nothing is passed, the default value will be 
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromBody] List<string>? projectTypes = null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }
            var totalNumProjects = query.Count();

            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize) // This line limits the number of projects returned
                .ToList();

            var someObejct = new
            {
                Projects = something,
                TotalNumProjects = totalNumProjects
            };

            return Ok(someObejct);
        }



        // we need to build a second route where we going to get the category list or project type

        [HttpGet("GetProjectTypes")] // This sets up the URL endpoint for getting project types when requested
        public IActionResult GetProjectTypes()
        {
            // Get all projects from the database
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType) // Pick only the 'ProjectType' of each project
                .Distinct() // Remove any duplicate project types (only unique types are kept)
                .ToList(); // Turn the unique project types into a list

            // Return the list of unique project types to the user
            return Ok(projectTypes);
        }

    }

}

