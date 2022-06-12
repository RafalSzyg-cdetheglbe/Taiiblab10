using Models;
using Services.DTO;
using Services.Interfaces;
using System.Linq;

namespace Services
{
    public class UsersService : IUsersService
    {
        private readonly Database database;

        public UsersService(Database database)
        {
            this.database = database;
        }

        public bool Delete(int userId)
        {
            User user = this.database.Users
                .Where(u => u.Id == userId)
                .FirstOrDefault();

            if (user == null)
                return false;

            if(user.Login.ToLower() == "admin")
                return false;

            var basketItems = this.database.BasketItems
                .Where(bi => bi.UserId == userId)
                .AsEnumerable();

            this.database.BasketItems.RemoveRange(basketItems);
            this.database.Users.Remove(user);
            this.database.SaveChanges();
            return true;
        }

        public PaginatedData<UserDto> Get(PaginationDto dto)
        {
            PaginatedData<UserDto> paginatedData = new PaginatedData<UserDto>();
            paginatedData.Data = this.database.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Login = u.Login,
                    Name = u.Name,
                    Surname = u.Surname
                });
            paginatedData.Count = paginatedData.Data.Count();

            switch (dto.SortColumn.ToLower())
            {
                case "login":
                    {
                        if (dto.SortAscending) paginatedData.Data = paginatedData.Data.OrderBy(u => u.Login);
                        else paginatedData.Data = paginatedData.Data.OrderByDescending(u => u.Login);
                        break;
                    }
                case "name":
                    {
                        if (dto.SortAscending) paginatedData.Data = paginatedData.Data.OrderBy(u => u.Name);
                        else paginatedData.Data = paginatedData.Data.OrderByDescending(u => u.Name);
                        break;
                    }
                case "surname":
                    {
                        if (dto.SortAscending) paginatedData.Data = paginatedData.Data.OrderBy(u => u.Surname);
                        else paginatedData.Data = paginatedData.Data.OrderByDescending(u => u.Surname);
                        break;
                    }
            }

            paginatedData.Data = paginatedData.Data.Skip((dto.Page - 1) * dto.RowsPerPage).Take(dto.RowsPerPage);
            return paginatedData;
        }

        public UserDto GetById(int userId)
        {
            User user = this.database.Users
                .Where(u => u.Id == userId)
                .FirstOrDefault();

            if (user == null)
                return null;

            return new UserDto
            {
                Id = user.Id,
                Login = user.Login,
                Name = user.Name,
                Surname = user.Surname
            };
        }

        public UserDto Post(PostUserDto dto)
        {
            User user = new User
            {
                Login = dto.Login,
                Password = dto.Password,
                Name = dto.Name,
                Surname = dto.Surname
            };

            if (this.database.Users.Where(u => u.Login.ToLower() == dto.Login.ToLower()).FirstOrDefault() != null)
                return null;

            this.database.Users.Add(user);
            this.database.SaveChanges();

            return new UserDto
            {
                Id = user.Id,
                Login = user.Login,
                Name = user.Name,
                Surname = user.Surname
            };
        }

        public UserDto Put(int userId, PutUserDto dto)
        {
            User user = this.database.Users
                .Where(u => u.Id == userId)
                .FirstOrDefault();

            if (user == null)
                return null;

            user.Name = dto.Name;
            user.Surname = dto.Surname;
            this.database.SaveChanges();

            return new UserDto
            {
                Id = user.Id,
                Login = user.Login,
                Name = user.Name,
                Surname = user.Surname
            };
        }
    }
}
