import { BATTLE_RESULT, PERCENT } from '@/utils/constants'
export function getBattleResult(response) {
    const {logs} = response
    const [log] = logs;
    const {events} = log;
    let result = 0;
    events.forEach(event => {
        if(event.type == "wasm") {
            const { attributes } = event
            attributes.forEach(attribute => {
                if(attribute.key == "result") {
                    if(attribute.value == "win") {
                        result =  BATTLE_RESULT.WIN
                    } else if (attribute.value == "draw") {
                        result = BATTLE_RESULT.DRAW
                    } else {
                        result = BATTLE_RESULT.LOSE
                    }
                    return
                }
            })
            return
        }
    })
    return result
}

export function getMessageResult(battleResult, betAmount) {
    const denom = process.env.VUE_APP_COIN_MINIMAL_DENOM
    if(battleResult == BATTLE_RESULT.LOSE) {
        return `You lost ${betAmount} ${denom}`
    } else if(battleResult == BATTLE_RESULT.DRAW) {
        return `You lost ${betAmount * PERCENT / 100} ${denom}`
    } else {
        return `You earned ${betAmount - betAmount * PERCENT / 100} ${denom}`
    }
}