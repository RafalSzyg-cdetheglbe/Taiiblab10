using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.DTO;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorizationService authorizationService;

        public AuthorizationController(IAuthorizationService authorizationService)
        {
            this.authorizationService = authorizationService;
        }

        [HttpPost]
        public IActionResult Login([FromBody] AuthorizationDto dto)
        {
            int userId = this.authorizationService.Login(dto);
            if (userId == -1)
                return Unauthorized();

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, dto.Login));
            claims.Add(new Claim("userId", userId.ToString()));
            if (dto.Login == "admin") claims.Add(new Claim(ClaimTypes.Role, "admin"));
            else claims.Add(new Claim(ClaimTypes.Role, "user"));
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretKey@$%2123"));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:1234",
                audience: "http://localhost:1234",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signingCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new { Token = tokenString });
        }

    }
}
