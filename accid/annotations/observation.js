import {get as loGet, set as loSet} from 'lodash/fp';
import {booleanField, locationClusterField, arrayClusterField, singleClusterField} from './fieldtypes';

const prefillYoutube = u => ({
  online_title: loGet('snippet.title')(u),
  online_title_ar: loGet('snippet.title')(u),
  online_title_en: loGet('snippet.title')(u),
  online_link: loGet('_sc_downloads.0.term')(u),
  description: loGet('snippet.description')(u),
  channel_id: loGet('snippet.channelId')(u),
  view_count: loGet('statistics.viewCount')(u),
  filename: loGet('_sc_downloads.0.location')(u),
  creator: loGet('snippet.channelTitle')(u),
  duration: loGet('contentDetails.duration')(u),
  acquired_from: loGet('snippet.channelTitle')(u),
  md5_hash: loGet('_sc_downloads.0.md5')(u),
  sha256_hash: loGet('_sc_downloads.0.sha256')(u),

  language: loGet('_sc_language')(u),
  rights_owner: loGet('snippet.channelTitle')(u),
});

const loGetTDl = u => {
  const ff = find(d => d.type === 'twitter_video', u._sc_downloads);
  if (ff) {
    return ff.location;
  }
  return loGet('_sc_downloads.0.location')(u);
};

const prefillTweet = u => ({
  online_title: loGet('tweet')(u),
  online_title_ar: loGet('tweet')(u),
  online_title_en: loGet('tweet')(u),

  online_link: `https://twitter.com/${loGet(
    'user.screen_name',
    u
  )}/status/${loGet('tweet_id', u)}`,

  filename: loGetTDl(u),
  md5_hash: loGet('_sc_downloads.0.md5')(u),
  sha256_hash: loGet('_sc_downloads.0.sha256')(u),

  description: loGet('tweet')(u),
  channel_id: loGet('user.user_id')(u),
  creator: loGet('user.screen_name')(u),
  acquired_from: loGet('user.screen_name')(u),
  language: loGet('_sc_language')(u),
  rights_owner: loGet('user.screen_name')(u),
});

const prefillFacebook = u => ({
  online_title: loGet('message')(u),
  online_title_ar: loGet('message')(u),
  online_title_en: loGet('message')(u),

  online_link: loGet('link')(u),

  filename: loGet('_sc_downloads.0.location')(u),
  md5_hash: loGet('_sc_downloads.0.md5')(u),
  sha256_hash: loGet('_sc_downloads.0.sha256')(u),

  description: loGet('message')(u),
  channel_id: loGet('from.id')(u),
  creator: loGet('from.name')(u),
  acquired_from: loGet('from.name')(u),
  language: loGet('_sc_language')(u),
  rights_owner: loGet('from.name')(u),
});

const prefillFile = u => ({
  filename: loGet('location')(u),
  md5_hash: loGet('md5')(u),
  sha256_hash: loGet('sha256')(u),
});

export const sources = {
  youtube_channel: prefillYoutube,
  sheets_import: prefillYoutube,
  twitter_feed: prefillTweet,
  fs_unfold: prefillFile,
  facebook_api_feed: prefillFacebook,
};

export const prefillsc = (u) => (sources[u._sc_source] ? sources[u._sc_source](u) : {});

const fields = {
  verified: booleanField,
  filename: {
    get: (u, k, v) => u,
    set: (u, k, v) => loSet('annotations.sa_link', v ? v.replace("/var/www/files/", "https://cube.syrianarchive.org/") : v, u)
  },
  location: locationClusterField,
  locationold: locationClusterField,
  collections: arrayClusterField('collections', 'collection', () => {}),
  weapons_used: arrayClusterField('weapons', 'name', () => {}),
  incident_code: arrayClusterField('incidents', 'incident_code', () => {}),
}
export default {
  fields,
  prefill: prefillsc,
};
