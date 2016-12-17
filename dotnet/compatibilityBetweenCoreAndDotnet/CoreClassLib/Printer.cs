using System;

namespace CoreClassLib
{
    public static class Printer
    {
        public static void Print(string msg)
        {
            Console.WriteLine("[Core][Printer] {0}", msg);
        }
    }
}
