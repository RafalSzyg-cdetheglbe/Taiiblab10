using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.DTO;
using Services.Interfaces;

namespace WebAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService productsService;

        public ProductsController(IProductsService productsService)
        {
            this.productsService = productsService;
        }

        [HttpGet("{productId}")]
        public ProductDto GetById(int productId)
            => this.productsService.GetById(productId);

        [HttpGet]
        public PaginatedData<ProductDto> Get([FromQuery] PaginationDto dto)
            => this.productsService.Get(dto);

        [HttpPut("{productId}")]
        [Authorize(Roles = "admin")]
        public ProductDto Put(int productId, PutProductDto dto)
            => this.productsService.Put(productId, dto);

        [HttpPost]
        [Authorize(Roles = "admin")]
        public ProductDto Post(PostProductDto dto)
            => this.productsService.Post(dto);

        [HttpDelete("{productId}")]
        [Authorize(Roles = "admin")]
        public bool Delete(int productId)
            => this.productsService.Delete(productId);
    }
}
