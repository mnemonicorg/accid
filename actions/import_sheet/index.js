import {
  flow, reject, map, zipObjectDeep, head, tail, isEmpty
} from 'lodash/fp';

import SheetsDo from '../../node_modules/@sugarcube/plugin-googlesheets/_dist/sheets';
import config from '../../config/actions/import_sc_sheet';


const fixBools = map(v => {
  switch (v) {
    case 'TRUE':
      return true;
    case 'FALSE':
      return false;
    default:
      return v;
  }
});

const zipRows = (rows) =>
  flow([
    tail, // The body of the spreadsheet, without the header.
    reject(isEmpty), // Drop empty rows.
    map(fixBools),
    map(zipObjectDeep(head(rows))), // Create a list of objects.
  ])(rows);


const action = async (args) => {
  const id = args.spreadsheet;
  const sheet = args.sheet; // eslint-disable-line

  const tokens = config.token;
  const client = config.client_id;
  const secret = config.client_secret;

  const [units] = await SheetsDo(
    async ({getValues}) => {
      const rows = await getValues(id, sheet);
      const data = zipRows(rows);
      return data;
    },
    {client, secret, tokens},
  );

  return units;
};

action.config = {
  name: 'Import a spreadsheet of accid data',
  args: {
    spreadsheet: 'The spreadsheet id to import.',
    sheet: 'the sheet name to import.'
  },
  some: 'key',
};

export default action;
