using Services.DTO;

namespace Services.Interfaces
{
    public interface IProductsService
    {
        public PaginatedData<ProductDto> Get(PaginationDto dto);
        public ProductDto GetById(int productId);
        public ProductDto Put(int productId, PutProductDto dto);
        public ProductDto Post(PostProductDto dto);
        public bool Delete(int productId);
    }
}
