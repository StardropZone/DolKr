/* global ClothesItem, ClothedSlots */

function mapMove(moveTo) {
	const currentPassage = V.passage;
	const destinationTable = [];
	for (let i = 1; i < V.link_table.length; i++) {
		const temp = V.link_table[i].split("|")[1];
		if (temp) {
			destinationTable.push(temp.split("]]")[0]);
		}
	}
	const available = V.map.available;

	// if(V.debug == 1 || available[currentPassage].includes(moveTo))
	if (V.debug === 1 || (available[currentPassage].includes(moveTo) && destinationTable.includes(moveTo))) {
		window.ironmanFlag = true;
		Wikifier.wikifyEval("<<pass 5>>");
		delete window.ironmanFlag;
		Engine.play(moveTo);
	}
}
window.mapMove = mapMove;

function shopClothingFilterToggleTrait(trait) {
	const traits = V.shopClothingFilter.traits;
	if (traits) {
		const index = traits.indexOf(trait);
		if (index === -1) {
			traits.push(trait);
		} else {
			traits.splice(index, 1);
		}
	}
}
window.shopClothingFilterToggleTrait = shopClothingFilterToggleTrait;

function toggleAllHairTraitsFilter() {
	const chboxes = $("#hairContainerTraits  input:not(:checked)");
	if (chboxes.length > 0) chboxes.click();
	else $("#hairContainerTraits input:checked").click();
}
window.toggleAllHairTraitsFilter = toggleAllHairTraitsFilter;

// A wrapper for wikifyEval, only use for singular macro calls.
function wikifier(widget, ...args) {
	if (widget == null) return document.createDocumentFragment();
	return Wikifier.wikifyEval("<<" + widget + (args.length ? " " + args.join(" ") : "") + ">>");
}
window.wikifier = wikifier;

function actionsreplace(bodypart) {
	const check = bodypart + "target";
	if (V[check] === "tentacles") {
		Wikifier.wikifyEval("<<replace #" + bodypart + "action>><<" + bodypart + "ActionInitTentacle>><</replace>>");
	} else if (V[check] === "swarm") {
		Wikifier.wikifyEval("<<replace #" + bodypart + "action>><<" + bodypart + "ActionInitSwarm>><</replace>>");
	} else if (V[check] === "vore") {
		Wikifier.wikifyEval("<<replace #" + bodypart + "action>><<" + bodypart + "ActionInitVore>><</replace>>");
	} else if (V[check] === "struggle") {
		Wikifier.wikifyEval("<<replace #" + bodypart + "action>><<" + bodypart + "ActionInitStruggle>><</replace>>");
	} else if (V[check] === "machine") {
		Wikifier.wikifyEval("<<replace #" + bodypart + "action>><<" + bodypart + "ActionInitMachine>><</replace>>");
	} else if (V[check] === "self") {
		Wikifier.wikifyEval("<<replace #" + bodypart + "action>><<" + bodypart + "ActionInitSelf>><</replace>>");
	} else {
		Wikifier.wikifyEval("<<replace #" + bodypart + "action>><<" + bodypart + "ActionInit>><</replace>>");
	}
}
window.actionsreplace = actionsreplace;

// prettier-ignore
const combatActionColours = {
	Default: {
		brat: [
			/* leftaction or rightaction */
			"steal", "penwhack", "freeface", "leftcovervagina", "leftcoverpenis", "leftcoveranus", "rightcovervagina", "rightcoverpenis", "rightcoveranus", "leftunderpull", "leftskirtpull", "leftlowerpull", "leftupperpull", "rightunderpull", "rightskirtpull", "rightlowerpull", "rightupperpull", "rightUndressOther", "leftUndressOther", "stopchoke", "clench", "shacklewhack", "leftfold", "rightfold", "dildowhack", "hypnosiswhack", "leftstruggleweak", "rightstruggleweak", "handpullpenis", "handpullvagina", "handpullanus", "leftresistW", "rightresistW", "leftstillW", "rightstillW", "penisremovecondom", "npcremovecondom",
			/* feetaction */
			"run", "hide", "confront", "feetresistW", "legLock", "legLocked", "feetHold",
			/* mouthaction */
			"pullaway", "ejacspit", "pullawayvagina", "finish", "novaginal", "nopenile", "noanal", "scream", "mock", "breastclosed", "breastpull", "pullawaykiss", "noupper", "analpull", "up", "stifleorgasm", "stifle", "mouthresistW", "handcloseW", "growl", "askPullOut","disparage",
			/* penisaction */
			"othermouthescape", "escape", "otheranusescape", "fencingescape", "pullOut",
			/* vaginaaction */
			"tribescape",
			/* anusaction */
			"doubleescape",
		],
		def: [
			/* leftaction or rightaction */
			"spray", "lefthit", "righthit", "leftstruggle", "rightstruggle", "stopchokenoncon", "pursuit_grab",
			/* feetaction */
			"kick",
			/* mouthaction */
			"bite", "demand", "breastbite", "handbite", "headbutt", "bitepussy",
		],
		meek: [
			/* leftaction or rightaction */
			"behind", "fold", "leftcovervaginameek", "leftcoverpenismeek", "leftcoveranusmeek", "rightcovervaginameek", "rightcoverpenismeek", "rightcoveranusmeek", "leftprotect", "rightprotect", "leftgrip", "rightgrip", "leftcurl", "rightcurl", "pickupSexToy", "leftcamerapose", "rightcamerapose", "peniscondom", "npcgivecondom",
			/* feetaction */
			"strut", "feetCurl",
			/* mouthaction */
			"grasp", "plead", "forgive", "down", "letout", "letoutorgasm", "noises", "pay",
			/* penisaction */
			"thighbay", "bay", "otheranusbay",
			/* vaginaaction */
			"penisthighs",
			/* anusaction */
			"bottombay", "penischeeks", "penispussy", "penispussydap", "penisanus", "bottomhandbay", "wiggle",
		],
		sub: [
			/* leftaction or rightaction */
			"leftplay", "leftgrab", "leftstroke", "leftchest", "rightplay", "rightgrab", "rightstroke", "rightchest", "leftchest", "rightchest", "leftwork", "rightwork", "leftclit", "rightclit", "handedge", "keepchoke", "leftmasturbatepussy", "rightmasturbatepussy", "leftmasturbateanus", "rightmasturbateanus", "leftmasturbatepenis", "rightmasturbatepenis", "lefthandholdkeep", "righthandholdkeep", "lefthandholdnew", "righthandholdnew", "handguide", "lubeanus", "lubepussy", "lubepenis", "removebuttplug", "dildoOtherPussyTease", "dildoOtherPussyFuck", "dildoOtherAnusTease", "dildoOtherAnusFuck", "strokerOtherPenisTease", "strokerOtherPenisFuck", "dildoSelfPussyEntrance", "dildoSelfAnusEntrance", "dildoSelfPussy", "dildoSelfAnus", "strokerSelfPenisEntrance", "strokerSelfPenis", "leftcovervaginalewd", "rightcovervaginalewd", "leftcoverpenislewd", "rightcoverpenislewd", "leftcoveranuslewd", "rightcoveranuslewd",
			/* feetaction */
			"grab", "vaginagrab", "grabrub", "vaginagrabrub", "rub",
			/* mouthaction */
			"peniskiss", "kisslips", "kissskin", "suck", "lick", "ejacswallow", "moan", "breastsuck", "breastlick", "swallow", "movetochest", "othervagina", "mouth", "kissback", "vaginalick", "oraledge", "askchoke", "anallick", "analkiss", "askrough", "condoms", "noCondoms",
			/* penisaction */
			"penistovagina", "penistoanus", "penisvaginafuck", "penisanusfuck", "othermouthtease", "othermouthrub", "othermouthcooperate", "tease", "cooperate", "otheranustease", "otheranusrub", "otheranuscooperate", "clitrub", "vaginaEdging", "otheranusEdging", "handtease", "handAnusRub", "handcooperate", "strokerCooperate",
			/* fencing */
			"otherpenisrub", "penistopenis", "penistopenisfuck", "fencingcooperate",
			/* vaginaaction */
			"vaginatopenis", "vaginapenisfuck", "othervaginarub", "vaginatovagina", "vaginatovaginafuck", "tribcooperate", "penisEdging", "tribedge", "vaginatopenisdouble", "vaginapenisdoublefuck", "penispussydouble", "penisanusdvp", "forceImpregnation",
			/* anusaction */
			"anustopenis", "anuspenisfuck", "penistease", "otherMouthAnusRub", "otherAnusRub", "penisEdging",
			/* doubleanusaction */
			"anustopenisdouble", "anuspenisdoublefuck", "penisdoubletease", "penisDoubleEdging", "doublecooperate", "penisanusdouble",
		],
		wraith: [
			/* leftaction or rightaction */
			"leftacceptW", "rightacceptW", "leftstruggleW", "rightstruggleW",
			/* feetaction */
			"feetacceptW",
			/* mouthaction */
			"mouthacceptW", "handbiteW",
		],
	},
	Tentacle: {
		def: [
			/* leftaction or rightaction */
			"lefthittentacle", "righthittentacle", "lefthit", "righthit", "leftbanish", "rightbanish",
			/* feetaction */
			"feethit",
			/* mouthaction */
			"mouthbitetentacle",
		],
		brat: [
			/* leftaction or rightaction */
			"leftfold", "rightfold", "leftstruggleweak", "rightstruggleweak",
			/* feetaction */
			"feetHold",
			/* mouthaction */
			"mouthpullawaytentacle", "stifleorgasm", "stifle", "mouthlulltentacle",
			/* penisaction */
			"penispullawaytentacle",
			/* vaginaaction */
			"vaginapullawaytentacle",
			/* anusaction */
			"anuspullawaytentacle",
		],
		sub: [
			/* leftaction or rightaction */
			"leftgrabtentacle", "rightgrabtentacle", "leftrubtentacle", "rightrubtentacle", "showbottomtentacle", "showthighstentacle", "showmouthtentacle", "showpenistentacle", "showvaginatentacle", "leftgrab", "rightgrab", "leftrub", "rightrub", "showbottom", "showthighs", "showmouth",
			/* feetaction */
			"feetgrab", "feetrubtentacle",
			/* mouthaction */
			"mouthlicktentacle", "mouthkisstentacle", "mouthcooperatetentacle",
			/* penisaction */
			"penisrubtentacle", "peniscooperatetentacle",
			/* vaginaaction */
			"vaginarubtentacle", "vaginacooperatetentacle",
			/* anusaction */
			"anusrubtentacle", "anuscooperatetentacle",
			/* bottomuse */
			"bottomrubtentacle",
			/* breastuse */
			"chestrubtentacle",
		],
		meek: [
			/* leftaction or rightaction */
			"leftprotect", "rightprotect", "leftgrip", "rightgrip", "leftcurl", "rightcurl",
			/* feetaction */
			"feetCurl",
			/* mouthaction */
			"letout", "letoutorgasm", "noises",
		],
	},
	Vore: {
		brat: [
			"leftescape", "rightescape", "lefthold", "righthold", "leftvorefree", "rightvorefree", "leftfold", "rightfold", "leftstruggleweak", "rightstruggleweak", "feetHold",
		],
		meek: [
			"leftprotect", "rightprotect", "leftgrip", "rightgrip", "leftcurl", "rightcurl", "feetCurl",
		],
	},
	Swarm: {
		brat: [
			"leftfree", "rightfree", "frontpurgeleft", "frontpurgeright", "frontclearleft", "frontclearright", "backpurgeleft", "backpurgeright", "backclearleft", "backclearright", "chestclearleft", "chestclearright", "leftfold", "rightfold", "leftstruggleweak", "rightstruggleweak", "feetHold",
		],
		meek: [
			"leftprotect", "rightprotect", "leftgrip", "rightgrip", "leftcurl", "rightcurl", "feetCurl",
		],
		teal: ["swim"],
	},
	Struggle: {
		brat: [
			/* leftaction or rightaction */
			"mouth_strengthen", "mouth_grasp", "vagina_strengthen", "vagina_grasp", "penis_strengthen", "penis_grasp", "anus_strengthen", "anus_grasp", "chest_strengthen", "chest_grasp", "leftfold", "rightfold", "leftstruggleweak", "rightstruggleweak",
			/* feetaction */
			"feetHold",
		],
		meek: [
			/* leftaction or rightaction */
			"leftprotect", "rightprotect", "leftgrip", "rightgrip", "leftcurl", "rightcurl", "rest",
			/* feetaction */
			"evade", "plant", "feetCurl",
		],
		def: [
			/* leftaction or rightaction */
			"capture", "mouth_pull", "mouth_spray", "vagina_pull", "vagina_spray", "guard", "penis_pull", "penis_spray", "anus_pull", "anus_spray", "chest_pull", "chest_spray",
			/* mouthaction */
			"bite",
		],
		sub: [
			/* leftaction or rightaction */
			"mouth_stroke", "vagina_stroke", "penis_stroke", "anus_stroke", "chest_stroke",
			/* mouthaction */
			"open", "suck",
		],
	},
	Machine: {
		brat: ["leftfold", "rightfold", "leftstruggleweak", "rightstruggleweak", "vaginal_push", "anal_push", "feetHold"],
		def: ["chain_struggle", "whack", "vaginal_whack", "anal_whack"],
		meek: ["leftprotect", "rightprotect", "leftgrip", "rightgrip", "leftcurl", "rightcurl", "feetCurl"],
	},
	Self: {
		brat: [
			/* leftaction or rightaction */
			"leftfree", "rightfree", "leftcovervagina", "leftcoverpenis", "leftcoveranus", "rightcovervagina", "rightcoverpenis", "rightcoveranus", "leftunderpull", "leftskirtpull", "leftlowerpull", "leftupperpull", "rightunderpull", "rightskirtpull", "rightlowerpull", "rightupperpull", "leftfold", "rightfold", "leftstruggleweak", "rightstruggleweak", "feetHold",
		],
		meek: [
			/* leftaction or rightaction */
			"leftprotect", "rightprotect", "leftgrip", "rightgrip", "leftcurl", "rightcurl", "behind", "pickupSexToy",
			/* feetaction */
			"evade", "plant", "feetCurl",
		],
		sub: [
			/* Masturbate */
			"leftmasturbatepenis", "rightmasturbatepenis", "leftmasturbatepussy", "rightmasturbatepussy", "leftmasturbateanus", "rightmasturbateanus", "dildoSelfPussyEntrance", "dildoSelfAnusEntrance", "strokerSelfPenisEntrance", "strokerSelfPenis", "lubepussy", "lubepenis", "lubeanus", "removebuttplug",
		],
		teal: ["swim"],
	},
};
window.combatActionColours = combatActionColours;

