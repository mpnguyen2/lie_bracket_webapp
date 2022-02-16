// Using order function from Word file
function isLessThan(W1, W2, sw){
	var w1 = W1.word, w2 = W2.word;
	var l1 = w1.length, l2 = w2.length;
	o = order(sw);
	if (o.get(w1[0]) < o.get(w2[0]))
		return true;
	else if (o.get(w1[0]) > o.get(w2[0]))
		return false;
	var i = 0;
	while(w1[i % l1] == w2[i % l2])
		i++;
	o = order(sw.permute(findCharPos(sw, -w1[(i-1) % l1])));
	if (o.get(w1[i % l1]) < o.get(w2[i % l2]))
		return true;
	else return false;
}

function isCyclicallyOrder(A, B, C, D, sw){
	if (isLessThan(A, B, sw)){
		if (isLessThan(B, C, sw)){
				if (isLessThan(C, D, sw) || isLessThan(D, A, sw))
					return true;		// A, B, C, D or D, A, B, C
		}
		else{
			if (isLessThan(D, A, sw) && isLessThan(C, D, sw))
				return true;			// C, D, A, B
		}
	}
	else if (isLessThan(B, C, sw) && isLessThan(C, D, sw) && isLessThan(D, A, sw))
		return true;					// B, C, D, A
	
	return false;
}
		
function sign(V, W, i, j, sw){
	var Vi = V.permute(i); var ViB = Vi.bar();
	var Wj = W.permute(j); var WjB = Wj.bar();
	if (isCyclicallyOrder(Vi, Wj, ViB, WjB, sw))
		return 1;
	else if (isCyclicallyOrder(Vi, WjB, ViB, Wj, sw))
		return -1;
	else
		return 0;
}

function selfIntersectionNumber(V, sw){
	var v = V.word;
	var r = V.primitiveExp() - 1;
	for (var i = 0; i < v.length; i++) 
		for (var j = 0; j < i; j++) 
			if ( (j != 0 && v[i] != v[j] && v[i] != -v[j - 1])
				|| (j == 0 && v[i] != v[0]) ){
				r = r + Math.abs(sign(V, V, i, j, sw));	
			} 
	return r;
}

function cobracket(V, sw){
	var r = new Cobrackets();
	var v = V.word;
	for (var i = 0; i < v.length; i++) 
		for (var j = 0; j < i; j++) 
			if ( (j != 0 && v[i] != v[j] && v[i] != -v[j - 1])
				|| (j == 0 && v[i] != v[0]) ){
				v1 = []; v2 = [];
				for (var k = 0; k < v.length-i; k++)
					v1[k] = v[(i+k)];
				for (var k = 0; k < j; k++)
					v1[v.length-i+k] = v[k];
				for (var k = 0; k < i-j ; k++)
					v2[k] = v[k + j]; 
				V1 = new Word(); V1.setWord(v1); V1 = canonical(V1);
				V2 = new Word(); V2.setWord(v2); V2 = canonical(V2);
				if (!V1.isEqual(V2))
					r.addTerm(V1, V2, sign(V, V, i, j, sw));
			} 
	return r;
}

function intersectionNumber(V, W, sw){
	var v = V.word; var w = W.word;
	var l1 = v.length; var l2 = w.length;
	var r = 0;
	for (var i = 0; i < v.length; i++)
		for (var j = 0; j < w.length; j++){
			var jm1 = (j-1) % l2; if (jm1 < 0) jm1 = jm1 + l2;	// jm1 = j minus 1 mod l2
		// Finding (end) extreme pair (it is unique) then add term to Brackets r
			if (v[i] != w[j] && v[i] != -w[jm1]){
				r = r + Math.abs(sign(V, W, i, j, sw));
			}
		}
	return r;
}
	
function goldmanBracket(V, W, sw){
	var v = V.word; var w = W.word;
	var l1 = v.length; var l2 = w.length;
	var r = new Brackets();
	for (var i = 0; i < l1; i++)
		for (var j = 0; j < l2; j++){
			var jm1 = (j-1) % l2; if (jm1 < 0) jm1 = jm1 + l2;	// jm1 = j minus 1 mod l2
		// Finding (end) extreme pair (it is unique) then add term to Brackets r
			if (v[i] != w[j] && v[i] != -w[jm1]){
				var term = canonical(concat(V.permute(i), W.permute(j)));
				r.add(sign(V, W, i, j, sw), term);
			}
		}
	return r;
}