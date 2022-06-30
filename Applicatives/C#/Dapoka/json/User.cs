using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dapoka.json
{
    public class User
    {
        public int id { get; set; }

        public string group { get; set; }

        public string name { get; set; }

        public string firstname { get; set; }

        public string? picture { get; set; }

        public string email { get; set; }

        public string telephoneNumber { get; set; }

        public string password { get; set; }

        public string refreshToken  { get; set; }

        public DateTime? dateExpirationToken { get; set; }

        public bool suspended { get; set; }

        public bool active { get; set; }

        public string sponsorshipCode { get; set; }

        public DateTime? sponsorshipCodeLastUsed { get; set; }

        public string? location { get; set; }

        public string card { get; set; }

        public DateTime createdAt { get; set; }

        public DateTime updatedAt { get; set; }
    }
}