function combatListColor(name, value, type) {
	const action = (value || V[name]).replace(/\d+/g, "");
	const encounterType = type || "Default";
	for (const color in combatActionColours[encounterType]) {
		if (combatActionColours[encounterType][color].includes(action)) return color;
	}
	return "white";
}
window.combatListColor = combatListColor;
DefineMacroS("combatListColor", combatListColor);

function combatButtonAdjustments(name, extra) {
	jQuery(document).on("change", "#listbox-" + name, { name, extra }, function (e) {
		/* console.log(e.data); */
		Wikifier.wikifyEval("<<replace #" + e.data.name + "Difficulty>><<" + e.data.name + "Difficulty" + e.data.extra + ">><</replace>>");
		$("#" + e.data.name + "Select").removeClass("whiteList bratList meekList defList subList");
		$("#" + e.data.name + "Select").addClass(combatListColor(e.data.name, undefined, e.data.extra) + "List");
	});
	return "";
}
DefineMacroS("combatButtonAdjustments", combatButtonAdjustments);

function combatDefaults() {
	jQuery(document).on("change", "#listbox--defaultoption", function (e) {
		Wikifier.wikifyEval("<<replace #othersFeelings>><<othersFeelings " + this.value + ">><</replace>>");
	});
	return "";
}
DefineMacroS("combatDefaults", combatDefaults);

/*
 * Explanation for the actionsSuccessPerSkill() function:
 * The following formula shows the old skill chance calculation.
 * (1000 - ($rng * 10) - ($enemytrust * 10) - $skill + $enemyanger) lte (($enemyarousalmax / ($enemyarousal + 1)) * 100)
 * Rearranged to
 * $skill + ($enemytrust * 10) + (($enemyarousalmax / ($enemyarousal + 1)) * 100) + ($rng * 10) gte 1000 + $enemyanger
 * The first half of the formula must be higher than the second half. So the higher the left values, the easier the action. The higher the right values, the harder the action.
 * $skill is the skill being used. That could be $handskill, $vaginalskill, $seductionskill, etc.
 * ($enemytrust * 10) is simply how much the NPC trust the player. Since $enemytrust can be negative, a bad trust can result in an increase in difficulty.
 * (($enemyarousalmax / ($enemyarousal + 1)) * 100) is the relative NPC arousal. This value can never be 100, except on the last turn.
 * The current arousal being divided by the max arousal means the higher the arousal (and by consequence the arousal percentage) the more difficult the action becomes (since the value will be lower).
 * This also means actions are more likely to succeed during the start of the combat, and get harder as the combat goes on.
 * ($rng * 10) is simply the random part of the equation, so the chance is not always locked into one result. This value varies between 0 and 1000, at a base 10 (so it can't be anything that's not a multiple of 10).
 * 1000 is the base difficulty. This rules how high the skill needs to be if all other values are 0. The higher the base difficulty, the harder the action. This is usually the main factor determining the success of the action.
 * $enemyanger is just like the trust part, but not multiplied. This means anger has 10x less impact in the action than trust, however $enemyanger cannot be negative and could be much higher than trust.
 *
 * Another form of the formula is written as
 * (700 - ($rng * 10) - ($enemytrust * 10) - $handskill + $enemyanger) lte (($enemyarousalmax / ($enemyarousal + 1)) * $_npc.clothes[$_clothesTarget].integrity)
 * This is the difficulty to undress an NPC. The base difficulty is lower, but the arousal multiplier is different. The 100 multiplier is replaced by the NPC's clothes' integrity, which is often higher than 100. The more tattered the clothes, the harder to succeed in the action (the arousal side becomes lower).
 *
 * The function uses the following formula:
 * skill + trust + (arousalfactor * multiplier) + rng >= basedifficulty + anger
 * Which is the same as the previous formula, just renamed.
 * trust will always be $enemytrust * 10
 * arousalfactor will always be $enemyarousalmax / ($enemyarousal + 1)
 * multiplier, if not passed as an argument, will always be 100 (to complement the ($enemyarousalmax / ($enemyarousal + 1) * 100 format).
 * rng will always be $rng * 100
 * basedifficulty, if not passed as an argument, will always be 1000
 * anger is simply $enemyanger, renamed to fit in the format.
 * skill will be the selected skill. The function uses a required string argument which is skillname, being "hand", "vaginal", "seduction", etc. Whichever string is passed will be added to "skill" to make the skill variable.
 * E.g. the function passes "anal" as the only argument (and thus skillname is "anal"). skill will become the value of $analskill used in calculation.
 * So skillname is a string, and skill is an integer. Why not simply pass the skill value as the argument? Because of possible future variants, such as moor luck, affecting some variable and not the other.
 * targetid is an optional value, that doesn't see use currently but can possibly be required in the future in case any of the "enemy" variables (such as $enemyarousal or $enemytrust) become individual values ("per NPC", as health currently is).
 *
 * The output is simply: true if the action is a success, and false if the action fails.
 */
/**
 * Checks skill value against combat math to determine success of an action.
 *
 * @param {string} skillname Simple skill name, "anus" "hand" "feet" etc.
 * @param {number} targetid The targetted NPC's id.
 * @param {number} npc The chosen NPC's fullDescription, used solely for check that determine if encounters remain consensual
 * @param {number} basedifficulty Difficulty of the check, default 1000.
 * @param {number} multiplier Multiplier on enemy arousal, default 100.
 * @returns {boolean}
 */
function combatSkillCheck(skillname, targetid = 0, npc = "", basedifficulty = 1000, multiplier = 100) {
	const skill = currentSkillValue(skillname + "skill");
	const rng = V.rng * 10;
	const arousalfactor = V.enemyarousalmax / (V.enemyarousal + 1);
	const trust = V.enemytrust * 10;
	const anger = V.enemyanger;

	if (arousalfactor * multiplier + skill + trust + rng >= basedifficulty + anger) {
		return true;
	} else if (["Alex", "Robin"].includes(npc) || (npc === "Sydney" && !V.loveDrunk) || (npc === "Great Hawk" && V.syndromebird) || V.consensualGuaranteed) {
		return true;
	} else {
		return false;
	}
}
window.combatSkillCheck = combatSkillCheck;

function hairdressersReset() {
	$(() =>
		$("#hairDressers").on("change", ".macro-listbox, .macro-radiobutton, .macro-checkbox", function (e) {
			Wikifier.wikifyEval("<<replace #hairDressers>><<hairDressersOptions>><</replace>>");
			Wikifier.wikifyEval('<<replace #currentCost>>낼 요금: £<<print _currentCost / 100>><</replace>><<numberify "#passages > .passage">>');
		})
	);
}
DefineMacro("hairdressersReset", hairdressersReset);

function hairdressersResetAlt() {
	$(() =>
		$("#hairDressersSydney").on("click", ".macro-cycle", function (e) {
			Wikifier.wikifyEval("<<replace #hairDressersSydney>><<hairDressersOptionsSydney>><</replace>>");
			Wikifier.wikifyEval('<<replace #currentCost>>낼 요금: £<<print _currentCost / 100>><</replace>><<numberify "#passages > .passage">>');
		})
	);
}
DefineMacro("hairdressersResetAlt", hairdressersResetAlt);

function browsDyeReset() {
	jQuery(document).on("change", "#listbox-browsdyeoption", function (e) {
		Wikifier.wikifyEval("<<replace #browsColourPreview>><<browsColourPreview>><</replace>>");
	});
}
DefineMacro("browsDyeReset", browsDyeReset);

function NPCSettingsReset() {
	jQuery(".passage").on("change", "#listbox--npcid", function (e) {
		Wikifier.wikifyEval("<<replace #npcSettingsMenu>><<npcSettingsMenu>><</replace>>");
	});
}
DefineMacro("NPCSettingsReset", NPCSettingsReset);

function loveInterestFunction() {
	jQuery(document).on("change", "#listbox-loveinterestprimary", function (e) {
		Wikifier.wikifyEval("<<replace #loveInterest>><<loveInterest>><</replace>>");
	});
	jQuery(document).on("change", "#listbox-loveinterestsecondary", function (e) {
		Wikifier.wikifyEval("<<replace #loveInterest>><<loveInterest>><</replace>>");
	});
}
DefineMacro("loveInterestFunction", loveInterestFunction);

function cheatPregnancyNPCReset() {
	jQuery("#customOverlayContent").on("change", "#listbox--pregnantnpcid", function (e) {
		Wikifier.wikifyEval("<<replace #cheatPregnancyNPC>><<cheatPregnancyNPC _pregnantNPCId>><</replace>>");
	});
}
DefineMacro("cheatPregnancyNPCReset", cheatPregnancyNPCReset);

function featsPointsMenuReset() {
	jQuery(document).on("change", "#listbox--upgradenameid", () => {
		Wikifier.wikifyEval("<<updateFeatsPointsMenu>>");
	});
	return "";
}
DefineMacroS("featsPointsMenuReset", featsPointsMenuReset);

function startingPlayerImageReset() {
	jQuery(document).on("change", "#settingsDiv .macro-radiobutton,#settingsDiv ,#settingsDiv .macro-checkbox", () => {
		Wikifier.wikifyEval("<<startingPlayerImageUpdate>>");
	});
	return "";
}
DefineMacroS("startingPlayerImageReset", startingPlayerImageReset);

function deck() {
	const names = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
	const cards = [];

	for (let s = 0; s < suits.length; s++) {
		for (let n = 0; n < names.length; n++) {
			cards.push({ value: n + 2, name: names[n], suits: suits[s] });
		}
	}

	return cards;
}
window.deck = deck;

