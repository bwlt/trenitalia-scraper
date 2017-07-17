// @flow

import list from "./stations-list.json";

export default function(): StationObject[] {
  return Object.keys(list).map(key => {
    return {
      id: key,
      name: list[key].name
    };
  });
}
