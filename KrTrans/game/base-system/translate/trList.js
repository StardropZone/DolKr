function trList(list, method, options)
{
	if (list)
	{
		T.trList = [];
		
		if (!method)
			method = "putpost";
		
		if (!options)
			options = "";

		if (Array.isArray(list))
		{
			for (const item of list)
			{
				Wikifier.wikifyEval(`<<${method} '${item}' ${options}>>`);
				T.trList.push(T.trResult);
			}
		}
		else
			T.trList = [`<span class='red'>에러: trList: 인수가 배열이 아님: ${list}</span>`];
	}
	else
		T.trList = ["<span class='red'>에러: trList: No args</span>"];

	return T.trList;
}
window.trList = trList;
DefineMacro("trList", trList);