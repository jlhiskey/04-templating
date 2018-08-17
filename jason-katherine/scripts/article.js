'use strict';

let articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function(i) {

  // : Use Handlebars to render your articles. Get your template from the DOM and "compile" your template with Handlebars.

  let source = document.getElementById("article-template").innerHTML;
  let template = Handlebars.compile(source);

  // REVIEW: If your template will use properties that aren't on the object yet, add them.
  // Since your template can't hold any JS logic, we need to execute the logic here.
  // The result is added to the object as a new property, which can then be referenced by key in the template.
  // For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  // REVIEW: The ternary operator above accomplishes this same logic.
  // if(this.publishedOn) {
  //   this.publishStatus = `published ${this.daysAgo} days ago`;
  // } else {
  //   this.publishStatus = '(draft)';
  // }

  // : Use the method that Handlebars gave you to return your filled-in html template for THIS article.

  let html = template(articles[i]);
  return html;
};

// : Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?
// a,b are wrapped in () because the function is taking in more than one argument.
rawData.sort((a,b) => {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
  articles.push(new Article(articleObject));
});

for(let i = 0; i < articles.length; i++) {
  $('#articles').append(articles[i].toHtml(i));
}
