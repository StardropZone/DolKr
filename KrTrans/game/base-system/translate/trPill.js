function trPill(pilltype, post, sep)
{
	const trPillList = {
		/* 구버전 */
		"growth":{ko: "성장약", post: 0},
		"reduction":{ko: "축소약", post: 0},
		"blocker":{ko: "성장 억제약", post: 0},
		"fertility":{ko: "배란약", post: 0}, 
		/* 구버전 끝 */
		
		/* setup.pills (03-JavaScript/bedroomPills.js) */
		"bottom reduction": {ko: "엉덩이 축소약", post: 0},
		"bottom growth": {ko: "엉덩이 성장약", post: 0},
		"bottom blocker": {ko: "엉덩이 성장 억제약", post: 0},
		"breast reduction": {ko: "유방 축소약", post: 0},
		"breast growth": {ko: "유방 성장약", post: 0},
		"breast blocker": {ko: "유방 성장 억제약", post: 0},
		"penis reduction": {ko: "음경 축소약", post: 0},
		"penis growth": {ko: "음경 성장약", post: 0},
		"penis blocker": {ko: "음경 성장 억제약", post: 0},
		"anti-parasite":{ko: "기생충 기피제", post: 1},
		"fertility booster":{ko: "배란 촉진약", post: 0},
		"contraceptive":{ko: "피임약", post: 0},
		"anti-parasite cream":{ko: "기생충 기피 크림", post: 0},
		"asylum\'s prescription": {ko: "정신병원 처방약", post: 0},
		"dr harper\'s prescription": {ko: "의사 하퍼의 처방약", post: 0},
		"hair growth formula": {ko: "모발 성장약", post: 0},
		"none": {ko: "없음", post: 0},
		
		/* setup.pharmacyItems (04-Variables/variables-static.twee) */
		"penis reduction pills": {ko: "음경 축소약", post: 0},
		"penis growth pills": {ko: "음경 성장약", post: 0},
		"penis growth blocker pills": {ko: "음경 성장 억제약", post: 0},
		"breast reduction pills": {ko: "유방 축소약", post: 0},
		"breast growth pills": {ko: "유방 성장약", post: 0},
		"breast growth blocker pills": {ko: "유방 성장 억제약", post: 0},
		"bottom reduction pills": {ko: "엉덩이 축소약", post: 0},
		"bottom growth pills": {ko: "엉덩이 성장약", post: 0},
		"bottom growth blocker pills": {ko: "엉덩이 성장 억제약", post: 0},
		"condoms": {ko: "콘돔", post: 0},
		"pregnancy test": {ko: "임신 테스트기", post: 1},
		"fertility pills": {ko: "배란 촉진약", post: 1},
		"contraceptive pills":{ko: "피임약", post: 0},
		"morning after pill":{ko: "사후피임약", post: 0},
		"breast pump":{ko: "착유기", post: 1},
	};
	let found = trPillList[pilltype.toLowerCase().replace('_',' ')];
	if (found)
	{
		T.trResult = found.ko;
		T.postNum = found.post;
		if (post)
			trPost(T.postNum, post, sep);
	}
	else
		T.trResult = `[에러] trPillList 에서 해당 이름을 찾을 수 없음: ${pilltype}`;
	
	return T.trResult;
}
window.trPill = trPill;
DefineMacro("trPill", trPill);