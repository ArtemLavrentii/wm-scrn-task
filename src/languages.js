import languageData from './data/languageData.json';
import mediawikis from './data/mediawikis.json';

const madMode = false;
const languages = [];

for (
  let i = 0, rtlLangs = 0;
  (madMode || languages.length < 10 || rtlLangs === 0) && i < mediawikis.length;
  i += 1
) {
  const wiki = mediawikis[i];
  const { Direction } = languageData.find(({ Code }) => Code === wiki.Script) || {};
  let languageDirection = 'ltr';

  if (Direction === 'R-to-L') {
    rtlLangs += 1;
    languageDirection = 'rtl';
  }

  if (Direction === 'L-to-R' || Direction === 'R-to-L') {
    languages.push({ ...wiki, languageDirection });
  }
}

export default languages;
