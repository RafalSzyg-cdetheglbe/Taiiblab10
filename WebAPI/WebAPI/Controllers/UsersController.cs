using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.DTO;
using Services.Interfaces;

namespace WebAPI.Controllers
{
    [ApiController]
    [Authorize(Roles = "admin")]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpGet]
        public PaginatedData<UserDto> Get([FromQuery] PaginationDto dto)
            => this.usersService.Get(dto);

        [HttpGet("{userId}")]
        public UserDto GetById(int userId)
            => this.usersService.GetById(userId);

        [HttpPost]
        [AllowAnonymous]
        public UserDto Post(PostUserDto dto)
            => this.usersService.Post(dto);

        [HttpPut("{userId}")]
        public UserDto Put(int userId, PutUserDto dto)
            => this.usersService.Put(userId, dto);

        [HttpDelete("{userId}")]
        public bool Delete(int userId)
            => this.usersService.Delete(userId);
    }
}
