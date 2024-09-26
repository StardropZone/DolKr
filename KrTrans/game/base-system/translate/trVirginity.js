const trVirginitySpecialList = {
	"sex machine": { koname: "섹스 기계", },
	"giving birth": { koname: "아기 출산", },
	"Eerie Mirror Tentacle": { koname: "으스스한 거울 촉수", },
	"Lew": { koname: "류", },	/* olive book */
	"phallus plant": { koname: "자지 모양 식물", },
	"a phallus plant": { koname: "자지 모양 식물", },
	"Portal Panties": { koname: "포탈 팬티", },
};

function trVirginityInner(desc, post, sep)
{
	delete T.trResult;
	let tempArray = desc.split(" ");
	if (tempArray.length == 1)
	{
		/* struggle monster? */
		if (!setup.trCreatures)
			trinit_creature();
		
		let value = desc;

		let found = setup.trCreatures.struggle.nameIndex[value];
		if (!found)
			found = setup.trCreatures.struggle.pluralIndex[value];

		if (found)
			trCreature("struggle", desc, post, sep);
		else
			trNPCdesc(desc, post, sep);
	}
	else
	{
		let foundIndex = tempArray.findIndex(function(select){
			if (select.endsWith("'s")){return true;
			}});
	
		if (foundIndex >= 0)
		{
			/* abomination */
			trCreature("tentacle", desc, post, sep);
		}
		else
		{
			/* tentacle? */
			if (!setup.trCreatures)
				trinit_creature();
			
			let value = tempArray[tempArray.length -1];

			let found = setup.trCreatures.tentacle.nameIndex[value];
			if(!found)
				found = setup.trCreatures.tentacle.pluralIndex[value];

			if (found)
				trCreature("tentacle", desc, post, sep);
			else
				trNPCdesc(desc, post, sep);
		}
	}
	return T.trResult;
}

function trVirginity(npcdesc)
{
	if (typeof (npcdesc) === 'string')
	{

		let found = trVirginitySpecialList[npcdesc];
		if (found)
		{
			T.trResult = found.koname;
		}
		else
		{
			let tempArray = npcdesc.split(" ");
			let idxAnd = tempArray.findIndex(x => x == "and");
			if (idxAnd >= 0)	/* double fuck */
			{
				T.trResult = trVirginityInner(tempArray.slice(0,idxAnd).join(" "), "과") + 
					" " +
					trVirginityInner(tempArray.slice(idxAnd+1).join(" "));
			}
			else
				trVirginityInner(npcdesc);
		}
	}
	else if (typeof(npcdesc) === 'boolean')
	{
		T.trResult = (npcdesc === true)?"존재":"불명";
	}
    else
        T.trResult = npcdesc;
	
    return T.trResult;
}
window.trVirginity = trVirginity;
DefineMacro("trVirginity", trVirginity);

function trNPCVirginity(npcdesc)
{
	if (Array.isArray(npcdesc))
	{
		let trArray = [];
		for (const value of npcdesc)
		{
			trNPCdesc(value);
			trArray.push(T.trResult);
		}
		T.trResult = trArray.join(", ");
	}
	else
		T.trResult = `<span class='red'>에러: trNPCVirginity: 잘못된 인수: ${npcdesc}</span>`;
	
	return T.trResult;
}
window.trNPCVirginity = trNPCVirginity;
DefineMacro("trNPCVirginity", trNPCVirginity);
