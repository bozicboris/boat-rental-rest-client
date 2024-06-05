const searchInput = document.getElementById('search');
const params = new URLSearchParams(window.location.search);
const searchParam = params.get('search');
const currentPage = window.location.pathname;
console.log(currentPage);
if (searchParam != null && searchParam !== '') {
    searchInput.value = searchParam;
}
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
    }
});
document.getElementById('search-btn').addEventListener('click', () => {
    doSearch();
});
function doSearch() {
    if (searchInput.value === '') return;
    window.location.href = `${currentPage}?search=${searchInput.value}`;
}