function ordinalSuffixOf(i) {
	const j = i % 10;
	const k = i % 100;
	if (j === 1 && k !== 11) {
		return i + "st";
	}
	if (j === 2 && k !== 12) {
		return i + "nd";
	}
	if (j === 3 && k !== 13) {
		return i + "rd";
	}
	return i + "th";
}
window.ordinalSuffixOf = ordinalSuffixOf;

/**
 * Given there are {deckCount} cards in the deck and {markedCount} of them have been marked by the player,
 *   calculates the chance that the player will see at least {atLeast} number of marked cards (from the top of the deck),
 *   provided they can only see up to {depth} cards from the top.
 *
 * Use this debug function to calculate the probability to tweak the max depth and max count values for game balance, for the mark cards cheat feature.
 *
 * For example, if the deck is standard (52 cards), the player can see up to 3 cards from the top and the player has marked 8 cards,
 *   the chance that they will see at least 1 card at the start of a round is calculateMarkedChance(52, 8, 3, 1) = 0.4 (which means they'll see at least 1 marked card in 40% of their games,
 *   the first round at least).
 * If that's too high of a chance, we could, for example, decrease their depth by 1, or decrease the max marked count by 2.
 *   Thus, calculateMarkedChance(52, 8, 2, 1) = 0.28, so 28%, and calculateMarkedChance(52, 6, 3, 1) = 0.31, so 31%.
 *
 * Arguably, seeing what card is third from the top is also less useful than being able to more consistently see the top card or the dealer's hole card, so
 *   it's worth assuming the REAL depth is 1/2 even if the value is passed as 3 (so while debugging, always also calculate with depth=1 or depth=2 and see if the number still seems fair).
 *
 * Also, note that the dealer's hole card is included in the depth. This means that if the depth is 3, then it calculates the chance the player will either see one of the top 2 cards or the dealer's second card.
 *
 * @param {number} deckCount  The number of cards in the deck.
 * @param {number} markedCount  The number of cards the player has (or can) mark in a deck.
 * @param {number} depth  How many cards the player can see from the top of the deck (including the dealer's hole card) (to identify if they're marked or not).
 * @param {number} atLeast  At least how many cards the player will see (from <depth> cards from the top of the deck).
 * @param {boolean} doLog = false, if true - logs the steps of the solution.
 * @returns {number} Percentage chance.
 */
function calculateMarkedChance(deckCount, markedCount, depth, atLeast, doLog = false) {
	// we calculate how many possible ways we can pull DEPTH amount of cards from the deck (and put them in the front of the deck)
	const totalEvents = nCr(deckCount, depth);
	const logMessages = [];
	const log = m => {
		if (doLog) {
			logMessages.push(m);
		}
	};
	log(`DEPTH=${depth} cards can be placed in front of the deck from a deck of ${deckCount} cards in ${deckCount}c${depth} = ${totalEvents} ways.`);

	let favorableEvents = 0;

	// as per the algorithm, we go from how many marked cards we need at the very least, to either how many marked cards there are, or to how deep we can go (whichever is the limit)
	const possibleMarkedCardsVisibleLimit = Math.min(markedCount, depth);
	for (let nMarkedPicked = atLeast; nMarkedPicked <= possibleMarkedCardsVisibleLimit; ++nMarkedPicked) {
		// we calculate how many possible ways we can pull a valid number of marked cards from the deck
		//   by dividing the cards into a pool of
		//	* marked cards (and calculating how many ways we can pull the valid nMarkedPicked cards from the pool of markedCount marked cards),  nCr(markedCount, nMarkedPicked)
		//	* unmarked cards (and calculating how many ways we can pull the remaining possibleMarkedCardsVisibleLimit-nMarkedPicked non-marked cards from the pool of deck-markedCount unmarked cards), ncr(deck-markedCount, possibleMarkedCardsVisibleLimit-nMarkedPicked)
		//   and then we multiply the mutually exclusive combinations to get all possible combinations (cross-joins) of the two (since for each way we can pull (say) 1 marked card, there's the second number of ways we can pull the remaining non marked ones)
		const markedPoolWays = nCr(markedCount, nMarkedPicked);
		const unmarkedPoolWays = nCr(deckCount - markedCount, possibleMarkedCardsVisibleLimit - nMarkedPicked);
		const totalWays = markedPoolWays * unmarkedPoolWays;
		favorableEvents += totalWays;
		// log(`One marked card can be picked from MARKED=1 cards in 1c1 = 1 ways, and the remaining three (which are not marked) can be picked from DECK=5-MARKED=1 = 4 cards in 4c3 = 4 ways.
		log(
			`${nMarkedPicked} marked cards can be picked from MARKED=${markedCount} cards in ${markedCount}c${nMarkedPicked} = ${markedPoolWays} ways,` +
				`and the remaining ${deckCount - markedCount} (which are not marked) can be picked from DECK=${deckCount}-MARKED=${markedCount} = ${
					deckCount - markedCount
				} cards in ${deckCount - markedCount}c${possibleMarkedCardsVisibleLimit - nMarkedPicked} = ${unmarkedPoolWays} ways.\n` +
				`${markedPoolWays}*${unmarkedPoolWays} = ${totalWays} ways.`
		);
	}

	console.log(logMessages.join("\n"));
	return favorableEvents / totalEvents;
}
window.calculateMarkedChance = calculateMarkedChance;

function shuffle(o) {
	// prettier-ignore
	for (
		let j, x, i = o.length;
		i;
		j = parseInt(State.random() * i), x = o[--i], o[i] = o[j], o[j] = x
	);
	return o;
}
window.shuffle = shuffle;

function updateAskColour() {
	jQuery(document).on("change", "#listbox-askaction", function (e) {
		Wikifier.wikifyEval("<<replaceAskColour>>");
	});
	return "";
}
DefineMacroS("updateAskColour", updateAskColour);

function bulkProduceValue(plant, quantity = 250) {
	if (plant != null) {
		const baseCost = (plant.plant_cost * quantity) / 2;
		const seasonBoost = !plant.season.includes(Time.season) ? 1.1 : 1;
		return Math.floor(baseCost * seasonBoost);
	}
}
window.bulkProduceValue = bulkProduceValue;

function toTitleCase(str) {
	const exclude = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "if", "in", "of", "on", "or", "the", "to", "up", "yet"]);
	return str.toLowerCase().replace(/\b\w[\w']*\b/g, (word, i) => {
		return exclude.has(word) && i !== 0 ? word : word.toUpperFirst();
	});
}
window.toTitleCase = toTitleCase;

function numbersBetween(start, end, step = 1) {
	return Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step);
}
window.numbersBetween = numbersBetween;

function getRobinLocation() {
	if (C.npc.Robin.init !== 1) {
		return;
	} else if (V.robinlocationoverride && V.robinlocationoverride.during.includes(Time.hour)) {
		T.robin_location = V.robinlocationoverride.location;
	} else if (["docks", "landfill", "dinner", "pillory", "mansion"].includes(V.robinmissing)) {
		T.robin_location = V.robinmissing;
	} else if (!between(Time.hour, 7, 20)) {
		// if hour is 6 or lower, or 21 or higher.
		T.robin_location = "sleep";
	} else if (Time.schoolDay && between(Time.hour, 8, 15)) {
		T.robin_location = "school";
	} else if (Time.hour === 16 && between(Time.minute, 31, 59)) {
		if (!V.daily.robin.bath) {
			T.robin_location = "bath";
		} else {
			T.robin_location = "orphanage";
		}
	} else if (V.halloween === 1 && between(Time.hour, 16, 18) && Time.monthDay === 31) {
		T.robin_location = "halloween";
	} else if (Time.isWeekEnd() && between(Time.hour, 9, 16) && C.npc.Robin.trauma < 80) {
		T.robin_location = Time.season === "winter" ? "park" : "beach";
	} else if (V.englishPlay === "ongoing" && V.englishPlayDays === 0 && Time.hour >= 17 && Time.hour < 21) {
		T.robin_location = "englishPlay";
	} else {
		T.robin_location = "orphanage";
	}
	return T.robin_location;
}
window.getRobinLocation = getRobinLocation;

function setRobinLocationOverride(loc, hour) {
	const override = {
		location: loc,
		during: [],
	};
	if (Array.isArray(hour)) override.during = hour;
	else override.during = [hour];
	// note: overrides get reset at midnight (in the <<day>> widget)
	V.robinlocationoverride = override;
}
window.setRobinLocationOverride = setRobinLocationOverride;

function getRobinCrossdressingStatus(crossdressLevel) {
	// Note returns 2 if Robin is crossdressing or 0 if not comfortable enough at that location
	// Traumatised Robin will not crossdress.
	if (C.npc.Robin.init !== 1) {
		return;
	}
	T.robin_cd = 0;
	if (C.npc.Robin.trauma >= 40) {
		return;
	}
	switch (getRobinLocation()) {
		case "orphanage":
		case "sleep":
			if (crossdressLevel >= 2) T.robin_cd = 2;
			break;
		case "park":
		case "beach":
			if (crossdressLevel >= 4) T.robin_cd = 2;
			break;
		case "school":
			if (crossdressLevel >= 5) T.robin_cd = 2;
			break;
		case "missing":
			T.robin_cd = 0;
			break;
		default:
			T.robin_cd = 0;
	}
	return T.robin_cd;
}
window.getRobinCrossdressingStatus = getRobinCrossdressingStatus;

/*
	TEMPORARY - remove once obsolete
	Temporary function until location framework is in place - to detect if a NPC is in the park
	Uses same checks as other Park NPC checks
 */
function isInPark(name) {
	switch (name.toLowerCase()) {
		case "kylar":
			// prettier-ignore
			return C.npc.Kylar.state === "active"
				&& Weather.precipitation === "none"
				&& Time.dayState === "day" && V.kylarwatched !== 1;
		case "robin":
			return getRobinLocation() === "park";
		case "whitney":
			// prettier-ignore
			return ["active", "rescued"].includes(C.npc.Whitney.state)
				&& C.npc.Whitney.init === 1 && Weather.precipitation !== "none"
				&& Time.dayState === "day" && !Time.schoolTime
				&& V.daily.whitney.park === undefined && V.pillory.tenant.special.name !== "Whitney";
		default:
			return false;
	}
}
window.isInPark = isInPark;

