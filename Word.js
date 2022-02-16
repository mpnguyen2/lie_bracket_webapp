// Helper methods: 
function cancel2Char(src, i){
	dest = [];
	for (var j = 0; j < i; j++)
		dest[j] = src[j];
	for (var j = i; j < src.length - 2; j++)
		dest[j] = src[j+2];
	return dest;
}
function trim2Ends(src){
	dest = [];
	for (var j = 1; j < src.length - 1; j++)
		dest[j - 1] = src[j];
	return dest;
}

// Function to find the minimum equivalent class of a reduced cyclic word rc.
function minReduceCyclic(rc){
	var min = rc.clone();
	var W = new Word();
	for (var i = 0; i < rc.word.length; i++){
		W = rc.permute(i);
		if (min.compareTo(W) > 0)
			min = W;
	}
	return min;
}

function canonical(W){
	W.reduce();
	W.toReduceCyclic();
	W = minReduceCyclic(W);
	return W;
}

// CLASS Word
function Word(){
	this.word = [];
	this.setWord = function(w){
		this.word = w;
	}
	this.setWordString = function(s){
	// a-z = 1-26 && A-Z = -1 - -26;
		for (var i = 0; i < s.length; i++){
			var c = s.charCodeAt(i);
			if (c >= 65 && c <= 90 )
				this.word[i] = -(c - 64);
			else if (c >= 97 && c < 122)
				this.word[i] = c - 96;
			else {
				this.word = []; return;
			}
		}
	}
	this.length = function(){ return this.word.length; }
}

Word.prototype.isReduce = function(){
	for(var i = 0; i < this.word.length - 1; i++)
		if (this.word[i] == -this.word[i+1])
			return false;
	return true;
}

Word.prototype.reduce = function(){
	var i = -2;	
	while(i != this.word.length - 1){
		if (this.word.length == 0)
			return;
		for(i = 0; i < this.word.length - 1; i++)
			if (this.word[i] == -this.word[i+1]){
				this.word = cancel2Char(this.word, i);	
				break;
			}
	}
	return;
}

Word.prototype.toReduceCyclic = function(){
	this.reduce();
	while(this.word[0] == -this.word[this.word.length - 1])
		this.word = trim2Ends(this.word);
	return;	
}
	
Word.prototype.toString = function(){
	var s = "";
	for (var i = 0; i < this.word.length; i++){
		if (this.word[i] < 0)
			s = s + String.fromCharCode(-this.word[i] + 64);
		else 
			s = s + String.fromCharCode(this.word[i] + 96);
	}
	return s;
}

Word.prototype.bar = function(){
	var r = new Word();
	var w = r.word;
	for (var j = 0; j < this.word.length; j++)
		w[j] = - this.word[this.word.length - 1 - j];
	return r;
}

Word.prototype.permute = function(i){
	var r = new Word();
	var w = r.word;
	for (var j = 0; j < this.word.length; j++)
		w[j] = this.word[(j + i) % this.word.length];
	return r;
}

Word.prototype.isEqual = function(W2){
	var w1 = this.word;
	var w2 = W2.word;
	if (w1.length != w2.length)
		return false;
	for (var i = 0; i < w1.length; i++)
		if (w1[i] != w2[i])
			return false;
	return true;
}

Word.prototype.compareTo = function(W2){
	var w1 = this.word;
	var w2 = W2.word;
	var l = Math.min(w1.length, w2.length);
	for (var i = 0; i < l; i++){
		if (w1[i] < w2[i])
			return -1;
		if (w1[i] > w2[i])
			return 1;
	}
	if (w1.length > w2.length)
		return 1;
	if (w1.length < w2.length)
		return -1;
	return 0;
}

Word.prototype.clone = function(){
	var r = new Word();
	w = r.word;
	for (var i = 0; i < this.word.length; i++)
		w[i] = this.word[i];
	return r;
}

Word.prototype.primitiveExp = function(){
	w = this.word; l = w.length;
	for(var i = 1; i <= l/2; i++){
		if (l % i == 0){
			found = true;
			test:
			for (var j = 0; j < l/i; j++)
				for (var t = 0; t < i; t++)
					if (w[t] != w[t + j * i]){
						found = false;
						break test;
					}
		}
		if (found)
			return l/i;
	}
	return 1;
}

// Need to debug
function concat(W1, W2){
	r = new Word();
	var w1 = W1.word;
	var w2 = W2.word;
	var w = []
	for (var i = 0; i < w1.length; i++)
		w[i] = w1[i];
	for (var i = 0; i < w2.length; i++)
		w[i + w1.length] = w2[i];
	r.setWord(w);
	return r;
}

// These are supposed to be surface word methods
// sw is a word and the order is a map, which
// maps characters in a word (1-k or (-1)-(-k)) to its order in the alphabet
function order(sw){
	var w = sw.word;
	var o = new Map();
	for (var i = 0; i < w.length; i++)
		o.set(w[i], i);
	return o;
}

function findCharPos(sw, c){
	for (var i = 0; i < sw.word.length; i++)
		if (sw.word[i] == c)
			return i;
}
		
	
	