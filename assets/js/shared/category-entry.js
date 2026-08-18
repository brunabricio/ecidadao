(() => {
  const category = window.PETICAO_CATEGORY;
  if (!category || !Number.isInteger(category.id)) return;
  const target = new URL('../../index.html', window.location.href);
  target.searchParams.set('categoria', String(category.id));
  window.location.replace(target.href);
})();