using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string DisplayName { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be between 4 and 8 characters long, containing at least one digit, one lowercase letter, and one uppercase letter.")]
        public string Password { get; set; }
        
        [Required]
        public string Username { get; set; }
    }
}