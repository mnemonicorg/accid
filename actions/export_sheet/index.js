import {
  map, get, curry, keys, at, concat, mergeAll
} from 'lodash/fp';

import SheetsDo from '../../node_modules/@sugarcube/plugin-googlesheets/_dist/sheets';
import config from '../../config/actions/import_sc_sheet';


const objectDeepKeys = (obj) =>
  Object.keys(obj)
    .filter(key => obj[key] instanceof Object)
    .map(key => objectDeepKeys(obj[key])
      .map(k => `${key}.${k}`))
    .reduce((x, y) => x.concat(y),
      Object.keys(obj).filter(d => (!(obj[d] instanceof Object))));

export const unitsToRows = curry((fields, units) =>
  concat([fields], map(at(fields), units))
);


const action = async (args) => {
  const id = args.spreadsheet;

  const data = args.data; // eslint-disable-line

  const fields = objectDeepKeys(mergeAll(data));

  const tokens = config.token;
  const client = config.client_id;
  const secret = config.client_secret;

  const copyFromSheet = get('config.copy_from_sheet', config);
  const copyFromSpreadsheet = get('config.copy_from_spreadsheet', config);

  const nm = String(Date.now());

  const [units] = await SheetsDo(
    async ({
      getOrCreateSheet,
      duplicateSheet,
      createValues,
      clearValues,
    }) => {
      const {sheetId} = await (copyFromSheet
        ? duplicateSheet(copyFromSpreadsheet, copyFromSheet, id, nm)
        : getOrCreateSheet(id, nm));
      const us = unitsToRows(fields, data);

      await clearValues(id, nm);
      await createValues(id, nm, us);


      const url = `https://docs.google.com/spreadsheets/d/${id}/edit#gid=${sheetId}`;
      console.log(url);

      return data;
    },
    {client, secret, tokens},
  );

  return units;
};

action.config = {
  name: 'Import a spreadsheet of accid data',
  args: {
    spreadsheet: 'The spreadsheet id to export to.',
    data: 'dataaaa'
  },
  some: 'key',
};

export default action;
