using Services.DTO;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface  IBasketService
    {
        public IEnumerable<BasketItemDto> Get(int userId);
        public IEnumerable<BasketItemDto> Post(PostBasketItemDto dto);
        public IEnumerable<BasketItemDto> Put(int basketItemId, int count);
        public IEnumerable<BasketItemDto> Delete(int basketItemId);
        public bool Clear(int userId);
    }
}
