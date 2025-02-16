import leoprofanity = require('leo-profanity')
const BadWordsNext = require('bad-words-next')
import profanitycheck = require('profanity-check')

const pfcheck = new profanitycheck.Filter()

const en = require('bad-words-next/lib/en')
const es = require('bad-words-next/lib/es')
const fr = require('bad-words-next/lib/fr')
const de = require('bad-words-next/lib/de')
const ru = require('bad-words-next/lib/ru')
const rl = require('bad-words-next/lib/ru_lat')
const ua = require('bad-words-next/lib/ua')
const pl = require('bad-words-next/lib/pl')
const ch = require('bad-words-next/lib/ch')

const badwords = new BadWordsNext()

badwords.add(en)
badwords.add(es)
badwords.add(fr)
badwords.add(de)
badwords.add(ru)
badwords.add(rl)
badwords.add(ua)
badwords.add(pl)
badwords.add(ch)
leoprofanity.loadDictionary('en')
leoprofanity.loadDictionary('fr')
leoprofanity.loadDictionary('ru')

const profaneWordChecker = (message: string): boolean => {
  return leoprofanity.check(message) || badwords.check(message) || pfcheck.isProfane(message)
}

export default profaneWordChecker