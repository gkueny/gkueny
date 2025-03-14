import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/visual-basic.js
var require_visual_basic = __commonJS({
  "node_modules/refractor/lang/visual-basic.js"(exports, module) {
    module.exports = visualBasic;
    visualBasic.displayName = "visualBasic";
    visualBasic.aliases = [];
    function visualBasic(Prism) {
      Prism.languages["visual-basic"] = {
        comment: {
          pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i,
          inside: {
            keyword: /^REM/i
          }
        },
        directive: {
          pattern: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
          alias: "comment",
          greedy: true
        },
        string: {
          pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i,
          greedy: true
        },
        date: {
          pattern: /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?)[^\S\r\n]*#/i,
          alias: "builtin"
        },
        number: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
        boolean: /\b(?:True|False|Nothing)\b/i,
        keyword: /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Currency|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|Type|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Until|Xor)\b/i,
        operator: [
          /[+\-*/\\^<=>&#@$%!]/,
          {
            pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/,
            lookbehind: true
          }
        ],
        punctuation: /[{}().,:?]/
      };
      Prism.languages.vb = Prism.languages["visual-basic"];
      Prism.languages.vba = Prism.languages["visual-basic"];
    }
  }
});

export {
  require_visual_basic
};
//# sourceMappingURL=/build/_shared/chunk-ZDT6JT3L.js.map
