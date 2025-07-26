// Function to retry loading a chunk to avoid chunk load error for out of date code
export const lazyRetry = function (componentImport: any, pathModule?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem('retry-lazy-refreshed') || 'false'
    );
    componentImport()
      .then((component: any) => {
        window.sessionStorage.setItem('retry-lazy-refreshed', 'false'); // success so reset the refresh

        resolve(component.default ? component : { default: component[pathModule as string] });
      })
      .catch((error: any) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem('retry-lazy-refreshed', 'true'); // we are now going to refresh
          return window.location.reload(); // refresh the page
        }
        reject(error); // Default error behavior as already tried refresh
      });
  });
};
