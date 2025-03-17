using System.ComponentModel.DataAnnotations;

namespace WaterProject.API.Data
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }
        [Required]
        public string ProjectName { get; set; }
        // I made them nullable because the database says they are nullable
        public string? ProjectType { get; set; }
        public string? ProjectRegionalProgram { get; set; }
        public int? ProjectImpact { get; set; }
        public string? ProjectPhase { get; set; }
        public string? ProjectFunctionalityStatus { get; set; }
    }
}
