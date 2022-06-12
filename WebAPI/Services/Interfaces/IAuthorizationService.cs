using Services.DTO;

namespace Services.Interfaces
{
    public interface IAuthorizationService
    {
        public int Login(AuthorizationDto dto);
    }
}
