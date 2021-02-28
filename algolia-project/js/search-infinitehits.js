const search = instantsearch({
  indexName: 'names',
  searchClient: algoliasearch(
    'O4QURWZ3Z4',
    '42de015266c3eeed3f77eef33714e0fb'
  ),
  routing: {
    stateMapping: instantsearch.stateMappings.singleIndex('names')
  }
});

// restore the scroll position when you leave and come back to the search page
const sessionStorageCache =
  instantsearch.createInfiniteHitsSessionStorageCache();

// widgets
search.addWidgets([
  // configure searchbox
  instantsearch.widgets.configure({
    hitsPerPage: 10
  }),
  // hits
  instantsearch.widgets.infiniteHits({
    cache: sessionStorageCache,
    container: '#infinite-hits',
    templates: {
      empty: `
        <h1>No result</h1>
      `,
      item: `
        <h1><a href="{{url}}" rel="noopener">{{name}}</a></h1>
      `
    }
  })
]);

// refresh does not request pages in infinite hits again #2742
// https://github.com/algolia/react-instantsearch/issues/2742
search.client.clearCache();

search.start();