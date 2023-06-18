function lexicalAnalyzer(terminal) {
    i = 0
    state = 0

    while (i < terminal.length) {
        switch (state) {
            case 0:
                if (terminal[i] === 'i') {
                    state = 1;
                }
                else if (terminal[i] === 'e') {
                    state = 2;
                }
                else if (terminal[i] === '=' || terminal[i] === '>' || terminal[i] === '<') {
                    state = 5;
                }
                else if (terminal[i] === "!") {
                    state = 6;
                }
                else if (terminal[i] === 'a' || terminal[i] === 'b' || terminal[i] === '(' || terminal[i] === ')' || terminal[i] === '{' || terminal[i] === '}' || terminal[i] === ';' || terminal[i] === '+' || terminal[i] === '-'|| terminal[i] === '%' || terminal[i] === '%' || terminal[i] === '/' || terminal[i] === '*') {
                    state = 99;
                } 
				else if (terminal[i] === 'c'){
                    state = 7;
                } 
				else if (terminal[i] === 'r'){
                    state = 12;
                } 
				else if (terminal[i] === 't'){
                    state = 17;
                } 
				else if (terminal[i] === 'f'){
                    state = 20;
                } 
                else {
                    state = -1;
                }
                break;
            
            case 1:
                if (terminal[i] === 'f') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;

            case 2:
                if (terminal[i] === 'l') {
                    state = 3;
                } else {
                    state = -1;
                }
                break;
            case 3:
                if (terminal[i] === 's') {
                    state = 4;
                } else {
                    state = -1;
                }
                break;
            case 4:
                if (terminal[i] === 'e') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;
            case 5:
                if (terminal[i] === '=') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;
			case 6:
                if (terminal[i] === '=') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;
            case 7:
                if (terminal[i] === 'o') {
                    state = 8;
                } else {
                    state = -1;
                }
                break;

            case 8:
                if (terminal[i] === 'u') {
                    state = 9;
                } else {
                    state = -1;
                }
                break;
            case 9:
                if (terminal[i] === 't') {
                    state = 10;
                } else {
                    state = -1;
                }
                break;
            case 10:
                if (terminal[i] === '<') {
                    state = 11;
                } else {
                    state = -1;
                }
                break;
			case 11:
                if (terminal[i] === '<') {
                    state = 99;
                } else {
                    state = -1;
                }
                break;
            case 12:
                if (terminal[i] === 'e') {
                    state = 13;
                } else {
                    state = -1;
                }
                break;

            case 13:
                if (terminal[i] === 't') {
                    state = 14;
                } else {
                    state = -1;
                }
                break;

            case 14:
                if (terminal[i] === 'u') {
                    state = 15;
                } else {
                    state = -1;
                }
                break;

            case 15:
                if (terminal[i] === 'r') {
                    state = 16;
                } else {
                    state = -1
                }
                break;
			case 16:
                if (terminal[i] === 'n') {
                    state = 99;
                } else {
                    state = -1
                }
                break;
			case 17:
                if (terminal[i] === 'r') {
                    state = 18;
                } else {
                    state = -1
                }
                break;
			case 18:
                if (terminal[i] === 'u') {
                    state = 19;
                } else {
                    state = -1
                }
                break;
			case 19:
                if (terminal[i] === 'e') {
                    state = 99;
                } else {
                    state = -1
                }
                break;
			case 20:
                if (terminal[i] === 'a') {
                    state = 21;
                } else {
                    state = -1
                }
                break;
			case 21:
                if (terminal[i] === 'l') {
                    state = 22;
                } else {
                    state = -1
                }
                break;
			case 22:
                if (terminal[i] === 's') {
                    state = 19;
                } else {
                    state = -1
                }
                break;
            case 99:
                state = -1;
                break;

            default:
                state = -1;
                break;
        }

        i++;
    }


    if (state === 5 || state === 99) {
        return true;
    }

    return false;
}

