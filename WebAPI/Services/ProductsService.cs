using Models;
using Services.DTO;
using Services.Interfaces;
using System.Linq;

namespace Services
{
    public class ProductsService : IProductsService
    {
        private readonly Database database;

        public ProductsService(Database database)
        {
            this.database = database;
        }
        public bool Delete(int productId)
        {
            Product product = this.database.Products
                .Where(p => p.Id == productId)
                .FirstOrDefault();

            if (product == null)
                return false;

            var basketItems = this.database.BasketItems
                .Where(bi => bi.ProductId == productId)
                .AsEnumerable();

            this.database.BasketItems.RemoveRange(basketItems);
            this.database.Products.Remove(product);
            this.database.SaveChanges();
            return true;
        }

        public PaginatedData<ProductDto> Get(PaginationDto dto)
        {
            PaginatedData<ProductDto> paginatedData = new PaginatedData<ProductDto>();
            paginatedData.Data = this.database.Products
                .Select(p => new ProductDto { 
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price
                });
            paginatedData.Count = paginatedData.Data.Count();

            switch(dto.SortColumn.ToLower())
            {
                case "name":
                    {
                        if (dto.SortAscending) paginatedData.Data = paginatedData.Data.OrderBy(p => p.Name);
                        else paginatedData.Data = paginatedData.Data.OrderByDescending(p => p.Name);
                        break;
                    }
                case "description":
                    {
                        if (dto.SortAscending) paginatedData.Data = paginatedData.Data.OrderBy(p => p.Description);
                        else paginatedData.Data = paginatedData.Data.OrderByDescending(p => p.Description);
                        break;
                    }
                case "price":
                    {
                        if (dto.SortAscending) paginatedData.Data = paginatedData.Data.OrderBy(p => p.Price);
                        else paginatedData.Data = paginatedData.Data.OrderByDescending(p => p.Price);
                        break;
                    }
            }

            paginatedData.Data = paginatedData.Data.Skip((dto.Page - 1) * dto.RowsPerPage).Take(dto.RowsPerPage);
            return paginatedData;
        }

        public ProductDto GetById(int productId)
        {
            Product product = this.database.Products
                .Where(p => p.Id == productId)
                .FirstOrDefault();

            if (product == null)
                return null;

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price
            };
        }

        public ProductDto Post(PostProductDto dto)
        {
            Product product = new Product()
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price
            };

            this.database.Products.Add(product);
            this.database.SaveChanges();

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price
            };
        }

        public ProductDto Put(int productId, PutProductDto dto)
        {
            Product product = this.database.Products
                .Where(p => p.Id == productId)
                .FirstOrDefault();

            if (product == null)
                return null;

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            this.database.SaveChanges();

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price
            };
        }
    }
}
