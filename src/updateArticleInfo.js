import DOMPurify from 'dompurify';
import languages from './languages';
import el from './el';
import config from './config';

function buildTableOfContent(entries, pageBaseUrl, indexOffset = 0) {
  console.log(entries, pageBaseUrl, indexOffset);

  const currentLevel = entries.length > indexOffset ? entries[indexOffset].level : 0;
  const childs = [];

  let i;
  for (i = indexOffset; i < entries.length; i += 1) {
    const { level, anchor, html } = entries[i];
    if (level < currentLevel) {
      break;
    }

    if (level > currentLevel) {
      const latestChild = childs[childs.length - 1];

      const subTable = buildTableOfContent(entries, pageBaseUrl, i);

      i = subTable.lastIndex - 1;
      latestChild.appendChild(el('ol', {}, subTable.childs));
    } else {
      const href = `${pageBaseUrl}#${anchor}`;
      childs.push(el('li', {}, [
        el('a', { href, target: '_blank', innerHTML: DOMPurify.sanitize(html) }),
      ]));
    }
  }

  return { childs, lastIndex: i };
}

const articleContent = global.document.getElementById('article-info');
export default function updateArticleInfo(title, wpCode) {
  articleContent.innerHTML = 'Loading . . .';

  const encodedTitle = encodeURIComponent(title.replace(' ', '_'));
  const { languageDirection } = languages.find(({ 'WP Code': code }) => code === wpCode);

  global.fetch(
    `https://${wpCode}.wikipedia.org/api/rest_v1/page/metadata/${encodedTitle}`,
    {
      method: 'GET',
      redirect: 'follow',
      mode: 'cors',
      headers: { 'Api-User-Agent': config.wikiClient },
    },
  )
    .then((response) => response.json().then((data) => ({ response, data })))
    .then(({ response, data }) => {
      if (!response.ok) {
        if (response.status === 404) {
          articleContent.innerText = 'Page not found';
        } else {
          articleContent.innerText = `Unknown HTTP status code ${response.status}`;
        }
        return;
      }

      const pageBaseUrl = `https://${wpCode}.wikipedia.org/wiki/${encodedTitle}`;
      const { toc: { entries } } = data;
      articleContent.innerHTML = '';
      articleContent.appendChild(el(
        'ol',
        { className: `lang-direction-${languageDirection}`, dir: languageDirection },
        buildTableOfContent(entries, pageBaseUrl).childs,
      ));
    })
    .catch((err) => {
      console.log('Error happened during fetch', err);
      articleContent.innerText = `Client error happened :C. Please report it to dev. ${err.message}`;
    });
}
