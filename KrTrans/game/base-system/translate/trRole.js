function trRole(role, post, sep)
{
	if (role)
	{
		if (!setup.trRoleList)
			trinit_roleList();
		
		let found = setup.trRoleList[role];
		if (found)
		{
			T.trResult = found.ko;
			trPost(found.post, post, sep);
		}
		else
			T.trResult = `<span class='red'> 에러: trRole: trRoleList에 없음(${role})</span>`;	
	}
	return T.trResult;
}
window.trRole = trRole;
DefineMacro("trRole", trRole);
