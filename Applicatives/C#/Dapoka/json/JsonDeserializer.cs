using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace Dapoka.json
{
    public class JsonDeserializer
    {
        public List<Log> LogDeserialize(string json)
        {
            return JsonSerializer.Deserialize<List<Log>>(json);
        }

        public List<Articles> ArticlesDeserialize(string json)
        {
            return JsonSerializer.Deserialize<List<Articles>>(json);
        }

        public List<Commandes> CommandesDeserialize(string json)
        {
            return JsonSerializer.Deserialize<List<Commandes>>(json);
        }

        public List<Menus> MenusDeserialize(string json)
        {
            return JsonSerializer.Deserialize<List<Menus>>(json);
        }

        public List<User> UserDeserialize(string json)
        {
            return JsonSerializer.Deserialize<List<User>>(json);
        }

        public string LoginDeserialize(string json)
        {
            Login test = JsonSerializer.Deserialize<Login>(json);
            return test.token;
        }

        public struct Login
        {
            public string token { get; set; }

            public string message { get; set; }
        }
    }
}
