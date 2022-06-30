using Dapoka.json;
using System;
using System.Collections.Generic;
using System.IO;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Dapoka
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public string token;
        public List<User> users;
        public List<Commandes> commandes;
        public List<Log> log;
        public JsonDeserializer deserializer = new JsonDeserializer();
        public MainWindow(string token)
        {
            this.token = token;
            InitializeComponent();
            PlaceHolder();
            HttpClient client = HttpClient.GetInstance();
        }

        private async void PlaceHolder()//need to be replace by api request to get data
        {
            HttpClient client = HttpClient.GetInstance();
            users = deserializer.UserDeserialize((await client.Get("http://127.0.0.1:3000/accounts")));
            UserGrid.ItemsSource = users;


            log = new List<Log>();
            log.Add(new Log() { _id = "1", api_location = "testlocation", type = "typetest", data = "testdata", date = DateTime.Now, origin = "testorigin", __v = 1 });
            log.Add(new Log()
            {
                _id = "62b182a89e6516d818278d66",
                type = "qqqqqq",
                api_location = "aa",
                origin = "aaa",
                data = "aaaa",
                status = "aaaaa",
                date = DateTime.UtcNow,
                __v = 0
            });

            commandes = new List<Commandes>();
        }

        private void SearchButton_Click(object sender, RoutedEventArgs e)
        {
            SearchFonction(SearchBar.Text);
        }

        private void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            UpadteUser(sender, true);
        }
        private void UnBan_Click(object sender, RoutedEventArgs e)
        {
            UpadteUser(sender, false);
        }
        private void Logo_Click(object sender, RoutedEventArgs e)
        {
            SearchFonction("");
        }

        private void SearchBar_KeyUp(object sender, KeyEventArgs e)
        {
            if(e.Key == Key.Enter)
            {
                SearchFonction(SearchBar.Text);
            }
        }
        private async void UserGrid_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            var menuItem = (DataGridRow)sender;
            var user = (User)menuItem.DataContext;

            var client = HttpClient.GetInstance();
            commandes = deserializer.CommandesDeserialize(await client.Get("http://127.0.0.1:3000/restaurant/orders/" + user.id));

            Window commandWindow = new CommandWindow1(commandes);
            ShowWindow(commandWindow);
        }

        private async void Log_Selected(object sender, RoutedEventArgs e)
        {
            HttpClient client = HttpClient.GetInstance();
            log = deserializer.LogDeserialize(await client.Get("http://127.0.0.1:3000/monitoring/logs/"));

            Window logWindow = new LogWindow(log);
            ShowWindow(logWindow); 
        }

        private void Commande_Selected(object sender, RoutedEventArgs e)
        {
            Window commandeWindow = new CommandWindow1(commandes.Where(c => c.status.ToString() == "encours").ToList<Commandes>());
            ShowWindow(commandeWindow);
        }

        private void ShowWindow(Window window)
        {
            window.Owner = this;
            window.Show();
        }

        private void UpadteUser(object sender, bool statues)
        {
            MenuItem menuItem = (MenuItem)sender;
            ContextMenu contextMenu = (ContextMenu)menuItem.Parent;
            DataGridRow item = (DataGridRow)contextMenu.PlacementTarget;
            User toDeleteFromBindedList = (User)item.Item;

            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("suspended", statues.ToString()),
            });

            users = users.Select(c =>
            {
                if (c.id == toDeleteFromBindedList.id)
                {
                    c.suspended = statues;
                    HttpClient client = HttpClient.GetInstance();
                    client.Put(@"http://127.0.0.1:3000/account/" + c.email, content);
                }
                return c;
            }).ToList<User>();

            UserGrid.ItemsSource = users;
        }

        private void SearchFonction(string text)
        {
            var filtered = users.Where(u => 
                u.name.ToLower()
                    .Contains(text.ToLower()) ||
                u.email.ToLower()
                    .Contains(text.ToLower()) ||
                u.group.ToLower()
                    .Contains(text.ToLower()) ||
                u.id.ToString().ToLower()
                    .Contains(text.ToLower()) ||
                u.telephoneNumber.ToLower()
                    .Contains(text.ToLower()) ||
                u.suspended.ToString().ToLower()
                    .Contains(text.ToLower())
                );
            UserGrid.ItemsSource = filtered;
        }


    }

}
