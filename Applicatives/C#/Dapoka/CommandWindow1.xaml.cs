using System;
using System.Collections.Generic;
using System.Linq;
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
    /// Interaction logic for CommandWindow1.xaml
    /// </summary>
    public partial class CommandWindow1 : Window
    {
        public CommandWindow1(List<Commandes> commandes)
        {
            InitializeComponent();
            CommandeGrid.ItemsSource = commandes;
        }

        private void CommandeGrid_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            var menuItem = (DataGridRow)sender;
            var commande = (Commandes)menuItem.DataContext;

            //Window foodWindow = new FoodWindow1(commande.plats);
            //foodWindow.Owner = this;
            //foodWindow.Show();
        }
    }
}
