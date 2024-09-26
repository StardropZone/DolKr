function trCreature(type, name, num, post, sep)
{
	if (type)
	{
		const creatureTypeAlias = { "all":"all", "parasite":"parasite", "chastityparasite":"swarm", "struggle":"struggle", "swarm":"swarm", "swarmtype":"swarm", "swarmname":"swarm", "tentacle":"tentacle", "vore":"vore", };
		let creatureType = creatureTypeAlias[type];
		
		if (typeof(num) === "string")
		{
			sep = post;
			post = num;
			num = 1;				
		}
		if (!creatureType)
		{
			T.trResult = `<span class='red'>에러: trCreature: 모르는 type: ${type}</span>`;
			return T.trResult;
		}
		
		let foundArray = [];
		
		if (name)
		{
			if (!setup.trCreatures)
				trinit_creature();
			
			let creatureNameArray = name.toLowerCase().split(" ");
			
			let foundIndex = creatureNameArray.findIndex(function(select){
				if (select.endsWith("'s")){return true;
				}});
			if (foundIndex >= 0)
			{
				// abomination
				let abominationName = creatureNameArray.slice(0, foundIndex+1).join(" ");
				abominationName = abominationName.substring(0, abominationName.length-2);
				creatureNameArray = creatureNameArray.slice(foundIndex+1);
				trNPCdesc(abominationName, "의");
				foundArray.push({ koName: T.trResult });
			}

			let found;
			for (const value of creatureNameArray)
			{
				if (creatureType !== "all")
				{
					found = setup.trCreatures[creatureType].nameIndex[value];
					if (!found)
						found = setup.trCreatures[creatureType].pluralIndex[value];
				}
				else
				{
					found = setup.trCreatures.nameIndex[value];
					if (!found)
						found = setup.trCreatures.pluralIndex[value];
				}
				if (found)
				{
					if (value == found.name)
						found.isplural = false;
					else
						found.isplural = true;

					foundArray.push(found);
				}
				else
				{
					foundArray = [];
					break;
				}
			}
		}

		if (foundArray.length > 0)
		{
			T.trResult = "";
			let i = 0;
			for (const value of foundArray)
			{
				if (i == foundArray.length - 1)
				{
					// last word
					if (value.isplural == true || num > 1)
					{
						// 복수 
						T.trResult += value.koName + "들";
						T.postNum = 2;
					}
					else if (value.post < 0)
					{
						T.trResult += value.koName + " 촉수";
						T.postNum = 1;
					}
					else
					{
						T.trResult += value.koName;
						T.postNum = value.post;
					}
				}
				else
					T.trResult += value.koName + " ";
				i++;
			}
			
			if (post)
				trPost(T.postNum, post, sep)
		}
		else
			T.trResult = `trCreatures.${creatureType}에 정의되어 있지 않음: ${name}`;
	}
	return T.trResult;
}
window.trCreature = trCreature;
DefineMacro("trCreature", trCreature);

// trParasite
window.trParasite = (parasite, post, sep) => trCreature("parasite", parasite, post, sep);
DefineMacro("trParasite", trParasite);

window.trChastityParasite = (parasite, post, sep) => trCreature("chastityparasite", parasite, post, sep);
DefineMacro("trChastityParasite", trChastityParasite);

// trStruggle
window.trStruggle = (creature, post, sep) => trCreature("struggle", creature, post, sep);
DefineMacro("trStruggle", trStruggle);

// trVore
window.trVore = (voretype, post, sep) => trCreature("vore", voretype, post, sep);
DefineMacro("trVore", trVore);

// trTentacle
window.trTentacle = (tentacle, post, sep) => trCreature("tentacle", tentacle, post, sep);
DefineMacroS("trTentacle", trTentacle);	// trTentacle 은 직접출력

// trSwarm
window.trSwarm = (swarm, post, sep) => trCreature("swarm", swarm, post, sep);
DefineMacro("trSwarm", trSwarm);

function trSwarmAction(action)
{
	if (action)
	{
		if (!setup.trSwarmActionList)
			trinit_swarmAction();
		
		let found = setup.trSwarmActionList[action];
		if (found)
			T.trResult = found;
		else
			T.trResult = `trSwarmAction에 없음: ${action}`;
	}
	return T.trResult;
}
window.trSwarmAction = trSwarmAction;
DefineMacro("trSwarmAction", trSwarmAction);
