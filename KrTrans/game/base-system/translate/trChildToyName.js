function trChildToyName(toyName, post, sep)
{
	if (toyName)
	{
		if (typeof(toyName) === "string" && toyName.substring(0,1).search("[가-힣]") >= 0 && V.childSelected !== undefined)	// only post & sep
		{
			post = toyName;
			sep = post;
			toyName = T.toyName;
		}
	}
	else
	{
		toyName = T.toyName;
	}

	if (!setup.trChildToySelectionList)
		trinit_childToySelectionList();
	
	if (toyName)
	{
		let found = setup.trChildToySelectionList[toyName.toLowerCase()];

		if (found)
		{
			T.trResult = found.ko;
			trPost(found.post, post, sep);
		}
		else
		{
			T.trResult = toyName;
			getPostNum(T.trResult);
			trPost(T.postNum, post, sep);
		}
	}
	else
		T.trResult = `<span class='red'>에러: trChildToyName: 리스트에 없음: ${toyName}</span>`;
	return T.trResult;
}
window.trChildToyName = trChildToyName;
DefineMacro("trChildToyName", trChildToyName);
