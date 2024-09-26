/* 한국어 버전정보는 03-Javascript/kotrans.js 로 이동 */

/*window*/

window.sleep = function (ms) {
    sleep(ms);
}



/*function*/
function IsJson(str) {
    try {
        if (!Array.isArray(str))
        {
            var json = JSON.stringify(str);
            json = JSON.parse(json);
            return (typeof json === 'object');
        }   else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

function IsArray(array) {
    return Array.isArray(array);
}

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {};
}



/*Macro*/
Macro.add('cdbt', {
	handler: function () {
        console.log("/Testlog/: "+this.args[0]);
	}
});


Macro.add('delete', {
	handler: function () {
        var tmp = this.args[0];
        tmp = tmp.replace(/^\$|\]/g,'');
        tmp = tmp.replace(/\[/g,'.');
        tmp = "State.variables."+tmp;
        eval("delete "+tmp);
	}
});


Macro.add('overwrite',{
    handler: function () {
        console.log("---custom overwrite start---")

        var reflection = function (arg, n) {
            if (typeof eval(n) == 'undefined') {
                if (IsArray(arg)) {
                    eval(n+"= []")
                    reflection(arg,n)
                } else if (IsJson(arg)) {
                    eval(n+"= {}")
                    reflection(arg,n)
                } else {
                    var was = eval(n);
                    if (typeof arg == 'string'){
                        eval(n+" = "+"'"+arg+"'");
                    } else {
                        eval(n+" = "+arg);
                    }
                    console.log("change: "+n+"\nfrom: "+was+"\nto: "+arg)
                }
            } else if (IsJson(arg)) {
                for (var x in arg) {
                    if (arg.hasOwnProperty(x)){
                        reflection(arg[x], n+"."+x);
                    }
                }
            } else if (IsArray(arg)) {
                for (var i = 0; i < arg.length; i++){
                    reflection(arg[i], n+"["+i+"]");
                }
            } else {
                if(arg == eval(n)){
                } else {
                    var was = eval(n);
                    if (typeof arg == 'string'){
                        eval(n+" = "+"'"+arg+"'");
                    } else {
                        eval(n+" = "+arg);
                    }
                    console.log("change: "+n+"\nfrom: "+was+"\nto: "+arg)
                }
            }
        }
        if (this.args[1] == undefined) {
            var tmp = "State.variables.custom";
        } else {
            tmp = this.args[1];
            tmp = tmp.replace(/^\$|\]/g,'');
            tmp = tmp.replace(/\[/g,'.');
            tmp = "State.variables." + tmp;
        }

        var arg = this.args[0];
        if (State.variables.custom.version < 0 || State.variables.custom.version == undefined) {
            for (var x in eval(arg)) {
                if (arg.hasOwnProperty(x)){
                    reflection(arg[x], tmp+"."+x);
                }
            }
        }

        console.log("---custom overwrite end---")
    }
});