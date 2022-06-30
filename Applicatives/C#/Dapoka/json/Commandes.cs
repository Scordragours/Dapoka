using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dapoka.json
{
    public class Commandes
    {
        public string _id { get; set; }

        public int idRestaurant { get; set; }

        public int idUser { get; set; }

        public Array status { get; set; }

        public Array products { get; set; }

        public string userLocation { get; set; }

        public string restaurantLocation { get; set; }

        public int __v { get; set; }

    }
}
