using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Base64Encoding
{
    class Program
    {
        static void Main(string[] args)
        {
            string msg = 
                "Hello, .NET Framework." + Environment.NewLine + 
                "I'm .NET Core.";

            string encodedMsg = EncodingHelper.Base64Encode(msg);
            Console.WriteLine(encodedMsg);

            string decodedMsg = EncodingHelper.Base64Decode(encodedMsg);
            Console.WriteLine(decodedMsg);
        }
    }
}
