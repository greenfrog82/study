using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotnetClassLib
{
    public static class Printer
    {
        public static void Print(string msg)
        {
            Console.WriteLine("[.NET Framework][Printer] {0}", msg);
        }
    }
}
