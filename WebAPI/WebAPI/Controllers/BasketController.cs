using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.DTO;
using Services.Interfaces;
using System.Collections.Generic;

namespace WebAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly IBasketService basketService;

        public BasketController(IBasketService basketService)
        {
            this.basketService = basketService;
        }

        [HttpGet("{userId}")]
        public IEnumerable<BasketItemDto> Get(int userId)
            => this.basketService.Get(userId);

        [HttpPost]
        public IEnumerable<BasketItemDto> Post(PostBasketItemDto dto)
            => this.basketService.Post(dto);

        [HttpPut("{basketItemId}")]
        public IEnumerable<BasketItemDto> Put(int basketItemId, int count)
            => this.basketService.Put(basketItemId, count);

        [HttpDelete("{basketItemId}")]
        public IEnumerable<BasketItemDto> Delete(int basketItemId)
            => this.basketService.Delete(basketItemId);

        [HttpDelete("clear/{userId}")]
        public bool Clear(int userId)
            => this.basketService.Clear(userId);
    }
}
