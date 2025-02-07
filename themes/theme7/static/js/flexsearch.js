const index = new FlexSearch.Document({
    charset: "utf-8",
    tokenize: "forward",
    document: {
        id: "uri",
        index: ["title", "content", "tags"]
    }
});
const pageDict = {};
async function loaddata() {
    return fetch("/searchindex.json")
	.then(res =>  res.json())
	.then(pages => {
	    pages.forEach(page => {
		pageDict[page.uri] = { title: page.title, content: page.content }; 
		index.add({
		    uri:page.uri,
		    title:page.title,
		    content:page.content,
		    tags: page.tags
		})}
			 );

	});

}
function displayResults(query) {
    const results = index.search(query, { enrich: true });
    let html = '';
    const uniqueIds = new Set(); 
    results.forEach(result => {
        result.result.forEach(res => {
	    if (!uniqueIds.has(res)) {
		const pageInfo = pageDict[res]; // 根据id获取页面信息
		const summary = pageInfo.content.substring(0, 150) + '...';
		const curTitle = pageInfo.title;
		uniqueIds.add(res);
		console.log('Title', curTitle)
		html += `
            <article>
              <h3><a href="${res}">${curTitle}</a></h3>
              <p>${summary}</p>
            </article>
          `;}
        });
    });
    document.getElementById("searchResults").innerHTML = html;
}