window.DefaultActions = {
	create(isMinimal = false, preload = false) {
		let storage = {};
		setup.actionsTypes.combatTypes.forEach(type => {
			storage[type] = {};
			// Decides whether you create all permutations of the structure.
			// Usually set isMinimal if saving to file for reduced memory.
			if (!isMinimal) {
				setup.actionsTypes.personTypes.forEach(person => {
					storage[type][person] = {};
					setup.actionsTypes.actionTypes.forEach(part => {
						if (person === "Tentacles" && part === "askActions") {
							// Do not add askActions to tentacle enemies.
							return;
						} else if (person !== "Tentacles" && part === "regrab") {
							// Do not add regrab to non-tentacle enemies.
							return;
						}
						storage[type][person][part] = [];
					});
				});
			}
		});
		if (preload) {
			// Load old actions into new structure.
			storage = this.loadOld(V.actionDefaults, storage);
		}
		return storage;
	},
	check(storage) {
		if (storage === undefined) {
			return;
		}
		if (storage.consensual === undefined || storage.rape === undefined) {
			storage = this.create(true, true);
		}
		return storage;
	},
	setup(recreate = false) {
		if (recreate || V.actionDefaults === undefined) {
			return this.create(true);
		}
		return V.actionDefaults;
	},
	load(from = {}) {
		Object.keys(from).forEach(type => {
			Object.keys(from[type]).forEach(person => {
				Object.keys(from[type][person]).forEach(part => {
					const actions = this.get(type, person, part);
					if (Array.isArray(actions)) {
						actions.forEach(action => {
							from[type][person][part].pushUnique(action);
						});
					} else {
						if (part === "regrab") {
							const action = actions ? 1 : 0;
							from[type][person][part].pushUnique(action);
						}
					}
				});
			});
		});
		return from;
	},
	loadOld(from, to) {
		setup.actionsTypes.personTypes.forEach(person => {
			setup.actionsTypes.combatTypes.forEach(type => {
				setup.actionsTypes.actionTypes.forEach(part => {
					const actions = this.get(person, type, part, from);
					if (Array.isArray(actions)) {
						actions.forEach(action => {
							this.add(type, person, part, action, { value: to });
						});
					} else {
						if (part === "regrab") {
							const action = actions ? 1 : 0;
							this.add(type, person, part, action, { value: to });
						}
					}
				});
			});
		});
		return to;
	},
	save(from, callback = this.add) {
		if (from === undefined) {
			return;
		}
		V.actionDefaults = this.setup(true);
		// Assume the structure is valid.
		const defaultTypes = Object.keys(from);
		defaultTypes.forEach(type => {
			const defaultPeople = Object.keys(from[type]);
			defaultPeople.forEach(person => {
				const defaultParts = Object.keys(from[type][person]);
				defaultParts.forEach(part => {
					const actionSets = from[type][person][part];
					if (actionSets !== undefined) {
						actionSets.forEach(action => {
							if (part === "regrab") {
								action = action ? 1 : 0;
							}
							callback(type, person, part, action, { value: V.actionDefaults });
						});
					}
				});
			});
		});
	},
	add(type, person, part, action, to = { value: V.actionDefaults }) {
		if (action === "rest") {
			return;
		}
		if (to.value[type][person] === undefined) {
			to.value[type][person] = {};
		}
		if (to.value[type][person][part] === undefined) {
			to.value[type][person][part] = [];
		}
		to.value[type][person][part].pushUnique(action);
	},
	addMany(type, person, part, actions, to = { value: V.actionDefaults }) {
		// This function should take a list of actions, for a given type (rape/consensual)
		// and a given person (submissive, defiant, tentacles?)
		// and a given part (leftaction, rightaction, etc.. down to regrab?)
		// and add them to the actionDefaults.

		// This filters actions down to any actions that aren't "rest",
		// or where part is regrab -> truthy/falsy value of each action.
		const filteredActions = part === "regrab" ? actions.map(action => !!action) : actions.filter(action => action !== "rest");

		if (!filteredActions.length) {
			return;
		}
		if (to.value[type][person] === undefined) {
			to.value[type][person] = {};
		}
		if (to.value[type][person][part] === undefined) {
			to.value[type][person][part] = [];
		}
		filteredActions.forEach(action => {
			to.value[type][person][part].pushUnique(action);
		});
	},
	get(type, person, part, from = V.actionDefaults, defaultValue = "rest") {
		if (from[type] === undefined || from[type][person] === undefined || from[type][person][part] === undefined) {
			return [defaultValue];
		}
		return from[type][person][part];
	},
	setDefaults() {
		V.actionDefaults = this.create(true);
		let type = "rape";
		this.addMany(type, "Submissive", "leftaction", ["leftchest"]);
		this.addMany(type, "Submissive", "rightaction", ["rightchest"]);
		this.addMany(type, "Submissive", "mouthaction", ["plead", "suck", "kiss", "breastsuck"]);
		this.addMany(type, "Submissive", "penisaction", ["tease", "cooperate"]);
		this.addMany(type, "Submissive", "vaginaaction", ["penistease", "cooperate"]);
		this.addMany(type, "Submissive", "anusaction", ["penistease", "cooperate"]);
		this.addMany(type, "Submissive", "feetaction", ["grabrub", "grabrub", "vaginagrabrub"]);
		this.addMany(type, "Defiant", "leftaction", ["lefthit", "leftstruggle"]);
		this.addMany(type, "Defiant", "rightaction", ["penwhack", "righthit", "rightstruggle", "hypnosiswhack"]);
		this.addMany(type, "Defiant", "mouthaction", ["pullaway", "bite", "breastbite", "headbutt"]);
		this.addMany(type, "Defiant", "penisaction", ["escape", "otheranusescape", "othermouthescape"]);
		this.addMany(type, "Defiant", "vaginaaction", ["escape", "othermouthescape"]);
		this.addMany(type, "Defiant", "anusaction", ["escape", "othermouthescape"]);
		this.addMany(type, "Defiant", "feetaction", ["kick"]);
		this.addMany(type, "Tentacles", "regrab", [0]);
		type = "consensual";
		this.addMany(type, "Submissive", "leftaction", ["leftchest"]);
		this.addMany(type, "Submissive", "rightaction", ["rightchest"]);
		this.addMany(type, "Submissive", "mouthaction", ["kiss", "suck", "breastsuck", "breastlick"]);
		this.addMany(type, "Submissive", "penisaction", ["tease", "cooperate"]);
		this.addMany(type, "Submissive", "vaginaaction", ["penistease", "cooperate"]);
		this.addMany(type, "Submissive", "anusaction", ["penistease", "cooperate"]);
		this.addMany(type, "Defiant", "leftaction", [0]);
		this.addMany(type, "Defiant", "rightaction", ["penwhack"]);
		this.addMany(type, "Defiant", "mouthaction", ["breastpull", "breastclosed"]);
		this.addMany(type, "Defiant", "penisaction", ["escape", "otheranusescape", "othermouthescape"]);
		this.addMany(type, "Defiant", "vaginaaction", ["escape", "othermouthescape"]);
		this.addMany(type, "Defiant", "anusaction", ["escape", "othermouthescape"]);
		this.addMany(type, "Tentacles", "regrab", [0]);
		return V.actionDefaults;
	},
};

function selectWardrobe(targetLocation = V.wardrobe_location, type) {
	let wardrobe = V.wardrobes[targetLocation];
	if (type !== "return" && wardrobe?.locationRequirement && !wardrobe.locationRequirement.includes(V.location)) {
		V.wardrobe_location = "wardrobe";
		wardrobe = V.wardrobe;
	}
	return !targetLocation || targetLocation === "wardrobe" || !V.wardrobes[targetLocation] ? V.wardrobe : wardrobe;
}
window.selectWardrobe = selectWardrobe;

function transferClothing(slot, index, newWardrobe) {
	let oldWardrobeObject;
	if (V.wardrobe_location === "wardrobe") {
		oldWardrobeObject = V.wardrobe;
	} else {
		oldWardrobeObject = V.wardrobes[V.wardrobe_location];
	}
	let newWardrobeObject;
	if (newWardrobe === "wardrobe") {
		newWardrobeObject = V.wardrobe;
	} else {
		newWardrobeObject = V.wardrobes[newWardrobe];
	}
	if (oldWardrobeObject && newWardrobeObject) {
		newWardrobeObject[slot].push(oldWardrobeObject[slot][index]);
		oldWardrobeObject[slot].deleteAt(index);
	}
}
window.transferClothing = transferClothing;

function clothingData(slot, item, data) {
	if (item[data] !== undefined) return item[data];
	return setup.clothes[slot][clothesIndex(slot, item)][data];
}
window.clothingData = clothingData;

/**
 * @param {ClothedSlots} slot
 * @param {ClothesItem} item
 * @returns {ClothesItem}
 */
function getSetupClothing(slot, item) {
	return setup.clothes[slot][clothesIndex(slot, item)];
}
window.getSetupClothing = getSetupClothing;

function clothesDataTrimmerLoop() {
	if (!V.passage || V.passage === "Start") return;
	const wardrobeKeys = Object.keys(V.wardrobes);
	setup.clothes_all_slots.forEach(slot => {
		clothesDataTrimmer(V.worn[slot]);
		clothesDataTrimmer(V.carried[slot]);
		if (Array.isArray(V.wardrobe[slot])) {
			V.wardrobe[slot].forEach(item => {
				clothesDataTrimmer(item);
			});
		}
		if (Array.isArray(V.store[slot])) {
			V.store[slot].forEach(item => {
				clothesDataTrimmer(item);
			});
		}

		for (let i = 0, l = wardrobeKeys.length; i < l; i++) {
			if (Array.isArray(V.wardrobes[wardrobeKeys[i]][slot])) {
				V.wardrobes[wardrobeKeys[i]][slot].forEach(item => {
					clothesDataTrimmer(item);
				});
			}
		}
		if (V.tryOn !== undefined) {
			if (V.tryOn.ownedStored !== undefined) {
				if (V.tryOn.ownedStored[slot] !== undefined && V.tryOn.ownedStored[slot] !== null) {
					clothesDataTrimmer(V.tryOn.ownedStored[slot]);
				}
			}
			if (V.tryOn.tryingOn !== undefined) {
				if (V.tryOn.tryingOn[slot] !== undefined && V.tryOn.tryingOn[slot] !== null) {
					clothesDataTrimmer(V.tryOn.tryingOn[slot]);
				}
			}
		}
	});
}
window.clothesDataTrimmerLoop = clothesDataTrimmerLoop;

/*
	Be aware, the shop is excluded from this, clothing items in every other situation requires one of the below methods
	Setup example - setup.clothes.upper[clothesIndex('upper',$worn.upper)].name_cap
	clothingData example - clothingData(_slot, $worn[_slot], "integrity_max")

	The `clothingData example`, allows you to add the variable back to override the setup varient, for example, if you want to increase `integrity_max`

	If any use the `Setup example` and you want to override variables like the `clothingData example`, every instance needs to be converted first, please update the comment below if you do
*/
function clothesDataTrimmer(item) {
	if (!item) return;
	const toDelete = [
		"name_cap", // use `Setup example`
		"iconFile", // use `Setup example`
		"accIcon", // use `Setup example`
		"notuck", // use `Setup example`
		"skirt", // use `Setup example`
		"description", // use `Setup example`
		"colour_options", // use `Setup example`
		"accessory_colour_options", // use `Setup example`
		"fabric_strength", // use `clothingData example`
		"integrity_max", // use `clothingData example`
		"bustresize", // use `clothingData example`
		"sleeve_img", // use `Setup example`
		"breast_img", // use `Setup example`
		"exposed_base", // use `Setup example`
		"vagina_exposed_base", // use `Setup example`
		"anus_exposed_base", // use `Setup example`
		"state_top_base", // use `Setup example`
		"state_base", // use `Setup example`
		"word", // use `Setup example`
		"femininity", // use `Setup example`
		"strap", // use `Setup example`
		"cost", // use `Setup example`
		"shop", // use `Setup example`, should never be added back on to clothing items due to being in `trimmerVersion`
		"short", // use `Setup example`, should never be added back on to clothing items due to being in `trimmerVersion`
		"oldVariable", // use `Setup example`, should never be added back on to clothing items due to being in `trimmerVersion`
		"altDamage", // use `Setup example`
		"hideUnderLower", // use `Setup example`, should never be added back on to clothing items due to being in `trimmerVersion`
	];
	// To prevent it from running on variables multiple times, when updating toDelete, the last of the new additions should be added here
	const trimmerVersion = ["shop", "short", "oldVariable", "hideUnderLower"];
	let version = 0;
	let indexToUpdateVersion = toDelete.indexOf(trimmerVersion[version]);
	toDelete.forEach((v, index) => {
		if (indexToUpdateVersion === -1) {
			// Do Nothing
		} else if (item[v] !== undefined && item[trimmerVersion[version]] !== undefined) {
			delete item[v];
		}
		if (indexToUpdateVersion === index) {
			version++;
			indexToUpdateVersion = toDelete.indexOf(trimmerVersion[version]);
		}
	});
}
window.clothesDataTrimmer = clothesDataTrimmer;

function clothesReturnLocation(item, type) {
	if (!V.multipleWardrobes) return "wardrobe";
	const isolated = ["asylum", "prison"];
	let lastTaken = item.lastTaken;
	// prettier-ignore
	if (
		!lastTaken ||
		(V.multipleWardrobes !== "all" && !isolated.includes(lastTaken)) ||
		!V.wardrobes[lastTaken] ||
		!V.wardrobes[lastTaken].unlocked
	) {
		lastTaken = "wardrobe";
	}
	switch (type) {
		case "rebuy":
			if (isolated.includes(V.location) && item.type.includes(V.location)) return V.location;
			break;
		default:
			if (isolated.includes(V.location)) return V.location;
	}
	if (!isolated.includes(lastTaken)) return lastTaken;
	return "wardrobe";
}
window.clothesReturnLocation = clothesReturnLocation;

