using Services.DTO;

namespace Services.Interfaces
{
    public interface IUsersService
    {
        public PaginatedData<UserDto> Get(PaginationDto dto);
        public UserDto GetById(int userId);
        public UserDto Post(PostUserDto dto);
        public UserDto Put(int userId, PutUserDto dto);
        public bool Delete(int userId);
    }
}