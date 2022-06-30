using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Dapoka
{
    public sealed class HttpClient
    {
        private HttpClient() { }

        private static HttpClient instance;

        private static System.Net.Http.HttpClient httpclient = new System.Net.Http.HttpClient();

        public static HttpClient GetInstance()
        {
            if(instance == null) { instance = new HttpClient(); }
            return instance;
        }

        public async Task<string> Get(string Uri, string token = null)
        {
            using(var request = new HttpRequestMessage(HttpMethod.Get, Uri))
            {
                request.Headers.Add("token-api", "d7efa19fbe7d3972fd5adb6024223d74");
                if(token != null)
                {
                    request.Headers.Add("token", token);
                }
                var response = await httpclient.SendAsync(request);

                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync();
            }
        }

        public async Task<string> Put(string Uri, HttpContent content, string token = null)
        {
            using (var request = new HttpRequestMessage(HttpMethod.Put, Uri))
            {
                request.Headers.Add("token-api", "d7efa19fbe7d3972fd5adb6024223d74");
                if (token != null)
                {
                    request.Headers.Add("token", token);
                }
                request.Content = content;
                var response = await httpclient.SendAsync(request);

                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync();
            }

        }

        public async Task<string> Post(string Uri, HttpContent content, string token = null)
        {
            using (var request = new HttpRequestMessage(HttpMethod.Post, Uri))
            {
                request.Headers.Add("token-api", "d7efa19fbe7d3972fd5adb6024223d74");
                if (token != null)
                {
                    request.Headers.Add("token", token);
                }
                request.Content = content;
                var response = await httpclient.SendAsync(request);

                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync();
            }

        }
    }
}
