import languages from './languages';
import el from './el';
import updateArticleInfo from './updateArticleInfo';

const { document } = global;
const languagesSelector = document.getElementById('languages');
const form = document.getElementById('article-chooser');
const articleTitle = document.getElementById('articleTitle');


languages
  .map((lang) => el('option', { value: lang['WP Code'], innerText: lang.Language }))
  .forEach((element) => languagesSelector.appendChild(element));


function onArticleSubmit(e) {
  e.preventDefault();
  updateArticleInfo(articleTitle.value, languagesSelector.value);
}
form.addEventListener('submit', onArticleSubmit);
