using System.Text;

namespace JsonNet
{
	public static class JsonHelper
    {
        /// <summary>
        /// C# 코딩 컨벤션을 Json의 코딩 컨벤션으로 변경
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public static string ToJsonFormatFromCSharp(string param)
        {
            System.Diagnostics.Debug.Assert(!string.IsNullOrEmpty(param));

            char[] tokens = param.ToCharArray();

            StringBuilder jsonFormatProperty = new StringBuilder();

            jsonFormatProperty.Append(char.ToLower(tokens[0]));

            for (int i = 1; i < tokens.Length; i++)
            {
                char token = tokens[i];

                if (char.IsUpper(token))
                {
                    jsonFormatProperty.Append("_");
                    token = char.ToLower(token);
                }

                jsonFormatProperty.Append(token);
            }

            return jsonFormatProperty.ToString();
        }



        /// <summary>
        /// Json코딩 컨벤션을 C#의 코딩 컨벤션으로 변경
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public static string ToCSharpFormatFromJson(string param)
        {
            System.Diagnostics.Debug.Assert(!string.IsNullOrEmpty(param));
            System.Diagnostics.Debug.Assert(IsJsonCodingConvection(param));

            char[] tokens = param.ToCharArray();

            StringBuilder jsonFormatProperty = new StringBuilder();

            jsonFormatProperty.Append(char.ToUpper(tokens[0]));

            bool foundSep = false;

            for (int i = 1; i < tokens.Length; i++)
            {
                char token = tokens[i];

                if ('_' == token)
                {
                    foundSep = true;
                    continue;
                }

                if (foundSep)
                {
                    foundSep = false;
                    token = char.ToUpper(token);
                }

                jsonFormatProperty.Append(token);
            }

            return jsonFormatProperty.ToString();
        }

        /// <summary>
        /// param으로 전달 받은 문자열이 Json의 코딩 컨벤션을 준수하고 있는지 확인
        /// </summary>
        /// <param name="param"></param>
        /// <returns></returns>
        public static bool IsJsonCodingConvection(string param)
        {
            System.Diagnostics.Debug.Assert(!string.IsNullOrEmpty(param));

            char[] tokens = param.ToCharArray();

            foreach (char token in tokens)
            {
                if (char.IsLetter(token) && !char.IsLower(token))
                    return false;
            }

            return true;
        }
    }
}