function resetClothingState(slot) {
	if (!slot || slot === "genitals") return;
	const setupItem = setup.clothes[slot][clothesIndex(slot, V.worn[slot])];
	// Overwrite the following properties of $worn[slot], IF the corresponding properties are defined in the setupItem.
	// Note that no single item actually has ALL of these properties; It only changes the properties that DO exist on the item.
	V.worn[slot] = {
		...V.worn[slot],
		...Object.fromEntries(
			Object.entries({
				state: setupItem.state_base,
				state_top: setupItem.state_top_base,
				exposed: setupItem.exposed_base,
				skirt_down: setupItem.skirt_down,
				vagina_exposed: setupItem.vagina_exposed_base,
				anus_exposed: setupItem.anus_exposed_base,
			}).filter(([_, p]) => p != null)
		),
	};
}
window.resetClothingState = resetClothingState;

/* Returns array of clothing items that are stored in [loc] */
function clothingInStorage(loc) {
	if (loc == null) return;
	const clothing = [];
	for (const slot of setup.clothingLayer.all) {
		const item = V.store[slot].find(item => item.location === loc);
		if (item && !item.outfitSecondary) {
			item.slot = slot;
			clothing.push(item);
		}
	}
	return clothing;
}
window.clothingInStorage = clothingInStorage;

/* Returns name of the current worn outfit, or "none" if no matches are found */
function currentOutfit() {
	const compareOutfit = outfit => {
		for (const slot of setup.clothingLayer.all) {
			if (V.worn[slot].name !== (outfit[slot] || "naked")) return false;
		}
		return true;
	};
	for (const outfit of V.outfit) {
		if (compareOutfit(outfit)) return outfit.name;
	}
	return "none";
}
window.currentOutfit = currentOutfit;

function isConnectedToHood(slot) {
	// Note: this function currently only works on hoods in the "head" slot, NOT the "over_head" slot.

	// Return false if slot is undefined or not a valid clothing category
	if (!slot || !V.worn[slot]) return false;
	// Return true if this item IS a hood
	if (V.worn[slot].hood && V.worn[slot].outfitSecondary[1] !== "broken" && V.worn[slot].outfitSecondary[1] !== "split") return true;

	// Use the primary clothing slot for the next check if this item is connected to an outfit (and is not the primary item)
	if (V.worn[slot].outfitSecondary && V.worn[slot].outfitSecondary[1] !== "broken" && V.worn[slot].outfitSecondary[1] !== "split") {
		slot = V.worn[slot].outfitSecondary[0];
	}
	if (
		V.worn[slot].hoodposition &&
		(V.worn[slot].hoodposition === "down" ||
			(V.worn[slot].hoodposition === "up" &&
				V.worn[slot].outfitPrimary.head !== "broken" &&
				V.worn[slot].outfitPrimary.head !== "split" &&
				V.worn.head.hood === 1))
	) {
		return true;
	}
	return false;
}
window.isConnectedToHood = isConnectedToHood;

// the 'modder' variable is specifically for modders name, should be kept as a short string
function clothesIndex(slot, itemToIndex) {
	if (!slot || !itemToIndex || !itemToIndex.name || !itemToIndex.variable) {
		/* console.log(`clothesIndex - slot or valid object not provided`); */
		Errors.report(`[clothesIndex]: slot or valid object not provided`, {
			Stacktrace: Utils.GetStack(),
			slot,
			itemToIndex,
		});
		return 0;
	}
	const index = setup.clothes[slot].findIndex(item => item.variable === itemToIndex.variable && item.modder === itemToIndex.modder);
	if (index === -1) {
		console.log(`clothesIndex - ${slot} clothing item index not found for the '${itemToIndex.name}' with the modder set to '${itemToIndex.modder}'`);
		/* try and correct .modder mismatches */
		let oldVariable = false;
		let matches = setup.clothes[slot].filter(item => item.variable === itemToIndex.variable);
		if (matches.length === 0) {
			/* try to find and item that had its variable changed */
			matches = setup.clothes[slot].filter(
				item =>
					Array.isArray(item.oldVariable) &&
					item.oldVariable.find(oldVariableItem => oldVariableItem.name === itemToIndex.name && oldVariableItem.variable === itemToIndex.variable)
			);
			oldVariable = true;
		}
		if (matches.length === 1) {
			const recovery = matches[0];
			itemToIndex.index = recovery.index;
			itemToIndex.modder = recovery.modder;
			if (oldVariable) {
				itemToIndex.name = recovery.name;
				itemToIndex.name_cap = recovery.name_cap;
				itemToIndex.variable = recovery.variable;
				itemToIndex.set = recovery.set;
				itemToIndex.iconFile = recovery.iconFile;
				if (recovery.outfitPrimary) {
					Object.entries(recovery.outfitPrimary).forEach(([key, value]) => {
						if (itemToIndex.outfitPrimary && (itemToIndex.outfitPrimary[key] === "broken" || itemToIndex.outfitPrimary[key] === "split")) {
							// Do Nothing
						} else {
							itemToIndex.outfitPrimary[key] = value;
						}
					});
					itemToIndex.outfitPrimary = recovery.outfitPrimary;
				}
				if (recovery.outfitSecondary && itemToIndex.outfitSecondary[1] !== "broken" && itemToIndex.outfitSecondary[1] !== "split")
					itemToIndex.outfitSecondary[1] = recovery.outfitSecondary[1];
			}
			console.log(`attempting to recover the mismatch, new index is '${recovery.index}'`);
			return recovery.index;
		} else {
			console.log("recovery failed, matches: " + matches);
			return 0;
		}
	}
	return index;
}
window.clothesIndex = clothesIndex;

function currentSkillValue(skill, disableModifiers = 0) {
	let result = V[skill];
	if (!result && result !== 0) {
		/* console.log(`currentSkillValue - skill '${skill}' unknown`); */
		Errors.report(`[currentSkillValue]: skill '${skill}' unknown.`, {
			Stacktrace: Utils.GetStack(),
			skill,
		});
		return 0;
	}
	// Prevents infinate loops, any call to `currentSkillValue` in this function should be written like 'currentSkillValue("skillName", disableModifiers + 1)'
	if (disableModifiers >= 2) return result;
	if (
		// prettier-ignore
		[
			"skulduggery", "physique", "danceskill", "swimmingskill", "athletics", "willpower", "tending", "science", "maths", "english", "history", "housekeeping"
		].includes(skill) &&
		V.moorLuck > 0
	) {
		result = Math.floor(result * (1 + V.moorLuck / 100));
	}
	if (["physique", "danceskill", "swimmingskill", "athletics"].includes(skill) && playerBellySize() >= 10 && playerNormalPregnancyTotal() < 50) {
		switch (playerNormalPregnancyTotal()) {
			case 0:
				T.pregnancyModifier = 36;
				break;
			case 1:
				T.pregnancyModifier = 48;
				break;
			case 2:
				T.pregnancyModifier = 60;
				break;
			case 3:
			case 4:
			case 5:
				T.pregnancyModifier = 78;
				break;
			case 6:
			case 7:
				T.pregnancyModifier = 96;
				break;
			default:
				T.pregnancyModifier = 120;
				break;
		}
		result = Math.floor(result * (1 - playerBellySize() / T.pregnancyModifier));
	}
	switch (skill) {
		case "skulduggery":
			if (V.worn.hands.type.includes("sticky_fingers")) result = Math.floor(result * 1.05);
			if (V.transformationParts.traits.sharpEyes !== "disabled") result = Math.floor(result * 1.05);
			if (V.fox >= 6) result = Math.floor(result * 1.1);
			break;
		case "physique":
			if (["forest", "moor", "farm"].includes(V.location)) {
				if (V.worn.feet.type.includes("heels")) {
					result = Math.floor(result * (1 - V.worn.feet.reveal / 5000));
				}
				if (V.worn.feet.type.includes("rugged")) {
					result = Math.floor(result * (1 + currentSkillValue("feetskill", disableModifiers + 1) / 10000));
				}
			}
			break;
		case "danceskill":
			if (
				V.worn.under_upper.type.includesAny("dance", "naked") &&
				V.worn.under_lower.type.includesAny("dance", "naked") &&
				V.worn.upper.type.includesAny("dance", "naked") &&
				V.worn.lower.type.includesAny("dance", "naked")
			) {
				result = Math.floor(result * 1.05);
			}
			if (V.worn.feet.type.includes("shackle")) {
				result = Math.floor(result * 0.5);
			}
			break;
		case "swimmingskill":
			if (
				V.worn.under_upper.type.includesAny("swim", "naked") &&
				V.worn.under_lower.type.includesAny("swim", "naked") &&
				V.worn.upper.type.includesAny("swim", "naked") &&
				V.worn.lower.type.includesAny("swim", "naked")
			) {
				result = Math.floor(result * 1.05);
			}
			if (V.worn.feet.type.includes("swim")) {
				result = Math.floor(result * (1 + currentSkillValue("feetskill", disableModifiers + 1) / 10000));
			} else if (V.worn.feet.type.includes("heels")) {
				result = Math.floor(result * (0.8 + currentSkillValue("feetskill", disableModifiers + 1) / 10000));
			} else if (!V.worn.feet.type.includes("naked")) {
				result = Math.floor(result * (0.9 + currentSkillValue("feetskill", disableModifiers + 1) / 10000));
			}
			if (V.worn.feet.type.includes("shackle")) {
				result = Math.floor(result * 0.5);
			}
			break;
		case "athletics":
			if (["forest", "moor", "farm"].includes(V.location)) {
				if (V.worn.feet.type.includes("heels")) {
					result = Math.floor(result * (1 - V.worn.feet.reveal / 5000));
				}
				if (V.worn.feet.type.includes("rugged")) {
					result = Math.floor(result * (1 + currentSkillValue("feetskill", disableModifiers + 1) / 10000));
				}
			}
			if (V.worn.feet.type.includes("shackle")) result /= 10;
			break;
		case "willpower":
			if (numberOfEarSlime() >= 2 && V.earSlime.growth > 50) {
				result = Math.floor(result * (0.9 - Math.clamp((V.earSlime.growth - 50) / 1000, 0, 0.1)));
			} else if (numberOfEarSlime() >= 2) {
				result = Math.floor(result * 0.9);
			}
			break;
		case "tending":
			if (V.backgroundTraits.includes("plantlover")) {
				result = Math.floor(result * (1 + V.trauma / (V.traumamax * 2)));
			}
			break;
		case "housekeeping":
			if (V.worn.upper.type.includes("maid")) {
				result = Math.floor(result * 1.05);
			}
			if (V.worn.lower.type.includes("maid")) {
				result = Math.floor(result * 1.05);
			}
			if (V.worn.head.type.includes("maid")) {
				result = Math.floor(result * 1.05);
			}
			if (V.worn.handheld.type.includes("maid")) {
				result = Math.floor(result * 1.05);
			}
			break;
		case "vaginalskill":
			if (V.earSlime.growth > 100) {
				if (V.earSlime.focus === "pregnancy") {
					result = Math.floor(result * (1 + (V.earSlime.growth - 100) / 500));
				} else if (V.earSlime.focus === "impregnation") {
					result = Math.floor(result * (1 - (V.earSlime.growth - 100) / 400));
				}
			}
			if (playerHeatMinArousal()) {
				result = Math.floor(result * (1 + Math.clamp(playerHeatMinArousal(), 0, 4000) / 20000));
			}
			break;
		case "penileskill":
			if (V.earSlime.growth > 100) {
				if (V.earSlime.focus === "impregnation") {
					result = Math.floor(result * (1 + (V.earSlime.growth - 100) / 500));
				} else if (V.earSlime.focus === "pregnancy") {
					result = Math.floor(result * (1 - (V.earSlime.growth - 100) / 400));
				}
			}
			if (playerRutMinArousal()) {
				result = Math.floor(result * (1 + Math.clamp(playerRutMinArousal(), 0, 4000) / 20000));
			}
			break;
		case "analskill":
			if (V.earSlime.growth > 100 && !V.player.vaginaExist && V.earSlime.focus === "pregnancy") {
				result = Math.floor(result * (1 + (V.earSlime.growth - 100) / 500));
			}
			if (playerHeatMinArousal() && canBeMPregnant()) {
				result = Math.floor(result * (1 + Math.clamp(playerHeatMinArousal(), 0, 4000) / 20000));
			}
			break;
		case "seductionskill":
			if (V.earSlime.growth > 50 && !V.earSlime.defyCooldown) {
				result = Math.floor(result * (1 + (V.earSlime.growth - 50) / 600));
			}
			break;
	}
	return result;
}
window.currentSkillValue = currentSkillValue;

