using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestConsoleApp
{
    class Program
    {
        //class Person
        //{
        //    public string Name { get; set; }
        //    public int Age { get; set; }

        //    public Person(string name, int age)
        //    {
        //        Name = name;
        //        Age = age;
        //    }

        //    public override string ToString()
        //    {
        //        return string.Format("{0} : {1}", Name, Age);
        //    }
        //}

        //class Group
        //{
        //    public int Id { get; set; }
        //    public Person[] Persons { get; set; }

        //    public Group(int id, Person[] persons)
        //    {
        //        Id = id;
        //        Persons = persons;
        //    }

        //    public override string ToString()
        //    {
        //        StringBuilder sb = new StringBuilder();

        //        sb.AppendLine("ID : " + Id);

        //        foreach(Person person in Persons) 
        //        {
        //            sb.AppendLine(person.ToString());
        //        }

        //        return sb.ToString();
        //    }
        //}

        class Person
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public string MainJob { get; set; }
            public string SubJob { get; set; }

            public Person(string name, int age, string mainJob, string subJob)
            {
                Name = name;
                Age = age;
                MainJob = mainJob;
                SubJob = subJob;
            }
        }

        static void Main(string[] args)
        {
            //string param = System.IO.File.ReadAllText(@".\..\..\sample.json");

            //Group group = JsonNet.Serialize.JsonSerializeHelper.Deserialize<Group>(param);
            //Console.WriteLine(group.ToString());

            //param = JsonNet.Serialize.JsonSerializeHelper.Serialize(group);
            //Console.WriteLine(param);

            string param = System.IO.File.ReadAllText(@".\..\..\sample2.json");

            Person person = JsonNet.Serialize.JsonSerializeHelper.Deserialize<Person>(param);
            Console.WriteLine(person.ToString());

            param = JsonNet.Serialize.JsonSerializeHelper.Serialize(person);
            Console.WriteLine(param);   
        }
    }
}
