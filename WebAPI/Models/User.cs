using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Login { get; set; }

        [Required, MinLength(10), MaxLength(100)]
        public string Password { get; set; }

        [Required, MaxLength(40)]
        public string Name { get; set; }

        [Required, MaxLength(60)]
        public string Surname { get; set; }

        public ICollection<BasketItem> BasketItems { get; set; }
    }
}
