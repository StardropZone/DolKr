function trFurniture(furniture, type, post, sep)
{
	T.trResult = "";
	if (furniture)
	{
		if (!setup.trFurniture)
			trinit_furniture();
		
		furniture = furniture.toLowerCase();
		if (!["name","desc"].includes(type))
		{
			sep = post;
			post = type;
		}
		let found = setup.trFurniture[furniture];
		
		if (found)
		{
			if (type == "desc")
				T.trResult = found.description;
			else
			{
				T.trResult = found.koName;
				trPost(found.post, post, sep);
			}
		}
		else
		{
			T.trResult = furniture;	/* 사용자 문자열일 수 있으므로 원문을 그냥 넘김 */
			getPostNum(T.trResult);
			T.postNum = (T.postNum !== undefined?T.postNum:1);
			trPost(T.postNum, post, sep);
		}
	}
	return T.trResult;
}
window.trFurniture = trFurniture;
DefineMacro("trFurniture", trFurniture);
