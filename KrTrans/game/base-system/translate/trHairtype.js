function trHairtype(hairtype)
{
	if (!setup.trHairtypeList)
		trinit_hairtype();

	delete T.trResult;
	if (typeof(hairtype) === "string")
	{
		let hair = hairtype.toLowerCase();
		T.trResult = setup.trHairtypeList[hair];
		if (!T.trResult)
			T.trResult = `<span class='red'>에러: trHairtype: 정의되어 있지 않음: ${hairtype}</span>`
	}
	return T.trResult;
}
window.trHairtype = trHairtype;
DefineMacro("trHairtype", trHairtype);
