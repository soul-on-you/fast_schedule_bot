const secureFetch = async (fetch, retryCount) => {
  try {
    if (retryCount === 0) return;
    return await fetch();
  } catch (e) {
    console.error(e);
    return await secureFetch(fetch, retryCount - 1);
  }
};

module.exports = secureFetch;
