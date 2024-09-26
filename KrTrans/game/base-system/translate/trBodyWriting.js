function trBodyWriting(bodywriting, post, sep)
{
    if (!setup.trBodyWritingList)
        trBodyWriting_init();

	T.trResult = setup.trBodyWritingList.nameIndex[bodywriting];
	if (!T.trResult)
		T.trResult = setup.trBodyWritingList.writingIndex[bodywriting];

    if (T.trResult)
        trPost(getPostNum(T.trResult), post, sep);
    else
        T.trResult = `BodyWritingList에 정의되지 않음: ${bodywriting}`;
	return T.trResult;
}
window.trBodyWriting = trBodyWriting;
DefineMacro("trBodyWriting", trBodyWriting);

function trBodyWritingCategory(category)
{
	const trCategory = {
			"General": "일반",
			"Promiscuity": "음란",
			"Prostitution": "매춘",
			"Exhibitionism": "노출증",
			"Deviancy": "이상성욕",
			"Masochism": "마조히즘",
			"Pregnancy": "임신",
			"Love Interests": "연인",
	};

	T.trResult = trCategory[category];
	
	if (!T.trResult)
		T.trResult = category;
	return T.trResult;
}
window.trBodyWritingCategory = trBodyWritingCategory;
DefineMacro("trBodyWritingCategory", trBodyWritingCategory);