import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/xojo.js
var require_xojo = __commonJS({
  "node_modules/refractor/lang/xojo.js"(exports, module) {
    module.exports = xojo;
    xojo.displayName = "xojo";
    xojo.aliases = [];
    function xojo(Prism) {
      Prism.languages.xojo = {
        comment: {
          pattern: /(?:'|\/\/|Rem\b).+/i
        },
        string: {
          pattern: /"(?:""|[^"])*"/,
          greedy: true
        },
        number: [/(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i, /&[bchou][a-z\d]+/i],
        symbol: /#(?:If|Else|ElseIf|Endif|Pragma)\b/i,
        keyword: /\b(?:AddHandler|App|Array|As(?:signs)?|Auto|By(?:Ref|Val)|Boolean|Break|Byte|Call|Case|Catch|CFStringRef|CGFloat|Class|Color|Const|Continue|CString|Currency|CurrentMethodName|Declare|Delegate|Dim|Do(?:uble|wnTo)?|Each|Else(?:If)?|End|Enumeration|Event|Exception|Exit|Extends|False|Finally|For|Function|Get|GetTypeInfo|Global|GOTO|If|Implements|In|Inherits|Int(?:erface|eger|8|16|32|64)?|Lib|Loop|Me|Module|Next|Nil|Object|Optional|OSType|ParamArray|Private|Property|Protected|PString|Ptr|Raise(?:Event)?|ReDim|RemoveHandler|Return|Select(?:or)?|Self|Set|Single|Shared|Short|Soft|Static|Step|String|Sub|Super|Text|Then|To|True|Try|Ubound|UInt(?:eger|8|16|32|64)?|Until|Using|Var(?:iant)?|Wend|While|WindowPtr|WString)\b/i,
        operator: /<[=>]?|>=?|[+\-*\/\\^=]|\b(?:AddressOf|And|Ctype|IsA?|Mod|New|Not|Or|Xor|WeakAddressOf)\b/i,
        punctuation: /[.,;:()]/
      };
    }
  }
});

export {
  require_xojo
};
//# sourceMappingURL=/build/_shared/chunk-GIHWFRRG.js.map
