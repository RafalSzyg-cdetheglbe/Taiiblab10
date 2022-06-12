using Models;
using Services.DTO;
using Services.Interfaces;
using System.Linq;

namespace Services
{
    public class AuthorizationService : IAuthorizationService
    {
        private readonly Database database;

        public AuthorizationService(Database database)
        {
            this.database = database;
        }
        public int Login(AuthorizationDto dto)
        {
            User user = this.database.Users
                .Where(u => u.Login == dto.Login && u.Password == dto.Password)
                .FirstOrDefault();
            return user == null ? -1 : user.Id;
        }
    }
}
