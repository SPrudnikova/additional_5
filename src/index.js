module.exports = function check(str, bracketsConfig, skipValidation) {
    const openBrackets = bracketsConfig.map(singleBracketsConfig => singleBracketsConfig[0]);
    const closeBrackets = bracketsConfig.map(singleBracketsConfig => singleBracketsConfig[1]);
    const bracketsArr = str.split('');

    //=====basic validity checking=====
    if (!skipValidation) {
        for (let i = 0; i < bracketsArr.length; i++) {
            if (!openBrackets.includes(bracketsArr[i]) && !closeBrackets.includes(bracketsArr[i])) {
                return false;
            }
        }
        if (bracketsArr.length%2 !== 0) {
            return false;
        }
    }
    //=====basic validity checking end=====

    if (str.length === 0) {
        return true;
    }
    else {
        for (let i = 0; i < bracketsArr.length; i++) {
            const currentBracket = bracketsArr[i];
            if (i < bracketsArr.length - 1) {
                const indexFirst = openBrackets.indexOf(currentBracket);
                const indexSecond = closeBrackets.indexOf(bracketsArr[i+1]);
                if (indexFirst === indexSecond) {
                    if (openBrackets.includes(currentBracket)) {
                        const newStr = str.split(`${currentBracket}${bracketsArr[i+1]}`).join('');
                        return check(newStr, bracketsConfig, true);
                    } else {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
    }

};
