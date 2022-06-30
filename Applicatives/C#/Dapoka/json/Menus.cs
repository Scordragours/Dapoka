using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dapoka.json
{
    public  class Menus
    {
        public string _id { get; set; }

        public int idRestaurant { get; set; }

        //public Base64 picture { get; set; }

        public int price { get; set; }

        public string keyWords { get; set; }

        public Array parameters { get; set; }

        public List<Articles> articles { get; set; }

        public int __v { get; set; }

    }
}