function parser(code) {
    let stack = [];
    
    let state = "i";
    stack.push("#");
    state = "p";
    stack.push("statement");
    state = "q";

    let head = 0;

    code.push("EOS");
    let symbol = code[head];

    let topOfStack = stack.at(-1);
    while (symbol !== "EOS" && state !== "error") {
        switch (topOfStack) {
            case "statement": 
                if (symbol === "if") {
                    stack.pop("statement")
                    stack.push("}");
                    stack.push(";");
                    stack.push("aksi");
                    stack.push("{");
                    stack.push("else");
                    stack.push("}");
                    stack.push(";");
                    stack.push("aksi");
                    stack.push("{");
                    stack.push(")");
                    stack.push("kondisi");
                    stack.push("(");
                    stack.push("if");
                }
                else {
                    state = "error";
                }
                break;
            case "kondisi": 
                if (symbol === "true") {
                    stack.pop("kondisi");
                    stack.push("true");
                }
                else if (symbol === "false"){
                    stack.pop("kondisi")
                    stack.push("false")
                }
                else if (symbol === "a" || symbol === "b") {
                    stack.pop("kondisi");
                    stack.push("variabel");
                    stack.push("comparator");
                    stack.push("variabel");
                }
                else {
                    state = "error"; 
                }
                break;
            case "aksi": 
                if (symbol === "a" || symbol === "b") {
                    stack.pop("aksi");
                    stack.push("variabel");
                    stack.push("operator");
                    stack.push("variabel")
                    stack.push("=");
                    stack.push("variabel");
                }
		        else if (symbol==="cout<<"){
		        stack.pop("aksi");
		        stack.push("variabel");
		        stack.push("cout<<");
		        }
                 else if (symbol==="return"){
		        stack.pop("aksi");
		        stack.push("variabel");
		        stack.push("return");
		        }
                else {
                    state = "error";
                }
                break;
            case "variabel":
                if (symbol === "a") {
                    stack.pop("variabel");
                    stack.push("a")
                } 
                else if (symbol === "b") {
                    stack.pop("variabel");
                    stack.push("b");
                }
                else {
                    state = "error";
                }
                break;
            case "comparator":
                if (symbol === "!=") {
                    stack.pop("comparator");
                    stack.push("!=");
                }
                else if (symbol === "==") {
                    stack.pop("comparator");
                    stack.push("==");
                }
                else if (symbol === ">") {
                    stack.pop("variabel");
                    stack.push(">");
                }
                else if (symbol === ">=") {
                    stack.pop("comparator");
                    stack.push(">=");
                }
                else if (symbol === "<") {
                    stack.pop("comparator");
                    stack.push("<");
                }
                else if (symbol === "<=") {
                    stack.pop("comparator");
                    stack.push("<=");
                }
                else {
                    state = "error";
                }
                break;
            case "operator":
                if (symbol === "+") {
                    stack.pop("operator");
                    stack.push("+");
                }
                else if (symbol === "-") {
                    stack.pop("operator");
                    stack.push("-");
                }
                else if (symbol === "*") {
                    stack.pop("operator");
                    stack.push("*");
                }
                else if (symbol === "/") {
                    stack.pop("operator");
                    stack.push("/");
                }
                else if (symbol === "%") {
                    stack.pop("operator");
                    stack.push("%");
                }
                else {
                    state = "error";
                }
                break;
            case "if":
                if (symbol === "if") {
                    stack.pop("if");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "(":
                if (symbol === "(") {
                    stack.pop("(");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
             case ")":
                if (symbol === ")") {
                    stack.pop(")");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
             case "{":
                if (symbol === "{") {
                    stack.pop("{");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "}":
                if (symbol === "}") {
                    stack.pop("}");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case ";":
                if (symbol === ";") {
                    stack.pop(";");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "return":
                if (symbol === "return") {
                    stack.pop("return");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "true":
                if (symbol === "true") {
                    stack.pop("true");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "false":
                if (symbol === "false") {
                    stack.pop("false");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "=":
                if (symbol === "=") {
                    stack.pop("=");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "a":
                if (symbol === "a") {
                    stack.pop("a");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "b":
                if (symbol === "b") {
                    stack.pop("b");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "==":
                if (symbol === "==") {
                    stack.pop("==");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "!=":
                if (symbol === "!=") {
                    stack.pop("!=");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case ">":
                if (symbol === ">") {
                    stack.pop(">");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case ">=":
                if (symbol === ">=") {
                    stack.pop(">=");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "<":
                if (symbol === "<") {
                    stack.pop("<");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "<=":
                if (symbol === "<=") {
                    stack.pop("<=");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "+":
                if (symbol === "+") {
                    stack.pop("+");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "-":
                if (symbol === "-") {
                    stack.pop("-");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "/":
                if (symbol === "/") {
                    stack.pop("/");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "%":
                if (symbol === "%") {
                    stack.pop("%");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "*":
                if (symbol === "*") {
                    stack.pop("*");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
	        case "cout<<":
                if (symbol === "cout<<") {
                    stack.pop("cout<<");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            case "else":
                if (symbol === "else") {
                    stack.pop("else");
                    head++;
                    symbol = code[head];
                } else {
                    state = "error";
                }
                break;
            default:
                state = "error";
                break;
        }

        topOfStack = stack.at(-1);

    }

    if (topOfStack === "#" && symbol === "EOS") {
        stack.pop("#");
        state = "f";
    }

    if (state !== "f") {
        return false;
    }

    return true;
}

const submitButton = document.getElementById("submit")

let lexAndPar = "";
let lex = "";
let el = "";
let code = "";

submitButton.addEventListener("click", () => {
    code = document.getElementById("code").value;
    let lexicalValid = true;
    let codeSplitted = code.split(/\s+/g)
    if (codeSplitted.at(-1) === '') {
        codeSplitted.pop('')
    }

    codeSplitted.forEach(item => {
        if (lexicalAnalyzer(item) === false) {
            lexicalValid = false;
        }
    })

    let parseValid = parser(codeSplitted);


    if (lexicalValid && parseValid) {
        lexAndPar = "Hasil Analisa Leksikal: Valid<br>Hasil parsing: Valid<br>Kode Anda sesuai ketentuan!<hr>";
        document.getElementById('output').innerHTML = lexAndPar;
        document.getElementById('output').classList.add('output-text');
    }
    else if (lexicalValid) {
        lex = "Hasil Analisa Leksikal: Valid<br>Hasil parsing: Tidak Valid<br>Silahkan cek aturan grammar<hr>";
        document.getElementById('output').innerHTML = lex;
        document.getElementById('output').classList.add('output-text');
    } else {
        el = 'Hasil Analisa Leksikal dan Parsing Tidak Valid<br>Cek kebenaran leksikal dan aturan grammar!<hr>';
        document.getElementById('output').innerHTML = el;
        document.getElementById('output').classList.add('output-text');
   
   
 }
    
})
