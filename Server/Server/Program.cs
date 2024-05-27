
using Fleck;

//Fleck est une bibliothèque qui simplifie le développement de serveurs WebSocket en C#.
namespace Server
{
    public class Program
    {
        public static void Main(string[] args)

        {
            //le serveur WebSocket est accessible depuis n'importe quelle adresse IP associée à la machine port"8181"
            var server = new WebSocketServer("ws://0.0.0.0:8181");
            //crée une nouvelle liste wsConnections pour stocker toutes les connexions WebSocket actives.
            var wsConenctions = new List<IWebSocketConnection>();
            /*démarre le serveur WebSocket et définit une fonction de rappel qui sera
            appelée chaque fois qu'une nouvelle connexion WebSocket est établie */
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
