function Brackets(){
	this.coefs = [];	
	this.terms = [];			// All terms here are supposed to be the canonicalization of a word (the minimum reduced cyclic word)
}

Brackets.prototype.add = function(coef, term){
	if (coef == 0)
		return;
	for (var j = 0; j < this.coefs.length; j++)
			if (this.terms[j].isEqual(term)){
				this.coefs[j] = this.coefs[j] + coef;
				if (this.coefs[j] == 0){
					this.coefs.splice(j, 1);
					this.terms.splice(j, 1);
				}
				return;
			}
	var l = this.coefs.length;
	this.coefs[l] = coef;
	this.terms[l] = new Word();
	this.terms[l] = term;
}

Brackets.prototype.toString = function(){
	s = "";
	if (this.coefs.length == 0)
		return 0;
	for (var i = 0; i < this.coefs.length; i++){
		var coef = this.coefs[i];
		if (coef < 0)
			s = s + " - ";
		else if (coef > 0 && i > 0)
			s = s + " + ";
		if (coef < 0) coef = -coef;
		if (coef == 1)
			s = s + this.terms[i].toString();
		else
			s = s + coef + this.terms[i].toString();
	}															
	return s;
}
	