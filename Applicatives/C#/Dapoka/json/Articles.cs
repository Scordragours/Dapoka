using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dapoka.json
{
    public class Articles
    {
        public string _id { get; set; }

        public int idRestaurant { get; set; }

        public string name { get; set; }

        //public Base64 picture { get; set; }

        public int price { get; set; }
        
        public int promotion { get; set; }

        public Array keysWords { get; set; }

        public Array parameters { get; set; }

        public int __v { get; set; }
    }
}
