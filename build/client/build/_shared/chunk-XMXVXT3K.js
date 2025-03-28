import {
  __commonJS
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/refractor/lang/asm6502.js
var require_asm6502 = __commonJS({
  "node_modules/refractor/lang/asm6502.js"(exports, module) {
    module.exports = asm6502;
    asm6502.displayName = "asm6502";
    asm6502.aliases = [];
    function asm6502(Prism) {
      Prism.languages.asm6502 = {
        comment: /;.*/,
        directive: {
          pattern: /\.\w+(?= )/,
          alias: "keyword"
        },
        string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        opcode: {
          pattern: /\b(?:adc|and|asl|bcc|bcs|beq|bit|bmi|bne|bpl|brk|bvc|bvs|clc|cld|cli|clv|cmp|cpx|cpy|dec|dex|dey|eor|inc|inx|iny|jmp|jsr|lda|ldx|ldy|lsr|nop|ora|pha|php|pla|plp|rol|ror|rti|rts|sbc|sec|sed|sei|sta|stx|sty|tax|tay|tsx|txa|txs|tya|ADC|AND|ASL|BCC|BCS|BEQ|BIT|BMI|BNE|BPL|BRK|BVC|BVS|CLC|CLD|CLI|CLV|CMP|CPX|CPY|DEC|DEX|DEY|EOR|INC|INX|INY|JMP|JSR|LDA|LDX|LDY|LSR|NOP|ORA|PHA|PHP|PLA|PLP|ROL|ROR|RTI|RTS|SBC|SEC|SED|SEI|STA|STX|STY|TAX|TAY|TSX|TXA|TXS|TYA)\b/,
          alias: "property"
        },
        hexnumber: {
          pattern: /#?\$[\da-f]{2,4}\b/i,
          alias: "string"
        },
        binarynumber: {
          pattern: /#?%[01]+\b/,
          alias: "string"
        },
        decimalnumber: {
          pattern: /#?\b\d+\b/,
          alias: "string"
        },
        register: {
          pattern: /\b[xya]\b/i,
          alias: "variable"
        }
      };
    }
  }
});

export {
  require_asm6502
};
//# sourceMappingURL=/build/_shared/chunk-XMXVXT3K.js.map
