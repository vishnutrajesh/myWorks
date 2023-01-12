import {HandledRoute, httpGetJson, routeSplit, ScullyConfig} from '@scullyio/scully';
/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'
import {registerPlugin} from "@scullyio/scully";
registerPlugin('router', 'artCollections', async() => {
  const arr: { route: string; }[] = [];
  Array.from(new Array(50)).forEach((x, i)  => {
    arr.push({ "route": `/page/${i + 1}`})
  })
  return arr
})
registerPlugin('router', 'mySample', async(route: any, config: any) => {
  const myData: any = await httpGetJson('https://api.artic.edu/api/v1/artworks?limit=50');
  const { createPath } = routeSplit(route);
  const myRoutes: HandledRoute[] = myData?.data.map((item: any) => ({
    route: createPath(`${item.id}`),
  }));
  return myRoutes;
})
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "art-collection",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  routes: {
    '/page/:no': {
      type: 'artCollections'
    },
    '/art/:id': {
      type: 'mySample'
    }
  }
};
