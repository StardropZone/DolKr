function trBreastsdesc(breastdesc, post, sep)
{
	const trBreast = {
		"nipple": {koName:"유두",post:1},
		"nipples": {koName:"유두",post:1},
		"breast": {koName:"유방",post:0},
		"breasts": {koName:"유방",post:0}
	};
	const trBreastAdj = {
		"flat":"평평한",
		"budding":"약간 솟아오른",
		"tiny":"조그마한",
		"small":"작은",
		"pert":"앙증맞은",
		"modest":"평범한",
		"full":"봉긋한",
		"large":"큰",
		"ample":"풍만한",
		"massive":"커다란",
		"huge":"매우 큰",
		"gigantic":"엄청난",
		"enormous":"거대한"
	};

	let tempArray = breastdesc.toLowerCase().split(' ');
	let resultArray = [];
	delete T.postNum;
	for(const value of tempArray)
	{
		let trTemp = trBreastAdj[value];
		if (!trTemp)
		{
			trTemp = trBreast[value];
			if (trTemp)
			{
				trTemp = trBreast[value].koName;
				T.postNum = trBreast[value].post;
			}
		}
		if (trTemp)
			resultArray.push(trTemp);
		else
		{
			resultArray = [];
		}
	}
	
	if (resultArray.length > 0)
	{
		T.trResult = resultArray.join(" ");
		if (T.postNum !== undefined)
			trPost(T.postNum, post, sep);
	}
	else
		T.trResult = `<span class='red'>에러: trBreastsdesc: 정의되지 않음: ${breastdesc}</span>`;
	
	return T.trResult;
}
window.trBreastsdesc = trBreastsdesc;
DefineMacro("trBreastsdesc", trBreastsdesc);
