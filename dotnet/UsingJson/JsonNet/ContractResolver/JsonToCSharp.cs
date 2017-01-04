namespace JsonNet.ContractResolver
{
    public class JsonToCSharp : Newtonsoft.Json.Serialization.DefaultContractResolver
    {
        protected override string ResolvePropertyName(string propertyName)
        {
            return JsonHelper.ToJsonFormatFromCSharp(propertyName);
        }
    }
}
