mods = [false, false, false]
modWraps = ['LS', 'LG', 'LA', 'LC']
modNames = ['lsft', 'lgui', 'lalt', 'lctl']

generate(0)

function generate(i) {
    let curr = 'ma_lo_num'
    for(let j = 0; j < i; j++) {
        curr += (mods[j] ? '_w_' : '_wo_') + modNames[j]
    }
    
    let template = ''
    if(i == 3){
        let woMod = ''
        for(let j = 0; j < i; j++) {
            if(!mods[j])
                continue
            woMod = woMod.length == 0 ? modNames[j].toUpperCase() : `${modWraps[j]}(${woMod})`
        }
        let wMod = ''

        if(woMod) {
            wMod = `${modWraps[i]}(${woMod})`

            woMod = `&lm NUM ${woMod}`
            wMod = `&lm NUM ${wMod}`
        } else {
            woMod = `&mo NUM`
            wMod = `&lm NUM ${modNames[3].toUpperCase()}`
        }
        
        template = getTemplate(curr, modNames[i], [woMod, wMod])
    } else {
        template = getTemplate(curr, modNames[i], [curr + '_wo_' + modNames[i], curr + '_w_' + modNames[i]])

        mods[i] = false
        generate(i + 1, mods)
    
        mods[i] = true
        generate(i + 1, mods)
    }

    console.log(template)
}

function getTemplate(name, mod, bindings) {
    return `
     ${name}: ${name} {
        compatible = "zmk,behavior-mod-morph";
        #binding-cells = <0>;
        bindings = <${bindings[0]}>, <${bindings[1]}>;

        mods = <(MOD_${mod.toUpperCase()})>;
        keep-mods = <(MOD_LSFT|MOD_LGUI|MOD_LALT|MOD_LCTL)>;
    };`
}