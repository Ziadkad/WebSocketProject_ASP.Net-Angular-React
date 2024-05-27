
using Fleck;

//Fleck est une biblioth�que qui simplifie le d�veloppement de serveurs WebSocket en C#.
namespace Server
{
    public class Program
    {
        public static void Main(string[] args)

        {
            //le serveur WebSocket est accessible depuis n'importe quelle adresse IP associ�e � la machine port"8181"
            var server = new WebSocketServer("ws://0.0.0.0:8181");
            //cr�e une nouvelle liste wsConnections pour stocker toutes les connexions WebSocket actives.
            var wsConenctions = new List<IWebSocketConnection>();
            /*d�marre le serveur WebSocket et d�finit une fonction de rappel qui sera
            appel�e chaque fois qu'une nouvelle connexion WebSocket est �tablie */
            server.Start(ws =>
            {
                ws.OnOpen = () =>
                {
                    wsConenctions.Add(ws);
                };
                ws.OnMessage = message =>
                {
                    foreach (var webSocketConnection in wsConenctions)

                    {
                        /*Console.WriteLine(message);*/

                        webSocketConnection.Send(message);
                    }
                };
            });
            WebApplication.CreateBuilder(args).Build().Run();

           
        }
    }
}
