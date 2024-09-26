function trPlants(plantname, type, post, sep)
{
	if (!setup.trPlants)
		trinit_plants();

    let trTemp = setup.trPlants.find(function(select){
            if(select.name == plantname || select.plural == plantname){return true;
            }});

    if (!trTemp)
	{
        T.trResult = `trPlants에 정의되지 않음: ${plantname}`;
	}
    else
	{
        if (type === "name")
		{
            T.trResult = trTemp.name_ko;
			trPost(trTemp.post, post, sep);
		}
        else if (type === "plural")
		{
            T.trResult = trTemp.name_ko+"들";
			trPost(2, post, sep);
		}
        else if (type === "unit")
		{
            T.trResult = trTemp.unit_ko;
			trPost(trTemp.unit_post, post, sep);
		}
        else
		{
			sep = post;
			post = type;
            if(trTemp.name == plantname)
			{
                T.trResult = trTemp.name_ko;
				trPost(trTemp.post, post, sep);
            }
			else
			{
                T.trResult = trTemp.name_ko+"들";
				trPost(2, post, sep);
            }
        }
    }
	return T.trResult;
}
window.trPlants = trPlants;
DefineMacro("trPlants", trPlants);

window.trPlantsPlural = (plantname, post, sep) => trPlants(plantname, "plural", post, sep);
DefineMacro("trPlantsPlural", window.trPlantsPlural);