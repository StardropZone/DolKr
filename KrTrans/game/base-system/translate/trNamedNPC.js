function trNamedNPCInner(name, type)
{
	if (!setup.trNamedNPCList)
		trinit_namedNPC();
	
	let found;
	name = name.toLowerCase();
	if (!type)
	{
		found = setup.trNamedNPCList.nameIndex[name];
		if (!found)
			found = setup.trNamedNPCList.titleIndex[name];
	}
	else if (type[0] === 't')
		found = setup.trNamedNPCList.titleIndex[name];
	else
		found = setup.trNamedNPCList.nameIndex[name];

	if (found)
	{
		T.trResult = found.koname;
		T.postNum = found.post;	
	}
	else
	{
		delete T.trResult;
		delete T.postNum;
	}
	return T.trResult;
}
DefineMacro("trNamedNPCInner", trNamedNPCInner);

function trNamedNPC(npcinfo, type, post, sep)
{
	if (npcinfo)
	{
		let name;
		if (typeof(npcinfo) !== "string")
			name = npcinfo[0]; //% NAMED-NPC:<<print $npc[0]>> %/
		else
			name = npcinfo;
		
		if (typeof(type) === "string" && type.substring(0,1).search("[가-힣]") >= 0)
		{
			sep = post;
			post = type;
		}

		trNamedNPCInner(name, type);
		
		if (T.trResult)
		{
			if  (post)
				trPost(T.postNum, post, sep);
		}
		else
			T.trResult = `trNamedNPCerr: 정의되지 않음: ${name}`;
	}
	return T.trResult;
}
window.trNamedNPC = trNamedNPC;
DefineMacro("trNamedNPC", trNamedNPC);