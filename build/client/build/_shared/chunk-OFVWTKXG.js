import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/powershell.js
var require_powershell = __commonJS({
  "node_modules/refractor/lang/powershell.js"(exports, module) {
    module.exports = powershell;
    powershell.displayName = "powershell";
    powershell.aliases = [];
    function powershell(Prism) {
      ;
      (function(Prism2) {
        var powershell2 = Prism2.languages.powershell = {
          comment: [
            {
              pattern: /(^|[^`])<#[\s\S]*?#>/,
              lookbehind: true
            },
            {
              pattern: /(^|[^`])#.*/,
              lookbehind: true
            }
          ],
          string: [
            {
              pattern: /"(?:`[\s\S]|[^`"])*"/,
              greedy: true,
              inside: {
                function: {
                  // Allow for one level of nesting
                  pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
                  lookbehind: true,
                  // Populated at end of file
                  inside: {}
                }
              }
            },
            {
              pattern: /'(?:[^']|'')*'/,
              greedy: true
            }
          ],
          // Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices
          // Supports two levels of nested brackets (e.g. `[OutputType([System.Collections.Generic.List[int]])]`)
          namespace: /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
          boolean: /\$(?:true|false)\b/i,
          variable: /\$\w+\b/,
          // Cmdlets and aliases. Aliases should come last, otherwise "write" gets preferred over "write-host" for example
          // Get-Command | ?{ $_.ModuleName -match "Microsoft.PowerShell.(Util|Core|Management)" }
          // Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match "Microsoft.PowerShell.(Util|Core|Management)" }
          function: [
            /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
            /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i
          ],
          // per http://technet.microsoft.com/en-us/library/hh847744.aspx
          keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
          operator: {
            pattern: /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
            lookbehind: true
          },
          punctuation: /[|{}[\];(),.]/
        };
        var stringInside = powershell2.string[0].inside;
        stringInside.boolean = powershell2.boolean;
        stringInside.variable = powershell2.variable;
        stringInside.function.inside = powershell2;
      })(Prism);
    }
  }
});

export {
  require_powershell
};
//# sourceMappingURL=/build/_shared/chunk-OFVWTKXG.js.map