/**
 * @param {string} input
 */
function hasSexStatMapper(input) {
	switch (input) {
		case "p":
		case "promiscuity":
		case "promiscuous":
			return "promiscuity";
		case "e":
		case "exhibitionism":
		case "exhibition":
		case "exhibitionist":
			return "exhibitionism";
		case "d":
		case "deviancy":
		case "deviant":
			return "deviancy";
	}
	return null;
}
window.hasSexStatMapper = hasSexStatMapper;

/**
 * @param {string} input
 * @param {number} required
 */
function hasSexStat(input, required) {
	const stat = hasSexStatMapper(input);
	if (stat == null) {
		Errors.report(`[hasSexStat]: input '${stat}' null.`, {
			Stacktrace: Utils.GetStack(),
			stat,
		});
		return false;
	}
	const statValue = V[stat];
	if (!Number.isFinite(statValue)) {
		Errors.report(`[hasSexStat]: sex stat '${stat}' unknown.`, {
			Stacktrace: Utils.GetStack(),
			stat,
		});
		return false;
	}
	switch (required) {
		case 6:
			/* self-destructive, extreme actions, like leglocking a rapist unprotected or provoking a group for no sane benefit. */
			return statValue >= 95;
		case 5:
			/* Extremely lewd actions, like full nude exposure and inciting gangbangs. */
			return statValue >= 75;
		case 4:
			/* Very lewd actions, like giving oral, using your body to get your way, and accepting lecherous propositions. */
			return statValue >= 55;
		case 3:
			/* Moderately lewd actions, like giving handjobs, more lewd exposure/flaunting, and most prostitution. */
			return statValue >= 35;
		case 2:
			/* Modestly lewd actions, like flashing underwear or light coercion. Many seduction checks fall under this level. */
			return statValue >= 15;
		case 1:
			/* Do not use for events or checks, only for checking if value is above level 0. Level 1 actions should always be available. */
			return statValue >= 1;
		default:
			Errors.report(`[hasSexStat]: sex stat requirement outside of possible value range: '${required}' (must be between 1 and 6!).`, {
				Stacktrace: Utils.GetStack(),
				stat,
				required,
			});
			return false;
	}
}
window.hasSexStat = hasSexStat;

function playerIsPenetrated() {
	return [V.mouthstate, V.vaginastate, V.anusstate].some(s => ["penetrated", "doublepenetrated", "tentacle", "tentacledeep"].includes(s));
}
window.playerIsPenetrated = playerIsPenetrated;

function npcAssignClothesToSet(upper, lower) {
	return { upper: T.npcClothesItems.upper[upper], lower: T.npcClothesItems.lower[lower] };
}
window.npcAssignClothesToSet = npcAssignClothesToSet;

function npcMakeNaked(npc, slot) {
	if (slot === "upper") {
		npc.chest = 0;
	} else if (slot === "lower") {
		if (npc.penis !== "none") npc.penis = 0;
		if (npc.vagina !== "none") npc.vagina = 0;
	}
}
window.npcMakeNaked = npcMakeNaked;

function npcEquipSet(npc, set) {
	npc.clothes = { set: set.name };
	Object.entries(set.clothes).forEach(item => {
		if (item[1].name === "naked") {
			npcMakeNaked(npc, item[0]);
		}
		const itemData = setup.clothes[item[0]].find(c => c.name === item[1].name);
		if (!itemData) {
			npc.clothes[item[0]] = {
				name: item[1].name,
				integrity: item[1].integrity_max,
			};
		} else {
			npc.clothes[item[0]] = {
				name: itemData.name,
				integrity: itemData.integrity_max,
			};
		}
	});
}
window.npcEquipSet = npcEquipSet;

function npcSpecifiedClothes(npc, name) {
	const clothingItem = setup.npcClothesSets.filter(set => set.name === name);
	if (clothingItem.length > 0) {
		npcEquipSet(npc, clothingItem[0]);
	} else {
		console.log(`npcSpecifiedClothes - unable to find a clothing item with the name '${name}' for '${npc.fullDescription}'`);
	}
}
window.npcSpecifiedClothes = npcSpecifiedClothes;

/* npc.crossdressing: 0 - doesn't at all, 1 - sometimes, 2 - always */
function npcClothes(npc, type) {
	const crossdressing = npc.crossdressing || 0;
	const gender = ["n"];
	/* if you don't want those always crossdressing to wear neutral clothes
	let gender = [];
	if(crossdressing !== 2) gender.push('n');
	*/

	if (crossdressing < 2) gender.push(npc.pronoun);
	if (crossdressing > 0) gender.push(npc.pronoun === "m" ? "f" : "m");
	let clothingOptions = setup.npcClothesSets.filter(set => (set.type === type || !type) && gender.includes(set.gender));

	if (npc.outfits) {
		const namedNpcClothing = clothingOptions.filter(set => npc.outfits.includes(set.name));
		if (namedNpcClothing.length > 0) {
			clothingOptions = namedNpcClothing;
		}
	}
	if (clothingOptions.length > 0) {
		const clothesSet = clothingOptions.pluck();
		npcEquipSet(npc, clothesSet);
		// Allows you to record the clothing set selected
		return clothesSet.name;
	} else {
		console.log(`npcClothes - unable to find a clothing set with the options for '${npc.fullDescription}' with type '${type}'`);
	}
}
window.npcClothes = npcClothes;

function waterproofCheck(clothing) {
	return clothing.type.includesAny("swim", "stealthy", "rainproof", "waterproof");
}
window.waterproofCheck = waterproofCheck;

function isLoveInterest(name) {
	for (const l in V.loveInterest) if (V.loveInterest[l] === name) return true;
	return false;
}
window.isLoveInterest = isLoveInterest;

function wraithCanHunt() {
	return Time.isBloodMoon() && Time.hour !== 5; // wraith events can't start at 5 AM.
}
window.wraithCanHunt = wraithCanHunt;

function wraithSleepEventCheck() {
	return V.wraith.state !== "" && V.wraith.nightmare === 1 && wraithCanHunt();
}
window.wraithSleepEventCheck = wraithSleepEventCheck;

function fameTotal() {
	let result = 0;
	for (const key in V.fame) {
		result += V.fame[key];
	}
	return result;
}
window.fameTotal = fameTotal;

function fameSum(...fameTypes) {
	let result = 0;
	fameTypes.forEach(fameType => (result += V.fame[fameType]));
	return result;
}
window.fameSum = fameSum;

function checkTFparts() {
	const tfParts = {};
	// Iterate over each transformation
	Object.entries(V.transformationParts).forEach(([tfName, tf]) =>
		Object.entries(tf).forEach(([pName, pStatus]) => {
			/* Iterate over each part of each transformation */
			if (pStatus !== "disabled" && pStatus !== "hidden") {
				/* Filter out the parts that the player doesn't have or is suppressing */
				tfParts[tfName + pName.toUpperFirst()] = true; /* Assign properties with camelCase names for each tf part that is visible */
			}
		})
	);
	return tfParts;
}
window.checkTFparts = checkTFparts;

// prettier-ignore
function getSexesFromRandomGroup() {
	if (maleChance() <= 0) { /* Only females. */
		if (V.dgchance <= 0) return SexTypes.ALL_FEMALES;		/* All females, no dickgirls. Always vaginal. */
		if (V.dgchance >= 100) return SexTypes.ALL_DICKGIRLS;	/* All females, all dickgirls. Always penises. */
	}
	if (maleChance() >= 100) { /* Only males. */
		if (V.cbchance <= 0) return SexTypes.ALL_MALES;			/* All males, no cuntboys. Always males. */
		if (V.cbchance >= 100) return SexTypes.ALL_CUNTBOYS;	/* All males, all cuntboys. Always vaginal. */
	}
	if (V.cbchance >= 100 && V.dgchance <= 0) return SexTypes.ALL_VAGINAS;	/* Both females and males, but males are cuntboys, and there are no dickgirls. */
	if (V.dgchance >= 100 && V.cbchance <= 0) return SexTypes.ALL_DICKS;	/* Both females and males, but all females are dickgirls, and there are no cuntboys. */
	return SexTypes.BOTH;
}
window.getSexesFromRandomGroup = getSexesFromRandomGroup;

/**
 * Pick the right colour to use when colouring various things.  Primarily sidebar stats.
 * When using this function, try to keep in mind what value of your input variable you want "red" to be at.
 *
 * Example: $drugged goes higher than 500, but we want the bar to become red at 500, so we call this function as getColourClassFromPercentage($drugged / 5).
 *
 * @param {number} percentage The percentage of the desired bar colour.
 * @param {string} stat Stat name, to determine whether or not the bar should use inverted colours (green for min, red for max).
 * @returns {string} Colour name to use.
 */
function getColourClassFromPercentage(percentage, stat) {
	const inverted = ![
		"pain",
		"arousal",
		"tiredness",
		"stress",
		"trauma",
		"drugged",
		"hallucinogen",
		"drunk",
		"awareness",
		"sex",
		"prostitution",
		"rape",
		"bestiality",
		"pregnancy",
		"impreg",
		"promiscuity",
		"exhibitionism",
		"delinquency",
		"deviancy",
		"corruption",
		"crime",
		"aggro",
		"rage",
	].includes(stat);
	if (percentage <= 0) return inverted ? "red" : "green";
	if (percentage < 20) return inverted ? "pink" : "teal";
	if (percentage < 40) return inverted ? "purple" : "lblue";
	if (percentage < 60) return "blue";
	if (percentage < 80) return inverted ? "lblue" : "purple";
	if (percentage < 100) return inverted ? "teal" : "pink";
	return inverted ? "green" : "red";
}
window.getColourClassFromPercentage = getColourClassFromPercentage;

function outfitHoodPosition(outfit) {
	/* This function is used to determine whether a hoodie in a given outfit set should have its hood up or down.
	 * It does this by comparing the upper and head slots to determine whether they're part of the same clothing item
	 */

	const hoodie = setup.clothes.upper.find(item => item.name === outfit.upper);
	if (hoodie.hoodposition === undefined) return "none";
	if (outfit.head !== hoodie.outfitPrimary.head) return "down";
	if (!outfit.colors) return "up";
	if (outfit.colors.head[0] !== outfit.colors.upper[0] || outfit.colors.head[1] !== outfit.colors.upper[1]) return "down";
	if (
		(outfit.colors.headcustom && outfit.colors.headcustom[0] !== outfit.colors.uppercustom[0]) ||
		(outfit.colors.headcustom && outfit.colors.headcustom[1] !== outfit.colors.uppercustom[1])
	)
		return "down";
	return "up";
}
window.outfitHoodPosition = outfitHoodPosition;

function combatCharacterShadow() {
	if (!V.options.characterLightEnabled || !V.options.images || !V.options.combatImages) return;
	const targetClass = "char-shadow-combat";
	const mainDiv = ".char_combat";

	$(() => {
		$(mainDiv)
			.find("img")
			.filter((i, n) =>
				n.className.match(new RegExp("layer-(" + setup.shadowImage[V.position === "doggy" ? "doggy" : "missionary"].join("|") + ")( |$)", "i"))
			)
			.clone(true)
			.removeClass((i, n) => (n.match(/(^|\s)(colour|layer)-\S+/g) || []).join(" "))
			.addClass(targetClass)
			.removeAttr("style")
			.appendTo($(mainDiv).last());
	});
}
window.combatCharacterShadow = combatCharacterShadow;

/**
 * For usage with tears calculation, converts pain stat [0..200] to 0..4 range (maxes out at pain = 80).
 *
 * @param {number} pain Pain value.
 * @returns {number} 0-4 range of tears amount.
 */
const painToTearsLvl = pain => Math.floor(Math.clamp(pain || V.pain, 0, 99) / 20);
window.painToTearsLvl = painToTearsLvl;

/**
 * Get the CSS Name for a mascara colour name.
 *
 * @param {string} name Name of the mascara colour.
 * @returns {string} CSS Name "csstext" of the given colour.
 */
const mascaraNameToCSS = name => nullable(setup.colours.mascara.find(x => x.variable === name)).csstext;
window.mascaraNameToCSS = mascaraNameToCSS;

