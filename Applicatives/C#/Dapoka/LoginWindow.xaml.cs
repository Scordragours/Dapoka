using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using Dapoka.json;

namespace Dapoka
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
        }

        private async void Login_Click(object sender, RoutedEventArgs e)
        {
            JsonDeserializer deserializer = new JsonDeserializer();
            try
            {           
                
                Window window = new MainWindow(deserializer.LoginDeserialize(await VerifyUser(LoginBox.Text, PasswordBox.Password)));
                window.Show();
                this.Close();
                
            }catch(HttpRequestException h)
            {
                MessageBox.Show("Username or Password is incorrect", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async Task<string> VerifyUser(string user, string password)
        {
            HttpClient client = HttpClient.GetInstance();
            var content = new FormUrlEncodedContent(new[]
            {
             new KeyValuePair<string, string>("email", user),
             new KeyValuePair<string, string>("password", password),
            });
            
            return await client.Post(@"http://127.0.0.1:3000/account/authentication", content);
        }
    }
}
