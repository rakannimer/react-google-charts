import { GoogleViz } from "./types";

export const loadDataTableFromSpreadSheet = async (
  googleViz: GoogleViz,
  spreadSheetUrl: string,
  urlParams: {
    headers?: number;
    gid?: any;
    sheet?: string;
    query?: string;
    access_token?: string;
  } = {}
) => {
  return new Promise((resolve, reject) => {
    const headers = `${
      urlParams.headers ? `headers=${urlParams.headers}` : `headers=0`
    }`;
    const queryString = `${
      urlParams.query ? `&tq=${encodeURIComponent(urlParams.query)}` : ``
    }`;
    const gid = `${urlParams.gid ? `&gid=${urlParams.gid}` : ""}`;
    const sheet = `${urlParams.sheet ? `&sheet=${urlParams.sheet}` : ""}`;
    const access_token = `${
      urlParams.access_token ? `&access_token=${urlParams.access_token}` : ""
    }`;
    const urlQueryString = `${headers}${gid}${sheet}${queryString}${access_token}`;
    const urlToSpreadSheet = `${spreadSheetUrl}/gviz/tq?${urlQueryString}`; //&tq=${queryString}`;
    const query = new googleViz.visualization.Query(urlToSpreadSheet);
    query.send((response: any) => {
      if (response.isError()) {
        reject(
          `Error in query:  ${response.getMessage()} ${response.getDetailedMessage()}`
        );
      } else {
        resolve(response.getDataTable());
      }
    });
  });
};
