function Polynomial(){
	this.data = "";
	this.setData = function(str){
		this.data = str;
	}
	this.toString = function(){
		var s = this.data;	
		if (this.data.startsWith("x0y0z0"))
			s = s.replace("x0y0z0", "1");
		s = s.replace(/x0y0z0/g, "")
			.replace(/\s\+\s-/g, "</sup> - ").replace(/\s\+/g, "</sup> +")
			.replace(/x/g, "x<sup>").replace(/y/g, "</sup>y<sup>")
			.replace(/z/g, "</sup>z<sup>")
			.replace(/\s1x/g, " x").replace(/\s1y/g, " y").replace(/\s1z/g, " z");
		s += "</sup>";
		s = s.replace(/x<sup>0<\/sup>/g, "").replace(/y<sup>0<\/sup>/g, "")
			.replace(/z<sup>0<\/sup>/g, "")
			.replace(/x<sup>1<\/sup>/g, "x").replace(/y<sup>1<\/sup>/g, "y")
			.replace(/z<sup>1<\/sup>/g, "z");
		if (s.startsWith("1x"))
			s = s.replace("1x", "x");
		if (s.startsWith("1y"))
			s = s.replace("1y", "y");
		if (s.startsWith("1z"))
			s = s.replace("1z", "z");
		return s;
	}
}

function compareMonomial(m1, m2){
	m1s = m1.split(/[x|y|z]/g);
	m2s = m2.split(/[x|y|z]/g);
	if (m1s[3]< m2s[3])		return -1;
	else if (m1s[3] > m2s[3]) return 1;
	else if (m1s[2]< m2s[2])		return -1;
	else if (m1s[2] > m2s[2]) return 1;
	else if (m1s[1]< m2s[1])		return -1;
	else if (m1s[1] > m2s[1]) return 1;
	else return 0;
}

function addMonomial(m1, m2){
	m1s = m1.split(/[x|y|z]/g);
	m2s = m2.split(/[x|y|z]/g);
	coef = parseInt(m1s[0]) + parseInt(m2s[0]);
	if (coef == 0)
		return "ZERO"
	else
		return coef + "x" + m1s[1] + "y" + m1s[2] + "z" + m1s[3];
}

function subMonomial(m1, m2){
	m1s = m1.split(/[x|y|z]/g);
	m2s = m2.split(/[x|y|z]/g);
	coef = parseInt(m1s[0]) - parseInt(m2s[0]);
	if (coef == 0)
		return "ZERO";
	else
		return coef + "x" + m1s[1] + "y" + m1s[2] + "z" + m1s[3];
}

function mulMonomial(m1, m2){
	m1s = m1.split(/[x|y|z]/g);
	m2s = m2.split(/[x|y|z]/g);
	coef = parseInt(m1s[0]) * parseInt(m2s[0]);
	coefx = parseInt(m1s[1]) + parseInt(m2s[1]);
	coefy = parseInt(m1s[2]) + parseInt(m2s[2]);
	coefz = parseInt(m1s[3]) + parseInt(m2s[3]);
	if (coef == 0)
		return "ZERO";
	else
		return coef + "x" + coefx + "y" + coefy + "z" + coefz;
}

function add(p1, p2){
	if (p1.data == "")
		return p2;
	if (p2.data == "")
		return p1;
	var r = new Polynomial();
	p1Mos = p1.data.split(" + ");
	p2Mos = p2.data.split(" + ");
	var data = "";
	var k = 0; var current = p1Mos[0];
	for (var i = 0; i < p2Mos.length; i++){
		if (k >= p1Mos.length)
			data += " + " + p2Mos[i];
		else {
			while (k < p1Mos.length && compareMonomial(current, p2Mos[i]) < 0){
				data += " + " + p1Mos[k]; k++; current = p1Mos[k]; 
			}
			if (current == undefined)
				data += " + " + p2Mos[i];
			else if (compareMonomial(current, p2Mos[i]) == 0){
				if (addMonomial(current, p2Mos[i]) != "ZERO")
					data += " + " + addMonomial(current, p2Mos[i]); 
				k++; current = p1Mos[k];
			}	
			else{
				data += " + " + p2Mos[i];
			}
		}
	}
	while (k < p1Mos.length){
		data += " + " + p1Mos[k]; k++
	}
	r.setData(data.substring(3)); 
	return r;
}

