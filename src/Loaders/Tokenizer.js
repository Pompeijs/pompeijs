
export default class Tokenizer {
	static get TokenType () {
		return {
			IDENTIFIER: 1,

			UNKNOWN: 2,
			END_OF_INPUT: 3
		}	
	}

	constructor(toParse) {
		this._toParse = toParse;
		this._maxPos = toParse.length;
		
		this._pos = 0;
	
		this.currentToken = Tokenizer.TokenType.UNKNOWN;
		this.currentIdentifier = "";
		this.currentString = "";
		this.isLetterOrDigitPattern = /^[a-zA-Z0-9]+$/;
	}

	getNextToken() {
		if (this.isEnd()) return Tokenizer.TokenType.END_OF_INPUT;

		this.currentString = this.read();
		this.currentToken = Tokenizer.TokenType.UNKNOWN;

		// Identifier
		if (this.currentString === "_" || this.isLetterOrDigitPattern.test(this.currentString)) {
			this.currentToken = Tokenizer.TokenType.IDENTIFIER;
			this.currentIdentifier = this.currentString;
			while (!this.isEnd() && (this.isLetterOrDigitPattern.test(this.currentString = this.peek()) || this.currentString === "_")) {
				this.currentIdentifier += this.currentString;
				this.forward();
			}
		}

		return this.currentToken;
	}

	peek() {
		return this._toParse[this._pos];
	}

	read() {
		return this._toParse[this._pos++];
	}

	forward() {
		this._pos++;
	}

	isEnd() {
		return this._pos >= this._maxPos;
	}
}