function isPubfameTaskAccepted(task, status) {
	return V.pubfame && V.pubfame.task === task && (V.pubfame.status === "accepted" || V.pubfame.status === status);
}
window.isPubfameTaskAccepted = isPubfameTaskAccepted;

function msToTime(s) {
	s = Math.floor(s / 1000);
	const secs = (s % 60).toString().padStart(2, "0");
	s = Math.floor(s / 60);
	const mins = (s % 60).toString().padStart(2, "0");
	const hrs = Math.floor(s / 60);

	return (hrs || 0) + ":" + mins + ":" + secs;
}
window.msToTime = msToTime;

function getHalloweenCostume() {
	const upper = V.worn.upper;
	const lower = V.worn.lower;
	const face = V.worn.face;

	T.tf = checkTFparts();

	// I'm really not sure if there's any better way to do this than going through each name. Please forgive my sins.
	// (Note: We could just add new types to clothes? ex: ["costume", "vampire"]. Update this function if you do.)
	if (upper.name.includes("vampire jacket")) {
		return "vampire";
	} else if (upper.name === "witch dress" && lower.name === "witch skirt") {
		return "witch";
	} else if (upper.name === "scarecrow shirt" && lower.name === "scarecrow skirt") {
		return "scarecrow";
	} else if (upper.name.includes("gothic") && lower.name.includes("gothic")) {
		return "gothic";
	} else if (upper.name === "nun's habit" && lower.name === "nun's habit skirt") {
		return "nun";
	} else if (upper.type.includes("maid") && lower.type.includes("maid")) {
		return "maid";
	} else if (upper.name.includes("christmas") && lower.name.includes("christmas")) {
		return "christmas";
	} else if (upper.name === "cheerleading top" && lower.name === "cheerleading skirt") {
		return "cheerleader";
	} else if (upper.name.includes("prison") && lower.name.includes("prison")) {
		return "prison";
	} else if (upper.name === "karate jacket" && lower.name === "karate trousers") {
		return "karate";
	} else if (upper.name === "monk's habit" && lower.name === "monk's habit skirt") {
		return "monk";
	} else if (upper.name === "padded football shirt" && lower.name === "football shorts") {
		return "football";
	} else if (
		(upper.name === "belly dancer's top" && lower.name === "belly dancer's bottoms") ||
		(upper.name === "harem vest" && lower.name === "harem pants")
	) {
		return "belly dancer";
	} else if (V.worn.head.name === "cowboy hat" && lower.name === "cowboy chaps" && V.worn.feet.name === "cowboy boots") {
		return "cowboy";
	} else if (["costume", "riding"].every(type => V.worn.head.type.includes(type) && upper.type.includes(type))) {
		return "riding";
	} else if (upper.name === "cow onesie" && lower.name === "cow onesie bottoms") {
		return "cow onesie";
	} else if (upper.name === "mummy top" && lower.name === "mummy skirt") {
		return "mummy";
	} else if (upper.name.includes("sailor") && lower.name.includes("sailor")) {
		return "sailor";
	} else if (upper.name === "skeleton outfit" && lower.name === "skeleton bottoms") {
		return "skeleton";
	} else if (upper.name === "futuristic bodysuit" && lower.name === "futuristic bodysuit pants") {
		return "futuresuit";
	} else if (upper.name.includes("nurse") && lower.name.includes("nurse")) {
		return "nurse";
	} else if (face.name === "eyepatch") {
		return "eyepatch";
	} else if (face.name === "medical eyepatch") {
		return "medical eyepatch";
	} else if (face.name === "gas mask") {
		return "gasmask";
	} else if (upper.name === "rag top" && lower.name === "rag skirt") {
		return "rags";

		/* Transformations */
	} else if (T.tf.angelHalo && T.tf.angelWings) {
		return "angel TF";
	} else if (T.tf.wolfEars && T.tf.wolfTail) {
		return "wolf TF";
	} else if (T.tf.fallenAngelHalo && T.tf.fallenAngelWings) {
		return "fallen angel TF";
	} else if (T.tf.demonHorns && T.tf.demonWings) {
		return "demon TF";
	} else if (T.tf.catEars && T.tf.catTail) {
		return "cat TF";
	} else if (T.tf.cowHorns && T.tf.cowTail) {
		return "cow TF";
	} else if (T.tf.birdWings && T.tf.birdEyes) {
		return "harpy TF";
	} else if (T.tf.foxEars && T.tf.foxTail) {
		return "fox TF";

		/* Misc outcomes */
	} else if (
		V.worn.upper.type.includes("costume") ||
		V.worn.lower.type.includes("costume") ||
		(V.worn.upper.type.includes("naked") && V.worn.under_upper.type.includes("costume")) ||
		(V.worn.lower.type.includes("naked") && V.worn.under_lower.type.includes("costume"))
	) {
		return "mixed";
	} else if (V.exposed >= 2) {
		return "fully naked";
	} else if (V.exposed >= 1) {
		return "exposed";
	} else {
		return "none";
	}
}
window.getHalloweenCostume = getHalloweenCostume;

function dailyConvert() {
	if (V.daily === undefined) {
		/* transfer old vars */
		V.daily = {
			school: {
				scienceInterrupted: V.scienceinterrupted,
				mathsInterrupted: V.mathsinterrupted,
				englishInterrupted: V.englishinterrupted,
				historyInterrupted: V.historyinterrupted,
				swimmingInterrupted: V.swimminginterrupted,
				headInterrupted: V.headinterrupted,
				lunchEaten: V.luncheaten,
				canteenApproach: V.canteenapproach,
				detentionAttended: V.detentionattended,
				boysRoomEntered: V.boysroomentered,
				girlRroomEntered: V.girlsroomentered,
				scienceExcused: V.scienceExcused,
				mathsExcused: V.mathsExcused,
				englishExcused: V.englishExcused,
				historyExcused: V.historyExcused,
				swimmingExcused: V.swimmingExcused,
				herm: V.school_herm_day,
				crossdress: V.school_crossdress_day,
			},
			whitney: {
				bullyGate: V.bullygate,
				toiletCheck: V.whitney_toilet_check,
				park: V.whitney_park,
				textTrigger: V.whitney_text_trigger,
				flirt: V.whitneyFlirt,
				chat: V.whitneyChat,
				ask: V.whitneyAsk,
				text: V.whitney_text,
			},
			robin: {
				walk: V.robinwalk,
				hugCry: V.robinhugcry,
				hugComplain: V.robinhugcomplain,
				blame: V.robinblame,
				persecute: V.robinpersecute,
				policeBody: V.robinpolicebody,
				policePay: V.robinpolicepay,
				tending: V.robin_tending,
				beachPolice: V.robinbeachpolice,
				parkSnow: V.robinparksnow,
				debtAsk: V.robinDebtAsk,
			},
			kylar: V.kylarDaily || {},
			morgan: {},
			eden: {
				breakfastLust: V.edenbreakfastlust,
				breakfast: V.edenbreakfast,
				bath: V.edenbath,
				walk: V.edenwalk,
				chopLust: V.edenchoplust,
				hunting: V.edenhunting,
				lunch: V.edenlunch,
				dinner: V.edendinner,
				distract: V.edendistract,
				asylumDisarm: V.edenasylumdisarm,
				asylumRescue: V.eden_asylum_rescue,
				sew: V.eden_sew,
				supplies: V.eden_supplies,
				sweep: V.eden_sweep,
				salve: V.eden_salve,
				soap: V.eden_soap,
				search: V.eden_search,
				exposed: V.edenexposed,
				springJoin: V.edenspringjoin,
				salveUse: V.salveuse,
				massage: V.edenmassage,
				huntCaught: V.edenhuntcaught,
				farmRescue: V.edenfarmrescue,
			},
			alex: V.alexDaily || {},
			sydney: {
				scienceWarn: V.sydneyScienceWarn,
				classWarn: V.sydneyClassWarn,
				scienceWalk: V.sydneyScienceWalk,
				punish: V.sydneyPunish,
				templeSkip: V.sydneyTempleSkip,
			},
			ex: {
				day: V.ex_day,
				club: V.ex_club,
				brothel: V.ex_brothel,
				studio: V.ex_studio,
				high: V.ex_high,
				connudatus: V.ex_connudatus,
				stall: V.ex_stall,
				mason: V.ex_mason,
				flyover: V.ex_flyover,
				cream: V.ex_cream,
				road: V.ex_road,
				fence: V.ex_fence,
				lorries: V.ex_lorries,
				fountain: V.ex_fountain,
			},
			pharm: V.pharmDaily || {},
			motherWake: V.motherwake,
			harperVisit: V.harpervisit,
			policeCollarSeduceAttempt: V.policecollarseduceattempt,
			tenyclusPlayed: V.tenyclusPlayed,
			beachStrip: V.beachstrip,
			compoundState: V.compoundstate,
			baileyVisit: V.baileyvisit,
			lakeCouple: V.lakecouple,
			museumGreenGemTouch: V.museumgreengemtouch,
			fenceClimb: V.fenceclimb,
			cafeEaten: V.cafeeaten,
			mirrorTentacles: V.mirrortentacles,
			massAttended: V.massattended,
			dockExhibitionism: V.dockexhibitionism,
			homeEvent: V.home_event,
			leightonDanceOffered: V.leightondanceoffered,
			wolfCaveDog: V.wolf_cave_dog,
			jordan_missing: V.jordan_missing,
			blackWolfMonsterRoll: V.blackWolfMonsterRoll,
			templePray: V.temple_pray,
			lakeMeditate: V.lake_meditate,
			masonSpoken: V.mason_spoken,
			stallRented: V.stall_rented,
			rocksPoolInvite: V.rocks_pool_invite,
			birdWash: V.bird_wash,
			birdDailyGreeting: V.birdDailyGreeting,
			greatHawkMonsterRoll: V.greatHawkMonsterRoll,
			estateBluffed: V.estate_bluffed,
			estateChaos: V.estate_chaos,
			spaEvent: V.spa_event,
			estateDone: V.estate_done,
			baileyWake: V.bailey_wake_day,
			manorForage: V.manor_forage,
			manorGarden: V.manor_garden,
			manorKitchen: V.manor_kitchen,
			manorParents: V.manor_parents,
			manorLab: V.manor_lab,
			promiscuityStress1: V.promiscuitystress1,
			promiscuityStress2: V.promiscuitystress2,
			promiscuityStress3: V.promiscuitystress3,
			promiscuityStress4: V.promiscuitystress4,
			promiscuityStress5: V.promiscuitystress5,
			exhibitionismStress1: V.exhibitionismstress1,
			exhibitionismStress2: V.exhibitionismstress2,
			exhibitionismStress3: V.exhibitionismstress3,
			exhibitionismStress4: V.exhibitionismstress4,
			exhibitionismStress5: V.exhibitionismstress5,
			deviancyStress1: V.deviancystress1,
			deviancyStress2: V.deviancystress2,
			deviancyStress3: V.deviancystress3,
			deviancyStress4: V.deviancystress4,
			deviancyStress5: V.deviancystress5,
			seenPets: V.seenPets,
			asylumFirstTreatment: V.asylumfirsttreatment,
			asylumSecondTreatment: V.asylumsecondtreatment,
			asylumAssessment: V.asylumassessment,
			asylumExercise: V.asylumexercise,
			slimeFarmNaked: V.slimeFarmNaked,
		};
		/* merge values from old daily objects */
		if (V.whitneyDaily) Object.keys(V.whitneyDaily).forEach(n => (V.daily.whitney[n] = V.whitneyDaily[n]));
		if (V.robinDaily) Object.keys(V.robinDaily).forEach(n => (V.daily.robin[n] = V.robinDaily[n]));
		if (V.sydneyDaily) Object.keys(V.sydneyDaily).forEach(n => (V.daily.sydney[n] = V.sydneyDaily[n]));
		/* $sewersDaily to $daily.morgan. somehow, it's an array */
		if (V.sewerssex === 1) V.daily.morgan.sex = 1;
		if (V.sewersfeeding === 1) V.daily.morgan.feeding = 1;
		if (V.sewersDaily) V.sewersDaily.forEach(n => (V.daily.morgan[n] = 1));
		/* `$compoundstate != undefined` is no longer used as an indicator of the access to compound,
		as it migrated to $daily.compoundState. $compoundcard === 2 is used for that instead. */
		if (V.compoundstate !== undefined) V.compoundcard = 2;
		V.daily.pharm.impatient = V.left_before_nurse_returned;

		/* unset old vars */
		[
			// eslint-disable-next-line prettier/prettier
			/* school */ "scienceinterrupted", "mathsinterrupted", "englishinterrupted", "historyinterrupted", "swimminginterrupted", "headinterrupted", "luncheaten", "canteenapproach", "detentionattended", "boysroomentered", "girlsroomentered", "scienceExcused", "mathsExcused", "englishExcused", "historyExcused", "swimmingExcused", "school_herm_day", "school_crossdress_day",
			// eslint-disable-next-line prettier/prettier
			/* whitney */ "bullygate", "whitney_toilet_check", "whitney_park", "whitney_text_trigger", "whitneyFlirt", "whitneyChat", "whitneyAsk","whitney_text", "whitney_text_trigger", "whitneyDaily",
			// eslint-disable-next-line prettier/prettier
			/* robin */ "robinwalk", "robinhugcry", "robinhugcomplain", "robinblame", "robinpersecute", "robinpolicebody", "robinpolicepay", "robin_tending", "robinDaily", "robinbeachpolice", "robinparksnow", "robinDebtAsk",
			// eslint-disable-next-line prettier/prettier
			/* kylar */ "kylarDaily",
			// eslint-disable-next-line prettier/prettier
			/* morgan */ "sewerssex", "sewersfeeding", "sewersDaily",
			// eslint-disable-next-line prettier/prettier
			/* eden */ "edenbreakfastlust", "edenbreakfast", "edenbath", "edenwalk", "edenbath", "edenchoplust", "edenhunting", "edenlunch", "edendinner", "edendistract", "edenasylumdisarm", "eden_asylum_rescue", "eden_sew", "eden_supplies", "eden_sweep", "eden_salve", "eden_soap", "eden_search", "edenexposed", "edenspringjoin", "salveuse", "edenmassage", "edenhuntcaught", "edenfarmrescue",
			// eslint-disable-next-line prettier/prettier
			/* alex */ "alexDaily",
			// eslint-disable-next-line prettier/prettier
			/* sydney */ "sydneyScienceWarn", "sydneyClassWarn", "sydneyScienceWalk", "sydneyPunish", "sydneyTempleSkip", "sydneyDaily",
			// eslint-disable-next-line prettier/prettier
			/* ex */ "ex_day", "ex_club", "ex_brothel", "ex_studio", "ex_high", "ex_stall", "ex_mason", "ex_flyover", "ex_cream", "ex_road", "ex_fence", "ex_connudatus", "ex_lorries", "ex_fountain", "ex_high",
			// eslint-disable-next-line prettier/prettier
			/* pharm */ "left_before_nurse_returned", "pharmTriedSeduction", "pharmSexFinished", "pharmClosed", "pharmSeductionFailed", "pharmDaily",
			// eslint-disable-next-line prettier/prettier
			/* misc */ "comb", "motherwake", "harpervisit", "policecollarseduceattempt", "tenyclusPlayed", "beachstrip", "compoundstate", "baileyvisit", "lakecouple", "museumgreengemtouch", "fenceclimb", "cafeeaten", "mirrortentacles", "massattended", "dockexhibitionism", "home_event", "leightondanceoffered", "wolf_cave_dog", "jordan_missing", "blackWolfMonsterRoll", "temple_pray", "lake_meditate", "mason_spoken", "stall_rented", "rocks_pool_invite", "bird_wash", "birdDailyGreeting", "greatHawkMonsterRoll", "estate_bluffed", "estate_chaos", "spa_event", "estate_done", "lewd_unlock", "bailey_wake_day", "manor_forage", "manor_garden", "manor_kitchen", "manor_parents", "manor_lab", "promiscuitystress1", "promiscuitystress2", "promiscuitystress3", "promiscuitystress4", "promiscuitystress5", "exhibitionismstress1", "exhibitionismstress2", "exhibitionismstress3", "exhibitionismstress4", "exhibitionismstress5", "deviancystress1", "deviancystress2", "deviancystress3", "deviancystress4", "deviancystress5", "seenPets", "asylumfirsttreatment", "asylumsecondtreatment", "asylumassessment", "asylumexercise", "slimeFarmNaked"
		].forEach(n => delete V[n]);
	}
}
window.dailyConvert = dailyConvert;

