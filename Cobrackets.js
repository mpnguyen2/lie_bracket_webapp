function Cobrackets(){
	this.terms = [];		// n terms each term take 2 position (2 words) so this array have 2n positions in total
	this.coefs = [];
}

Cobrackets.prototype.addTerm = function(v1, v2, coef){
	l = this.terms.length/2;
	console.log(coef);
	if (coef == 0)
		return;
	for (var i = 0; i < l; i++){
		if (v1.isEqual(this.terms[2*i]) && v2.isEqual(this.terms[2*i+1])){
			console.log("HAHA");
			this.coefs[i] = this.coefs[i] + coef;
			if (this.coefs[i] == 0){
				this.terms.splice(2*i, 2);
				this.coefs.splice(i, 1);
			}
			return;
		}
		else if (v2.isEqual(this.terms[2*i]) && v1.isEqual(this.terms[2*i+1])){
			this.coefs[i] = this.coefs[i] - coef;
			if (this.coefs[i] == 0){
				this.terms.splice(2*i, 2);
				this.coefs.splice(i, 1);
			}
			return;
		}
	}
	this.terms[2*l] = v1;
	this.terms[2*l + 1] = v2;
	this.coefs[l] = coef;
}

Cobrackets.prototype.toString = function(){
	s = "";
	if (this.coefs.length == 0)
		return 0;
	for (var i = 0; i < this.coefs.length; i++){
		if (this.coefs[i] > 0 && i > 0)
			s = s + " + ";
		else if (this.coefs[i] < 0)
			s = s + " - ";
		
		if (Math.abs(this.coefs[i]) != 1)
			s = s + Math.abs(this.coefs[i]);
		
		s = s + "(" + this.terms[2*i] + " \u2297 " + this.terms[2*i+1] + 
				" - " + this.terms[2*i + 1] + " \u2297 " + this.terms[2*i] + ")";
	}
	return s;
}
		
