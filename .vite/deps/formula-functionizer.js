//#region node_modules/formula-functionizer/build/module/lib/errors.enum.js
var FormulaError;
(function(FormulaError) {
	FormulaError["ERROR"] = "#ERROR!";
	FormulaError["DIV_ZERO"] = "#DIV/0!";
	FormulaError["NAME"] = "#NAME?";
	FormulaError["NOT_AVAILABLE"] = "#N/A";
	FormulaError["NULL"] = "#NULL!";
	FormulaError["NUM"] = "#NUM!";
	FormulaError["VALUE"] = "#VALUE!";
})(FormulaError || (FormulaError = {}));
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/grammar-parser/grammar-parser.js
var o = function(k, v, o, l) {
	for (o = o || {}, l = k.length; l--; o[k[l]] = v);
	return o;
}, $V0 = [1, 5], $V1 = [1, 8], $V2 = [1, 6], $V3 = [1, 7], $V4 = [1, 9], $V5 = [1, 10], $V6 = [1, 12], $V7 = [1, 13], $V8 = [1, 14], $V9 = [1, 16], $Va = [1, 17], $Vb = [1, 18], $Vc = [1, 19], $Vd = [1, 20], $Ve = [1, 21], $Vf = [1, 22], $Vg = [1, 23], $Vh = [1, 24], $Vi = [1, 25], $Vj = [
	5,
	9,
	10,
	11,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	24,
	25,
	26
], $Vk = [
	5,
	9,
	10,
	11,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	24,
	25,
	26,
	28
], $Vl = [
	5,
	9,
	10,
	11,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	24,
	25,
	26,
	30
], $Vm = [
	5,
	10,
	11,
	13,
	14,
	15,
	16,
	17,
	24,
	25,
	26
], $Vn = [1, 54], $Vo = [1, 55], $Vp = [
	13,
	24,
	25,
	26
], $Vq = [
	5,
	10,
	13,
	14,
	15,
	16,
	24,
	25,
	26
], $Vr = [
	5,
	10,
	11,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	24,
	25,
	26
];
var parser = {
	trace: function trace() {},
	yy: {},
	symbols_: {
		"error": 2,
		"expressions": 3,
		"expression": 4,
		"EOF": 5,
		"variableSequence": 6,
		"number": 7,
		"STRING": 8,
		"&": 9,
		"=": 10,
		"+": 11,
		"(": 12,
		")": 13,
		"<": 14,
		">": 15,
		"NOT": 16,
		"-": 17,
		"*": 18,
		"/": 19,
		"^": 20,
		"FUNCTION": 21,
		"expseq": 22,
		"[": 23,
		"]": 24,
		";": 25,
		",": 26,
		"VARIABLE": 27,
		"DECIMAL": 28,
		"NUMBER": 29,
		"%": 30,
		"ERROR": 31,
		"$accept": 0,
		"$end": 1
	},
	terminals_: {
		5: "EOF",
		8: "STRING",
		9: "&",
		10: "=",
		11: "+",
		12: "(",
		13: ")",
		14: "<",
		15: ">",
		16: "NOT",
		17: "-",
		18: "*",
		19: "/",
		20: "^",
		21: "FUNCTION",
		23: "[",
		24: "]",
		25: ";",
		26: ",",
		27: "VARIABLE",
		28: "DECIMAL",
		29: "NUMBER",
		30: "%",
		31: "ERROR"
	},
	productions_: [
		0,
		[3, 2],
		[4, 1],
		[4, 1],
		[4, 1],
		[4, 3],
		[4, 3],
		[4, 3],
		[4, 3],
		[4, 4],
		[4, 4],
		[4, 4],
		[4, 3],
		[4, 3],
		[4, 3],
		[4, 3],
		[4, 3],
		[4, 3],
		[4, 3],
		[4, 2],
		[4, 2],
		[4, 3],
		[4, 4],
		[4, 3],
		[4, 1],
		[4, 2],
		[22, 1],
		[22, 3],
		[22, 3],
		[6, 1],
		[6, 3],
		[7, 1],
		[7, 3],
		[7, 2],
		[2, 1]
	],
	performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
		var $0 = $$.length - 1;
		switch (yystate) {
			case 1: return function(d) {
				if (d === void 0) d = {};
				try {
					return $$[$0 - 1](d);
				} catch (e) {
					return e.message;
				}
			};
			case 2:
				this.$ = function(d) {
					return d[$$[$0][0]];
				};
				break;
			case 3:
				this.$ = function(d) {
					return Number($$[$0]);
				};
				break;
			case 4:
				this.$ = function(d) {
					return yy.trimEdges($$[$0]);
				};
				break;
			case 5:
				this.$ = function(d) {
					return yy.operate("&", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 6:
				this.$ = function(d) {
					return yy.operate("=", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 7:
				this.$ = function(d) {
					return yy.operate("+", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 8:
				this.$ = $$[$0 - 1];
				break;
			case 9:
				this.$ = function(d) {
					return yy.operate("<=", $$[$0 - 3](d), $$[$0](d));
				};
				break;
			case 10:
				this.$ = function(d) {
					return yy.operate(">=", $$[$0 - 3](d), $$[$0](d));
				};
				break;
			case 11:
				this.$ = function(d) {
					return yy.operate("<>", $$[$0 - 3](d), $$[$0](d));
				};
				break;
			case 12:
				this.$ = function(d) {
					return yy.operate("NOT", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 13:
				this.$ = function(d) {
					return yy.operate(">", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 14:
				this.$ = function(d) {
					return yy.operate("<", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 15:
				this.$ = function(d) {
					return yy.operate("-", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 16:
				this.$ = function(d) {
					return yy.operate("*", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 17:
				this.$ = function(d) {
					return yy.operate("/", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 18:
				this.$ = function(d) {
					return yy.operate("^", $$[$0 - 2](d), $$[$0](d));
				};
				break;
			case 19:
				this.$ = function(d) {
					var opposite = yy.oppositeNumber($$[$0](d));
					if (isNaN(opposite)) return 0;
					return opposite;
				};
				break;
			case 20:
				this.$ = function(d) {
					var asNumber = Number($$[$0](d));
					if (isNaN(asNumber)) return 0;
					return asNumber;
				};
				break;
			case 21:
				yy.checkFunctionExistence($$[$0 - 2]);
				this.$ = function(d) {
					return yy.callFunction($$[$0 - 2]);
				};
				break;
			case 22:
				yy.checkFunctionExistence($$[$0 - 3]);
				this.$ = function(d) {
					return yy.callFunction($$[$0 - 3], $$[$0 - 1](d));
				};
				break;
			case 23:
				this.$ = function(d) {
					return $$[$0 - 1](d);
				};
				break;
			case 26:
				this.$ = function(d) {
					return [$$[$0](d)];
				};
				break;
			case 27:
			case 28:
				this.$ = function(d) {
					var tab = $$[$0 - 2](d);
					tab.push($$[$0](d));
					return tab;
				};
				break;
			case 29:
				this.$ = [$$[$0]];
				break;
			case 30:
				this.$ = Array.isArray($$[$0 - 2]) ? $$[$0 - 2] : [$$[$0 - 2]];
				this.$.push($$[$0]);
				break;
			case 31:
				this.$ = $$[$0];
				break;
			case 32:
				this.$ = ($$[$0 - 2] + "." + $$[$0]) * 1;
				break;
			case 33:
				this.$ = $$[$0 - 1] * .01;
				break;
			case 34:
				this.$ = yy.throwFormulaError($$[$0]);
				break;
		}
	},
	table: [
		{
			2: 11,
			3: 1,
			4: 2,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{ 1: [3] },
		{
			5: [1, 15],
			9: $V9,
			10: $Va,
			11: $Vb,
			14: $Vc,
			15: $Vd,
			16: $Ve,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		},
		o($Vj, [2, 2], { 28: [1, 26] }),
		o($Vj, [2, 3], { 30: [1, 27] }),
		o($Vj, [2, 4]),
		{
			2: 11,
			4: 28,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 29,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 30,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{ 12: [1, 31] },
		{
			2: 11,
			4: 33,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			22: 32,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		o($Vj, [2, 24], {
			2: 34,
			31: $V8
		}),
		o($Vk, [2, 29]),
		o($Vl, [2, 31], { 28: [1, 35] }),
		o([
			5,
			9,
			10,
			11,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			20,
			24,
			25,
			26,
			31
		], [2, 34]),
		{ 1: [2, 1] },
		{
			2: 11,
			4: 36,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 37,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 38,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 41,
			6: 3,
			7: 4,
			8: $V0,
			10: [1, 39],
			11: $V1,
			12: $V2,
			15: [1, 40],
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 43,
			6: 3,
			7: 4,
			8: $V0,
			10: [1, 42],
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 44,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 45,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 46,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 47,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 48,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{ 27: [1, 49] },
		o($Vl, [2, 33]),
		{
			9: $V9,
			10: $Va,
			11: $Vb,
			13: [1, 50],
			14: $Vc,
			15: $Vd,
			16: $Ve,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		},
		o($Vm, [2, 19], {
			9: $V9,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vm, [2, 20], {
			9: $V9,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		{
			2: 11,
			4: 33,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			13: [1, 51],
			17: $V3,
			21: $V4,
			22: 52,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			24: [1, 53],
			25: $Vn,
			26: $Vo
		},
		o($Vp, [2, 26], {
			9: $V9,
			10: $Va,
			11: $Vb,
			14: $Vc,
			15: $Vd,
			16: $Ve,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vj, [2, 25]),
		{ 29: [1, 56] },
		o($Vj, [2, 5]),
		o([
			5,
			10,
			13,
			24,
			25,
			26
		], [2, 6], {
			9: $V9,
			11: $Vb,
			14: $Vc,
			15: $Vd,
			16: $Ve,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vm, [2, 7], {
			9: $V9,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		{
			2: 11,
			4: 57,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 58,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		o($Vq, [2, 14], {
			9: $V9,
			11: $Vb,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		{
			2: 11,
			4: 59,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		o($Vq, [2, 13], {
			9: $V9,
			11: $Vb,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o([
			5,
			10,
			13,
			16,
			24,
			25,
			26
		], [2, 12], {
			9: $V9,
			11: $Vb,
			14: $Vc,
			15: $Vd,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vm, [2, 15], {
			9: $V9,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vr, [2, 16], {
			9: $V9,
			20: $Vi
		}),
		o($Vr, [2, 17], {
			9: $V9,
			20: $Vi
		}),
		o([
			5,
			10,
			11,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			20,
			24,
			25,
			26
		], [2, 18], { 9: $V9 }),
		o($Vk, [2, 30]),
		o($Vj, [2, 8]),
		o($Vj, [2, 21]),
		{
			13: [1, 60],
			25: $Vn,
			26: $Vo
		},
		o($Vj, [2, 23]),
		{
			2: 11,
			4: 61,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		{
			2: 11,
			4: 62,
			6: 3,
			7: 4,
			8: $V0,
			11: $V1,
			12: $V2,
			17: $V3,
			21: $V4,
			23: $V5,
			27: $V6,
			29: $V7,
			31: $V8
		},
		o($Vl, [2, 32]),
		o($Vq, [2, 9], {
			9: $V9,
			11: $Vb,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vq, [2, 11], {
			9: $V9,
			11: $Vb,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vq, [2, 10], {
			9: $V9,
			11: $Vb,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vj, [2, 22]),
		o($Vp, [2, 27], {
			9: $V9,
			10: $Va,
			11: $Vb,
			14: $Vc,
			15: $Vd,
			16: $Ve,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		}),
		o($Vp, [2, 28], {
			9: $V9,
			10: $Va,
			11: $Vb,
			14: $Vc,
			15: $Vd,
			16: $Ve,
			17: $Vf,
			18: $Vg,
			19: $Vh,
			20: $Vi
		})
	],
	defaultActions: { 15: [2, 1] },
	parseError: function parseError(str, hash) {
		if (hash.recoverable) this.trace(str);
		else {
			var error = new Error(str);
			error.hash = hash;
			throw error;
		}
	},
	parse: function parse(input) {
		var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
		var args = lstack.slice.call(arguments, 1);
		var lexer = Object.create(this.lexer);
		var sharedState = { yy: {} };
		for (var k in this.yy) if (Object.prototype.hasOwnProperty.call(this.yy, k)) sharedState.yy[k] = this.yy[k];
		lexer.setInput(input, sharedState.yy);
		sharedState.yy.lexer = lexer;
		sharedState.yy.parser = this;
		if (typeof lexer.yylloc == "undefined") lexer.yylloc = {};
		var yyloc = lexer.yylloc;
		lstack.push(yyloc);
		var ranges = lexer.options && lexer.options.ranges;
		if (typeof sharedState.yy.parseError === "function") this.parseError = sharedState.yy.parseError;
		else this.parseError = Object.getPrototypeOf(this).parseError;
		function popStack(n) {
			stack.length = stack.length - 2 * n;
			vstack.length = vstack.length - n;
			lstack.length = lstack.length - n;
		}
		var lex = function() {
			var token = lexer.lex() || EOF;
			if (typeof token !== "number") token = self.symbols_[token] || token;
			return token;
		}, symbol, preErrorSymbol, state, action, r, yyval = {}, p, len, newState, expected;
		while (true) {
			state = stack[stack.length - 1];
			if (this.defaultActions[state]) action = this.defaultActions[state];
			else {
				if (symbol === null || typeof symbol == "undefined") symbol = lex();
				action = table[state] && table[state][symbol];
			}
			_handle_error: if (typeof action === "undefined" || !action.length || !action[0]) {
				var error_rule_depth;
				var errStr = "";
				function locateNearestErrorRecoveryRule(state) {
					var stack_probe = stack.length - 1;
					var depth = 0;
					for (;;) {
						if (TERROR.toString() in table[state]) return depth;
						if (state === 0 || stack_probe < 2) return false;
						stack_probe -= 2;
						state = stack[stack_probe];
						++depth;
					}
				}
				if (!recovering) {
					error_rule_depth = locateNearestErrorRecoveryRule(state);
					expected = [];
					for (p in table[state]) if (this.terminals_[p] && p > TERROR) expected.push("'" + this.terminals_[p] + "'");
					if (lexer.showPosition) errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
					else errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
					this.parseError(errStr, {
						text: lexer.match,
						token: this.terminals_[symbol] || symbol,
						line: lexer.yylineno,
						loc: yyloc,
						expected,
						recoverable: error_rule_depth !== false
					});
				} else if (preErrorSymbol !== EOF) error_rule_depth = locateNearestErrorRecoveryRule(state);
				if (recovering == 3) {
					if (symbol === EOF || preErrorSymbol === EOF) throw new Error(errStr || "Parsing halted while starting to recover from another error.");
					yyleng = lexer.yyleng;
					yytext = lexer.yytext;
					yylineno = lexer.yylineno;
					yyloc = lexer.yylloc;
					symbol = lex();
				}
				if (error_rule_depth === false) throw new Error(errStr || "Parsing halted. No suitable error recovery rule available.");
				popStack(error_rule_depth);
				preErrorSymbol = symbol == TERROR ? null : symbol;
				symbol = TERROR;
				state = stack[stack.length - 1];
				action = table[state] && table[state][TERROR];
				recovering = 3;
			}
			if (action[0] instanceof Array && action.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
			switch (action[0]) {
				case 1:
					stack.push(symbol);
					vstack.push(lexer.yytext);
					lstack.push(lexer.yylloc);
					stack.push(action[1]);
					symbol = null;
					if (!preErrorSymbol) {
						yyleng = lexer.yyleng;
						yytext = lexer.yytext;
						yylineno = lexer.yylineno;
						yyloc = lexer.yylloc;
						if (recovering > 0) recovering--;
					} else {
						symbol = preErrorSymbol;
						preErrorSymbol = null;
					}
					break;
				case 2:
					len = this.productions_[action[1]][1];
					yyval.$ = vstack[vstack.length - len];
					yyval._$ = {
						first_line: lstack[lstack.length - (len || 1)].first_line,
						last_line: lstack[lstack.length - 1].last_line,
						first_column: lstack[lstack.length - (len || 1)].first_column,
						last_column: lstack[lstack.length - 1].last_column
					};
					if (ranges) yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
					r = this.performAction.apply(yyval, [
						yytext,
						yyleng,
						yylineno,
						sharedState.yy,
						action[1],
						vstack,
						lstack
					].concat(args));
					if (typeof r !== "undefined") return r;
					if (len) {
						stack = stack.slice(0, -1 * len * 2);
						vstack = vstack.slice(0, -1 * len);
						lstack = lstack.slice(0, -1 * len);
					}
					stack.push(this.productions_[action[1]][0]);
					vstack.push(yyval.$);
					lstack.push(yyval._$);
					newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
					stack.push(newState);
					break;
				case 3: return true;
			}
		}
		return true;
	}
};
parser.lexer = (function() {
	return {
		EOF: 1,
		parseError: function parseError(str, hash) {
			if (this.yy.parser) this.yy.parser.parseError(str, hash);
			else throw new Error(str);
		},
		setInput: function(input, yy) {
			this.yy = yy || this.yy || {};
			this._input = input;
			this._more = this._backtrack = this.done = false;
			this.yylineno = this.yyleng = 0;
			this.yytext = this.matched = this.match = "";
			this.conditionStack = ["INITIAL"];
			this.yylloc = {
				first_line: 1,
				first_column: 0,
				last_line: 1,
				last_column: 0
			};
			if (this.options.ranges) this.yylloc.range = [0, 0];
			this.offset = 0;
			return this;
		},
		input: function() {
			var ch = this._input[0];
			this.yytext += ch;
			this.yyleng++;
			this.offset++;
			this.match += ch;
			this.matched += ch;
			if (ch.match(/(?:\r\n?|\n).*/g)) {
				this.yylineno++;
				this.yylloc.last_line++;
			} else this.yylloc.last_column++;
			if (this.options.ranges) this.yylloc.range[1]++;
			this._input = this._input.slice(1);
			return ch;
		},
		unput: function(ch) {
			var len = ch.length;
			var lines = ch.split(/(?:\r\n?|\n)/g);
			this._input = ch + this._input;
			this.yytext = this.yytext.substr(0, this.yytext.length - len);
			this.offset -= len;
			var oldLines = this.match.split(/(?:\r\n?|\n)/g);
			this.match = this.match.substr(0, this.match.length - 1);
			this.matched = this.matched.substr(0, this.matched.length - 1);
			if (lines.length - 1) this.yylineno -= lines.length - 1;
			var r = this.yylloc.range;
			this.yylloc = {
				first_line: this.yylloc.first_line,
				last_line: this.yylineno + 1,
				first_column: this.yylloc.first_column,
				last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
			};
			if (this.options.ranges) this.yylloc.range = [r[0], r[0] + this.yyleng - len];
			this.yyleng = this.yytext.length;
			return this;
		},
		more: function() {
			this._more = true;
			return this;
		},
		reject: function() {
			if (this.options.backtrack_lexer) this._backtrack = true;
			else return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
				text: "",
				token: null,
				line: this.yylineno
			});
			return this;
		},
		less: function(n) {
			this.unput(this.match.slice(n));
		},
		pastInput: function() {
			var past = this.matched.substr(0, this.matched.length - this.match.length);
			return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
		},
		upcomingInput: function() {
			var next = this.match;
			if (next.length < 20) next += this._input.substr(0, 20 - next.length);
			return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
		},
		showPosition: function() {
			var pre = this.pastInput();
			var c = new Array(pre.length + 1).join("-");
			return pre + this.upcomingInput() + "\n" + c + "^";
		},
		test_match: function(match, indexed_rule) {
			var token, lines, backup;
			if (this.options.backtrack_lexer) {
				backup = {
					yylineno: this.yylineno,
					yylloc: {
						first_line: this.yylloc.first_line,
						last_line: this.last_line,
						first_column: this.yylloc.first_column,
						last_column: this.yylloc.last_column
					},
					yytext: this.yytext,
					match: this.match,
					matches: this.matches,
					matched: this.matched,
					yyleng: this.yyleng,
					offset: this.offset,
					_more: this._more,
					_input: this._input,
					yy: this.yy,
					conditionStack: this.conditionStack.slice(0),
					done: this.done
				};
				if (this.options.ranges) backup.yylloc.range = this.yylloc.range.slice(0);
			}
			lines = match[0].match(/(?:\r\n?|\n).*/g);
			if (lines) this.yylineno += lines.length;
			this.yylloc = {
				first_line: this.yylloc.last_line,
				last_line: this.yylineno + 1,
				first_column: this.yylloc.last_column,
				last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
			};
			this.yytext += match[0];
			this.match += match[0];
			this.matches = match;
			this.yyleng = this.yytext.length;
			if (this.options.ranges) this.yylloc.range = [this.offset, this.offset += this.yyleng];
			this._more = false;
			this._backtrack = false;
			this._input = this._input.slice(match[0].length);
			this.matched += match[0];
			token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
			if (this.done && this._input) this.done = false;
			if (token) return token;
			else if (this._backtrack) {
				for (var k in backup) this[k] = backup[k];
				return false;
			}
			return false;
		},
		next: function() {
			if (this.done) return this.EOF;
			if (!this._input) this.done = true;
			var token, match, tempMatch, index;
			if (!this._more) {
				this.yytext = "";
				this.match = "";
			}
			var rules = this._currentRules();
			for (var i = 0; i < rules.length; i++) {
				tempMatch = this._input.match(this.rules[rules[i]]);
				if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
					match = tempMatch;
					index = i;
					if (this.options.backtrack_lexer) {
						token = this.test_match(tempMatch, rules[i]);
						if (token !== false) return token;
						else if (this._backtrack) {
							match = false;
							continue;
						} else return false;
					} else if (!this.options.flex) break;
				}
			}
			if (match) {
				token = this.test_match(match, rules[index]);
				if (token !== false) return token;
				return false;
			}
			if (this._input === "") return this.EOF;
			else return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
				text: "",
				token: null,
				line: this.yylineno
			});
		},
		lex: function lex() {
			var r = this.next();
			if (r) return r;
			else return this.lex();
		},
		begin: function begin(condition) {
			this.conditionStack.push(condition);
		},
		popState: function popState() {
			if (this.conditionStack.length - 1 > 0) return this.conditionStack.pop();
			else return this.conditionStack[0];
		},
		_currentRules: function _currentRules() {
			if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
			else return this.conditions["INITIAL"].rules;
		},
		topState: function topState(n) {
			n = this.conditionStack.length - 1 - Math.abs(n || 0);
			if (n >= 0) return this.conditionStack[n];
			else return "INITIAL";
		},
		pushState: function pushState(condition) {
			this.begin(condition);
		},
		stateStackSize: function stateStackSize() {
			return this.conditionStack.length;
		},
		options: {},
		performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
			switch ($avoiding_name_collisions) {
				case 0: break;
				case 1: return 8;
				case 2: return 8;
				case 3: return 21;
				case 4: return 31;
				case 5: return 21;
				case 6: return 27;
				case 7: return 27;
				case 8: return 29;
				case 9: return 9;
				case 10: return " ";
				case 11: return 28;
				case 12: return ":";
				case 13: return 25;
				case 14: return 26;
				case 15: return 18;
				case 16: return 19;
				case 17: return 17;
				case 18: return 11;
				case 19: return 20;
				case 20: return 12;
				case 21: return 13;
				case 22: return 23;
				case 23: return 24;
				case 24: return 15;
				case 25: return 14;
				case 26: return 16;
				case 27: return "\"";
				case 28: return "'";
				case 29: return "!";
				case 30: return 10;
				case 31: return 30;
				case 32: return "#";
				case 33: return 5;
			}
		},
		rules: [
			/^(?:\s+)/,
			/^(?:"(\\["]|[^"])*")/,
			/^(?:'(\\[']|[^'])*')/,
			/^(?:[A-Za-z]{1,}[A-Za-z_0-9\.]+(?=[(]))/,
			/^(?:#[A-Z0-9\/]+(!|\?)?)/,
			/^(?:[A-Za-z\.]+(?=[(]))/,
			/^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/,
			/^(?:[A-Za-z_]+)/,
			/^(?:[0-9]+)/,
			/^(?:&)/,
			/^(?: )/,
			/^(?:[.])/,
			/^(?::)/,
			/^(?:;)/,
			/^(?:,)/,
			/^(?:\*)/,
			/^(?:\/)/,
			/^(?:-)/,
			/^(?:\+)/,
			/^(?:\^)/,
			/^(?:\()/,
			/^(?:\))/,
			/^(?:\[)/,
			/^(?:\])/,
			/^(?:>)/,
			/^(?:<)/,
			/^(?:NOT\b)/,
			/^(?:")/,
			/^(?:')/,
			/^(?:!)/,
			/^(?:=)/,
			/^(?:%)/,
			/^(?:[#])/,
			/^(?:$)/
		],
		conditions: { "INITIAL": {
			"rules": [
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15,
				16,
				17,
				18,
				19,
				20,
				21,
				22,
				23,
				24,
				25,
				26,
				27,
				28,
				29,
				30,
				31,
				32,
				33
			],
			"inclusive": true
		} }
	};
})();
function Parser$1() {
	this.yy = {};
}
Parser$1.prototype = parser;
parser.Parser = Parser$1;
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/concatenate.js
var concatenate = function(a, b) {
	return String(a) + String(b);
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/utils.functions.js
function trimEdges(text) {
	return text.substring(1, text.length - 1);
}
function oppositeNumber(value) {
	return -1 * value;
}
function throwFormulaError(type) {
	if (Object.values(FormulaError).includes(type)) throw new Error(type);
	else throw new Error(FormulaError.ERROR);
}
function callFunction(functions, functionName, args) {
	return functions[functionName].apply(functions, args);
}
function checkFunctionExistence(functions, functionName) {
	if (!functions[functionName]) throwFormulaError(FormulaError.NAME);
}
var excelComparisonTypePriority = {
	number: 1,
	string: 2,
	boolean: 3,
	undefined: 4
};
function excelifyComparison(javascriptComparisonFunction) {
	return function(a, b) {
		var typeOfA = typeof a;
		var typeOfB = typeof b;
		if (typeOfA === "object" || typeOfA === "undefined") {
			typeOfA = "undefined";
			a = null;
		}
		if (typeOfB === "object" || typeOfB === "undefined") {
			typeOfB = "undefined";
			b = null;
		}
		if (typeOfA === typeOfB) {
			if (typeOfA === "string") {
				a = a.toLowerCase();
				b = b.toLowerCase();
			}
			return javascriptComparisonFunction(a, b);
		} else return excelComparisonTypePriority[typeOfA] < excelComparisonTypePriority[typeOfB];
	};
}
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/divided-by.js
var excelDividedBy = function(a, b) {
	a = Number(a);
	b = Number(b);
	if (isNaN(a) || isNaN(b)) throwFormulaError(FormulaError.VALUE);
	if (b === 0) throwFormulaError(FormulaError.DIV_ZERO);
	return a / b;
};
var javascriptDividedBy = function(a, b) {
	return a / b;
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/equal.js
var equal = function(a, b) {
	return a === b;
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/greater-than.js
var javascriptGreaterThan = function(a, b) {
	return a > b;
};
var excelGreaterThan = excelifyComparison(javascriptGreaterThan);
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/greater-than-or-equal.js
var javascriptGreaterThanOrEqual = function(a, b) {
	return a >= b;
};
var excelGreaterThanOrEqual = excelifyComparison(javascriptGreaterThanOrEqual);
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/less-than.js
var javascriptLessThan = function(a, b) {
	return a < b;
};
var excelLessThan = excelifyComparison(javascriptLessThan);
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/less-than-or-equal.js
var javascriptLessThanOrEqual = function(a, b) {
	return a <= b;
};
var excelLessThanOrEqual = excelifyComparison(javascriptLessThanOrEqual);
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/minus.js
var excelMinus = function(a, b) {
	a = Number(a);
	b = Number(b);
	if (isNaN(a) || isNaN(b)) throwFormulaError(FormulaError.VALUE);
	return a - b;
};
var javascriptMinus = function(a, b) {
	return a - b;
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/not-equal.js
var notEqual = function(a, b) {
	return a !== b;
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/plus.js
var excelPlus = function(a, b) {
	a = Number(a);
	b = Number(b);
	if (isNaN(a) || isNaN(b)) throwFormulaError(FormulaError.VALUE);
	return a + b;
};
var javascriptPlus = function(a, b) {
	return a + b;
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/power.js
var excelPower = function(a, b) {
	a = Number(a);
	b = Number(b);
	var result = Math.pow(a, b);
	if (isNaN(result)) throwFormulaError(FormulaError.VALUE);
	return result;
};
var javascriptPower = function(a, b) {
	return Math.pow(a, b);
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operators/times.js
var excelTimes = function(a, b) {
	a = Number(a);
	b = Number(b);
	if (isNaN(a) || isNaN(b)) throwFormulaError(FormulaError.VALUE);
	return a * b;
};
var javascriptTimes = function(a, b) {
	return a * b;
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/operate/operate.js
var _a, _b;
var Operator;
(function(Operator) {
	Operator["PLUS"] = "+";
	Operator["MINUS"] = "-";
	Operator["TIMES"] = "*";
	Operator["DIVIDED_BY"] = "/";
	Operator["EQUAL"] = "=";
	Operator["NOT_EQUAL"] = "<>";
	Operator["GREATER_THAN"] = ">";
	Operator["GREATER_THAN_OR_EQUAL"] = ">=";
	Operator["LESS_THAN"] = "<";
	Operator["LESS_THAN_OR_EQUAL"] = "<=";
	Operator["POWER"] = "^";
	Operator["CONCATENATE"] = "&";
})(Operator || (Operator = {}));
var safeOperators = (_a = {}, _a[Operator.PLUS] = excelPlus, _a[Operator.MINUS] = excelMinus, _a[Operator.TIMES] = excelTimes, _a[Operator.DIVIDED_BY] = excelDividedBy, _a[Operator.EQUAL] = equal, _a[Operator.NOT_EQUAL] = notEqual, _a[Operator.GREATER_THAN] = excelGreaterThan, _a[Operator.GREATER_THAN_OR_EQUAL] = excelGreaterThanOrEqual, _a[Operator.LESS_THAN] = excelLessThan, _a[Operator.LESS_THAN_OR_EQUAL] = excelLessThanOrEqual, _a[Operator.POWER] = excelPower, _a[Operator.CONCATENATE] = concatenate, _a);
var javascriptOperators = (_b = {}, _b[Operator.PLUS] = javascriptPlus, _b[Operator.MINUS] = javascriptMinus, _b[Operator.TIMES] = javascriptTimes, _b[Operator.DIVIDED_BY] = javascriptDividedBy, _b[Operator.EQUAL] = equal, _b[Operator.NOT_EQUAL] = notEqual, _b[Operator.GREATER_THAN] = javascriptGreaterThan, _b[Operator.GREATER_THAN_OR_EQUAL] = javascriptGreaterThanOrEqual, _b[Operator.LESS_THAN] = javascriptLessThan, _b[Operator.LESS_THAN_OR_EQUAL] = javascriptGreaterThanOrEqual, _b[Operator.POWER] = javascriptPower, _b[Operator.CONCATENATE] = concatenate, _b);
function operateExcely(operator, firstOperand, secondOperand) {
	return safeOperators[operator](firstOperand, secondOperand);
}
function operateJavascriptly(operator, firstOperand, secondOperand) {
	return javascriptOperators[operator](firstOperand, secondOperand);
}
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/options.js
var defaultOptions = {
	operators: "excel",
	functions: {}
};
//#endregion
//#region node_modules/formula-functionizer/build/module/lib/parser.class.js
var __assign = function() {
	__assign = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
var Parser = function() {
	function Parser(userOptions) {
		if (userOptions === void 0) userOptions = {};
		var options = __assign(__assign({}, defaultOptions), userOptions);
		this.grammarParser = new Parser$1();
		this.grammarParser.yy = {
			oppositeNumber,
			trimEdges,
			operate: options.operators === "excel" ? operateExcely : operateJavascriptly,
			throwFormulaError,
			callFunction: function(functionName, args) {
				return callFunction(options.functions, functionName, args);
			},
			checkFunctionExistence: function(functionName) {
				return checkFunctionExistence(options.functions, functionName);
			}
		};
	}
	Parser.prototype.parse = function(formula) {
		try {
			return this.grammarParser.parse(formula);
		} catch (e) {
			if (Object.values(FormulaError).includes(e.message)) return function() {
				return e.message;
			};
			else return function() {
				return FormulaError.ERROR;
			};
		}
	};
	return Parser;
}();
//#endregion
export { FormulaError, Parser, defaultOptions };

//# sourceMappingURL=formula-functionizer.js.map