function convertHairLengthToStage(hair, length) {
	if (!hair || !length) throw new Error(`Hair AND Length must be provided to be converted: ${hair} / ${length}`);
	if (hair === "fringe") {
		if (length >= 900) return "feet";
		else if (length >= 700) return "thighs";
		else if (length >= 600) return "navel";
		else if (length >= 400) return "chest";
		else if (length >= 200) return "shoulder";
		else return "short";
	} else if (hair === "sides") {
		if (length >= 900) return "feet";
		else if (length >= 700) return "thighs";
		else if (length >= 600) return "navel";
		else if (length >= 400) return "chest";
		else if (length >= 200) return "shoulder";
		else return "short";
	}
}

window.convertHairLengthToStage = convertHairLengthToStage;

function calculateSemenReleased() {
	if (T.deniedOrgasm) return 0;
	let released = 30;

	released += V.semen_volume / 30;

	if (V.femaleclimax === 1) released /= 30;
	if (V.orgasmtrait >= 1) released *= 2.5;
	if (V.cow >= 6) released *= 2;

	/* if the player doesn't have enough semen, set $_semen_released to whatever they have left */
	if (V.semen_amount < released) released = V.semen_amount;
	if (parseFloat(released.toFixed(1)) === 0 && V.semen_amount < 0.1) V.semen_amount = 0; // Prevents really low floating numbers

	return parseFloat(released.toFixed(1));
}
window.calculateSemenReleased = calculateSemenReleased;

function npcSemenMod(penisSize) {
	switch (penisSize) {
		case 4:
			return "large";
		case 1:
			return "tiny";
		default:
			return "";
	}
}
window.npcSemenMod = npcSemenMod;

function maleChance(override) {
	if (V.maleChanceSplit === "f") return V.malechance;
	const appearence = override || V.player.gender_appearance;
	if (appearence === "m") return V.maleChanceMale;
	if (appearence === "f") return V.maleChanceFemale;
	return 50;
}
window.maleChance = maleChance;

// gender of the npc, rng (between 1 and 100) of their generation
function attractedToBothChance(gender, rng) {
	if (gender === "m") return maleChance("m") >= rng && maleChance("f") >= rng;
	return maleChance("m") < rng && maleChance("f") < rng;
}
window.attractedToBothChance = attractedToBothChance;

function beastMaleChance(override) {
	if (V.beastMaleChanceSplit === "f") return V.beastmalechance;
	const appearence = override || V.player.gender_appearance;
	if (appearence === "m") return V.beastMaleChanceMale;
	if (appearence === "f") return V.beastMaleChanceFemale;
	return 50;
}
window.beastMaleChance = beastMaleChance;

function penisNames(override) {
	const names = ["자지"];	// penis

	if (V.player.penissize < 0 && !override) return names;

	if ((V.awareness >= 100 && !override) || override >= 1) names.push("음경");	// dick
	if ((V.awareness >= 200 && V.purity < 900 && !override) || override >= 2) names.push("좆");	// cock

	return names;
}
window.penisNames = penisNames;

function pussyNames(override) {
	const names = ["보지"];	// vagina

	if ((V.awareness >= 100 && !override) || override >= 1) names.push("질");	// pussy
	if ((V.awareness >= 200 && V.purity < 900 && !override) || override >= 2) names.push("보지");	// quim
	if ((V.awareness >= 300 && V.purity < 100 && !override) || override >= 3) names.push("보짓구멍");	// slit

	return names;
}
window.pussyNames = pussyNames;

const crimeSum = (prop, ...crimeTypes) => {
	if (crimeTypes.length === 0) {
		crimeTypes = Object.keys(setup.crimeNames);
	}

	return crimeTypes.reduce((result, crimeType) => result + V.crime[crimeType][prop], 0);
};

window.crimeSumCurrent = (...args) => crimeSum("current", ...args);
window.crimeSumHistory = (...args) => crimeSum("history", ...args);
window.crimeSumDaily = (...args) => crimeSum("daily", ...args);
window.crimeSumCount = (...args) => crimeSum("count", ...args);
window.crimeSumCountHistory = (...args) => crimeSum("countHistory", ...args);

/**
 * Event listener for the 'beforeunload' event. Will prompt a dialog box asking the player if he wants to leave.
 *
 * @param {object} event 'beforeunload' event
 * @returns {void}
 */
function onBrowserTabClose(event) {
	event.preventDefault();
	event.returnValue = "Are you sure you want to leave?"; // the string here isn't important, it's mostly not considered by the browser.
}

/**
 * Enable or disable the confirm dialog based on V.options.confirmDialogUponTabClose value evaluating to true or not
 *
 * @returns {void}
 */
function toggleConfirmDialogUponTabClose() {
	if (V.options.confirmDialogUponTabClose === true) {
		window.addEventListener("beforeunload", onBrowserTabClose);
	} else if (V.options.confirmDialogUponTabClose === false) {
		window.removeEventListener("beforeunload", onBrowserTabClose);
	}
}

window.toggleConfirmDialogUponTabClose = toggleConfirmDialogUponTabClose;

function numberOfEarSlime() {
	let result = 0;
	if (V.parasite.left_ear.name === "slime") result++;
	if (V.parasite.right_ear.name === "slime") result++;
	return result;
}
window.numberOfEarSlime = numberOfEarSlime;

function earSlimeMakingMundaneRequests() {
	if (!numberOfEarSlime()) return false;
	// First rape requests
	if (V.earSlime.growth + V.earSlime.promiscuity * 10 >= 80) return false;
	return true;
}
window.earSlimeMakingMundaneRequests = earSlimeMakingMundaneRequests;

function fixIntegrityUpdater() {
	Object.entries(V.worn).forEach(([slot, item]) => fixIntegrityMax(slot, item));
	Object.entries(V.store).forEach(([slot, items]) => items.forEach(item => fixIntegrityMax(slot, item)));
	setup.clothes_all_slots.forEach(slot => {
		const category = V.wardrobe[slot];
		if (!Array.isArray(category)) {
			console.warn("Category:", slot, "doesn't exist in wardrobe.");
			return;
		}
		category.forEach(item => fixIntegrityMax(slot, item));
	});
	const wardrobes = Object.entries(V.wardrobes).filter(([name, wardrobe]) => !["shopReturn", "wardrobe"].includes(name));
	if (Array.isArray(wardrobes)) {
		wardrobes.forEach(([name, wardrobe]) => {
			setup.clothes_all_slots.forEach(slot => {
				const category = wardrobe[slot];
				if (!Array.isArray(category)) {
					console.warn("Category:", slot, "doesn't exist in wardrobe:", name);
					return;
				}
				category.forEach(item => fixIntegrityMax(slot, item));
			});
		});
	}
	Object.entries(V.carried).forEach(([slot, item]) => fixIntegrityMax(slot, item));
}
window.fixIntegrityUpdater = fixIntegrityUpdater;

/**
 * @param {string} slot
 * @param {ClothesItem} value
 * @returns {void}
 */
function fixIntegrityMax(slot, value) {
	if (value.integrity_max !== 0) {
		return; // Integrity is fine
	}
	const setupClothing = getSetupClothing(slot, value);
	value.integrity_max = setupClothing.integrity_max;
}
window.fixIntegrityMax = fixIntegrityMax;

function formatMoney(amount) {
	const integerPart = Math.floor(amount / 100);
	let formattedAmount = Math.abs(integerPart).toLocaleString("en-GB");
	if (Math.abs(integerPart) <= 9999) {
		const decimalPart = amount % 100;
		if (decimalPart) {
			formattedAmount += "." + ("0" + Math.floor(Math.abs(decimalPart))).slice(-2);
		}
	}
	T.printmoney = (amount >= 0 ? "" : "-") + "<span class='moneySymbol'>£</span>" + formattedAmount;
	return T.printmoney;
}
window.formatMoney = formatMoney;
DefineMacro("formatmoney", money => formatMoney(money));
