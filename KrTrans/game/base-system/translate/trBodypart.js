function trBodypart(bodyPart, post, sep)
{
	if (bodyPart)
	{
		if (!setup.trBodypartsList)
			trinit_bodypartList();
	
		let partArray = bodyPart.toLowerCase().replace('_',' ').split(' ');
		let resultArray = [];
		
		for (const part of partArray)
		{
			let trpart = setup.trBodypartsList.partIndex[part];
			
			if(trpart)
			{
				resultArray.push(trpart.koPart);
				T.postNum = trpart.post;
			}
			else
			{
				resultArray = [];
				break;
			}
		}
		
		if (resultArray.length > 0)
		{
			T.trResult = resultArray.join(" ");
			trPost(T.postNum, post, sep);
		}
		else
		{
			T.trResult = `<span class='red'>에러: trBodypart: 정의되지 않음: ${bodyPart}</span>`;
		}
	}
	return T.trResult;
}
window.trBodypart = trBodypart;
DefineMacro("trBodypart", trBodypart);

function trBodysize(bodySize)
{
	if (bodySize !== undefined)
	{
		const trBodysize = {
			"tiny":"조그마함",
			"small":"작음",
			"normal":"평범함",
			"large":"큼",
		};
		T.trResult = trBodysize[bodySize];
		if (!T.trResult)
			T.trResult = `trBodysize에 지정되지 않음: ${bodySize}`;
	}
	return T.trResult;
}
window.trBodysize = trBodysize;
DefineMacro("trBodysize", trBodysize);
