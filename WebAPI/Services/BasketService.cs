using Models;
using Services.DTO;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Services
{
    public class BasketService : IBasketService
    {
        private readonly Database database;

        public BasketService(Database database)
        {
            this.database = database;
        }

        public bool Clear(int userId)
        {
            IEnumerable<BasketItem> basketItems = this.database.BasketItems
                .Where(bi => bi.UserId == userId);

            if(basketItems.Count() > 0)
            {
                this.database.RemoveRange(basketItems);
                this.database.SaveChanges();
                return true;
            }

            return false;
        }

        public IEnumerable<BasketItemDto> Delete(int basketItemId)
        {
            BasketItem basketItem = this.database.BasketItems
                .Where(bi => bi.Id == basketItemId).FirstOrDefault();

            int userId = -1;
            if (basketItem != null)
            {
                userId = basketItem.UserId;
                this.database.BasketItems.Remove(basketItem);
                this.database.SaveChanges();
            }

            return this.database.BasketItems
                .Where(bi => bi.UserId == userId)
                .Join(
                this.database.Products,
                bi => bi.ProductId,
                p => p.Id,
                (bi, p) => new BasketItemDto
                {
                    Id = bi.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Count = bi.Count
                });
        }

        public IEnumerable<BasketItemDto> Get(int userId)
        {
            return this.database.BasketItems
                .Where(bi => bi.UserId == userId)
                .Join(
                this.database.Products,
                bi => bi.ProductId,
                p => p.Id,
                (bi, p) => new BasketItemDto 
                {
                    Id = bi.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Count = bi.Count
                });
        }

        public IEnumerable<BasketItemDto> Post(PostBasketItemDto dto)
        {
            Product product = this.database.Products
                .Where(p => p.Id == dto.ProductId)
                .FirstOrDefault();

            if (product == null)
                return null;

            if (dto.Count < 1)
                return null;

            BasketItem basketItem = this.database.BasketItems
                .Where(bi => bi.ProductId == dto.ProductId && bi.UserId == dto.UserId)
                .FirstOrDefault();

            if(basketItem == null)
            {
                basketItem = new BasketItem()
                {
                    Count = dto.Count,
                    ProductId = dto.ProductId,
                    UserId = dto.UserId
                };
                this.database.BasketItems.Add(basketItem);
            }
            else
            {
                basketItem.Count += dto.Count;
            }
            this.database.SaveChanges();

            return this.database.BasketItems
                .Where(bi => bi.UserId == dto.UserId)
                .Join(
                this.database.Products,
                bi => bi.ProductId,
                p => p.Id,
                (bi, p) => new BasketItemDto
                {
                    Id = bi.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Count = bi.Count
                });
        }

        public IEnumerable<BasketItemDto> Put(int basketItemId, int count)
        {
            if (count < 1)
                return null;

            BasketItem basketItem = this.database.BasketItems
                .Where(bi => bi.Id == basketItemId)
                .FirstOrDefault();

            int userId = -1;

            if (basketItem != null)
            {
                userId = basketItem.UserId;
                basketItem.Count = count;
                this.database.SaveChanges();
            }

            return this.database.BasketItems
                .Where(bi => bi.UserId == userId)
                .Join(
                this.database.Products,
                bi => bi.ProductId,
                p => p.Id,
                (bi, p) => new BasketItemDto
                {
                    Id = bi.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Count = bi.Count
                });
        }
    }
}
