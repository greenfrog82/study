using JsonNet.ContractResolver;

namespace JsonNet.Serialize
{
	public static class JsonSerializeHelper
    {
        public static string Serialize(object param)
        {
            //Newtonsoft.Json.JsonSerializerSettings settings = new Newtonsoft.Json.JsonSerializerSettings();

            //settings.ContractResolver = new CSharpToJson();

            //return Newtonsoft.Json.JsonConvert.SerializeObject(param, Newtonsoft.Json.Formatting.Indented, settings);
            return Newtonsoft.Json.JsonConvert.SerializeObject(param, Newtonsoft.Json.Formatting.Indented);
        }

        public static T Deserialize<T>(string param)
        {
            //Newtonsoft.Json.JsonSerializerSettings settings = new Newtonsoft.Json.JsonSerializerSettings();
            //settings.ContractResolver = new JsonToCSharp();

            //return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(param, settings);
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(param);
        }
    }
}
