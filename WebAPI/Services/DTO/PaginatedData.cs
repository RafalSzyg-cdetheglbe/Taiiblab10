using System.Collections.Generic;

namespace Services.DTO
{
    public class PaginatedData<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int Count { get; set; }
    }
}
