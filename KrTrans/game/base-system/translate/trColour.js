function trColour(colour, post, sep)
{
	if (colour && typeof(colour) == "string")
	{
		if (!setup.trColour)
			trinit_colorList();
		
		colour = colour.toLowerCase();
		/* Case 1: 04-Variables/colours.js 에 있는지 찾는다 */
		let found = setup.trColour[colour.replace(/[\-\s]/gi, "")];

		/* Case 2: 03-JavaScript/colour-namer.js의 커스텀 색상인지 찾는다 */
		if (!found)
		{
			if (!setup.trColourAux)
				trinit_colorAuxList();
			
			let colourNameArray = colour.split(" ");
			if (colourNameArray.length == 2)
			{
				let colourAux = setup.trColourAux[colourNameArray[0]];
				let colourMain = setup.trColour[colourNameArray[1]];

				if (colourAux && colourMain)
					found = colourAux + " " + colourMain;
			}
		}

		/* Case 3: 03-JavaScript/external/colour-namer.js에서 찾는다 */
		if (!found)
		{
			if (!setup.trColour2)
				trinit_colorList2();
			
			let foundEntry = setup.trColour2.find(function(select){
				if(select.variable == colour || select.name == colour) {return true;}
				});
			if (foundEntry)
				found = foundEntry.koname;
		}
		
		if (!found)	/* 없음 */
			T.trResult = `trColour에 정의되지 않음: ${colour}`;
		else
		{
			T.trResult = found;
			if (post)
			{
				getPostNum(T.trResult);
				trPost(T.postNum, post, sep);
			}
		}
	}
	else	/* 옷의 색 같은 경우 색상지정이 없는 경우가 있음 */
		T.trResult = "";
	
	return T.trResult;
}
window.trColour = trColour;
DefineMacro("trColour", trColour);