function sub(p1, p2){
	if (p2.data == "")
		return p1;
	if (p1.data == ""){
		//need to update here
		return p2;
	}
	var r = new Polynomial();
	p1Mos = p1.data.split(" + ");
	p2Mos = p2.data.split(" + ");
	var data = "";
	var k = 0; var current = p1Mos[0];
	for (var i = 0; i < p2Mos.length; i++){
		p2coef = p2Mos[i].split(/[x|y|z]g/)[0];
		if (parseInt(p2coef) < 0)
			p2MoNeg = p2Mos[i].substring(1);
		else
			p2MoNeg = "-" + p2Mos[i];
		if (k >= p1Mos.length)
			data += " + " + p2MoNeg;
		else {
			while (k < p1Mos.length && compareMonomial(current, p2Mos[i])< 0){
				data += " + " + p1Mos[k]; k++; current = p1Mos[k]; 
			}
			if (current == undefined)
				data += " + " + p2MoNeg;
			else if (compareMonomial(current, p2Mos[i]) == 0){
				if (subMonomial(current, p2Mos[i]) != "ZERO")
					data += " + " + subMonomial(current, p2Mos[i]); 
				k++; current = p1Mos[k];
			}	
			else{
				data += " + " + p2MoNeg;
			}
		}
	}
	while (k < p1Mos.length){
		data += " + " + p1Mos[k]; k++
	}
	r.setData(data.substring(3)); 
	return r;
}

// multiply polynomial p1 (with array of monomials p1Mos) with a monomial m2 
function mulPM(p1Mos, m2){
	r = new Polynomial();
	var data = ""; 
	for (var i = 0; i < p1Mos.length; i++){
		if (mulMonomial(p1Mos[i], m2) != "ZERO")
			data += " + " + mulMonomial(p1Mos[i], m2);
	}
	r.setData(data.substring(3)); return r;
}
// multiply polynomial p1 with polynomial p2 	
function mul(p1, p2){
	p1s = p1.data.split(" + ");
	p2s = p2.data.split(" + ");
	r = new Polynomial();
	for (var i = 0; i < p2s.length; i++){
		r = add(r, mulPM(p1s, p2s[i]));
	}
	return r;
}

function Fricke(s){
	var w = new Word();
	w.setWordString(s);
	w.reduce(); s = w.toString();
	var r = new Polynomial();
	var l = s.length;
	// Trivial case or case where 2 consecutive letters among last 4 letter
	// are the same
	if (l == 0){
		r.setData("2x0y0z0");
		return r;
	}
	if (l == 1){
		if (s == "a" || s == "A")
			r.setData("1x1y0z0");
		else 
			r.setData("1x0y1z0");
		return r;
	}
	if (s.charAt(l-1) == s.charAt(l-2)){
		var c = s.charAt(l-1);
		var s1 = s.substring(0, l-2);
		r = sub(mul(Fricke(s1 + c), Fricke(c + "")), Fricke(s1)); 
		return r;
	}
	if (l == 2){
		if (s == "ab" || s == "ba" || s == "AB" || s == "BA"){
			r.setData("1x0y0z1");
			return r;
		}
		else if (s == "aB" || s == "Ba" || s == "Ab" || s == "bA"){
			r.setData("1x1y1z0 + -1x0y0z1");
			return r;
		}
	}
	if (s.charAt(l-2) == s.charAt(l-3)){
		s = s.charAt(l-1) + s.substring(0, l-1);
		r = Fricke(s);
		return r;
	}
	if (l == 3){
		s = s.charAt(l-1) + s.substring(0, l-1);
		r = Fricke(s);
		return r;
	}
	if (s.charAt(l-3) == s.charAt(l-4)){
		s = s.substring(l-2, l) + s.substring(0, l-2);
		r = Fricke(s);
		return r;
	}
	// Case 2: w = x1Yx2y
	var t = s.charCodeAt(l-1) - s.charCodeAt(l-3);
	if ( t == 32 || t == -32){
		var w1 = new Word();
		w1.setWordString(s.substring(l-2, l));
		var s2 = s.substring(0, l-2) + w1.bar().toString();
		r = sub(mul(Fricke(s.substring(0, l-2)), Fricke(s.substring(l-2, l))),
					Fricke(s2)); 
		return r;
	}
	// Case 3: w = ...Xyxy
	t = s.charCodeAt(l-2) - s.charCodeAt(l-4);
	if ( t == 32 || t == -32){
		r = Fricke(s.charAt(l-1) + s.substring(0, l-1));
		return r;
	}
	// Last case 4: w = ...xyxy
	r = sub(mul(Fricke(s.substring(0, l-2)), Fricke(s.substring(l-4, l-2))), 
					Fricke(s.substring(0, l-4)));
	return r;
}
			
			
	
	
			
			
	