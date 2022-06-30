using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dapoka
{
    public class Log
    {
        public string _id { get; set; }
        public string type { get; set; }
        public string api_location { get; set; }
        public string origin { get; set; }
        public string data { get; set; }
        public string status { get; set; }
        public DateTime date { get; set; }
        public int __v { get; set; }    
    }
}
