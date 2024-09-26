/* trCrime */

/* setup.crimeNames (04-variables/variables-static.twee) */
setup.trCrimeNames = {
	"???": { koname:"???", post: 1 },
	"assault": { koname:"폭행", post: 0 },
	"coercion": { koname:"협박", post: 0 },
	"destruction": { koname:"재물손괴", post: 1 },
	"destruction of property": { koname:"재물손괴", post: 1 },
	"exposure": { koname:"과다노출", post: 2 },
	"indecent exposure": { koname:"과다노출", post: 2 },
	"obstruction": { koname:"사법방해", post: 1 },
	"obstruction of justice": { koname:"사법방해", post: 1 },
	"prostitution": { koname:"성매매", post: 1 },
	"resisting": { koname:"체포불응", post: 0 },
	"resisting arrest": { koname:"체포불응", post: 0 },
	"thievery": { koname:"절도", post: 1 },
	"petty": { koname:"경미한 절도", post: 1 },
	"petty thievery": { koname:"경미한 절도", post: 1 },
	"trespassing": { koname:"무단침입", post: 0 }
};

function trCrimeName(name, post, sep)
{
	if (name)
	{
		const crimename = setup.trCrimeNames[name];
		if (crimename)
		{
			T.trResult = crimename.koname;
			trPost(crimename.post, post, sep);
		}
		else
			T.trResult = "<span class='red'>trCrimeName: " + name + " 찾을 수 없음</span>";
	}
	else
		T.trResult = "<span class='red'>trCrimeName: 번역할 인수가 없음</span>";
	return T.trResult;
}
window.trCrimeName = trCrimeName;
DefineMacro("trCrimeName", trCrimeName);
