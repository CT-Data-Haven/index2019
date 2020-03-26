import * as _ from 'lodash';
import { scaleOrdinal, scaleThreshold } from 'd3-scale';
import wordwrap from 'wordwrapjs';
import { format } from 'd3-format';
import * as topojson from 'topojson-client';
import { ckmeans } from 'simple-statistics';

/////////////// general utilities
const _filterByKey = (data, key, value, first = true) => (
  first ? _.find(data, { [key]: value }) : _.filter(data, { [key]: value })
);

/////////////// strings
const cleanHdrLabels = (lbl, first = true) => {
  const hdr = _.replace(lbl, /_/g, ' ');
  return first ? _.upperFirst(hdr) : _.startCase(hdr);
};

const cleanIdxLabels = (lbl) => (
  cleanHdrLabels(lbl, false) + ' Index'
);

const cleanKeys = (obj, first = true) => (
  _.chain(obj)
    .keys()
    .map((d) => cleanHdrLabels(d, first))
    .value()
);

const titleLabel = (lbl, n = 2) => (
  _.upperFirst(lbl.substring(n))
);

const wrapTspan = (txt) => (
  wordwrap.lines(txt, { width: 15 })
);

const compileHeader = (type) => {
  const headers = {
    versus: '<%= lbls[0] %> vs. <%= lbls[1] %>',
    colon: '<%= lbl %>: <%= dataBy %>, <%= grouping %>',
    comma: '<%= lbl %>, <%= grouping %>',
    lblBy: '<%= lbl %> by <%= dataBy %>',
    lblBy2: '<%= lbl %> by <%= dataBy %>, <%= grouping %>'
  };
  return _.template(headers[type]);
};

const fmt = (fmtStr) => (
  (d) => (d === null || d === undefined ? 'N/A' : format(fmtStr)(d))
);

/////////////// data munging

const getProfile = (data, filterBy, filterVal, meta, omit = null, variable = 'indicator', compareCt = false) => {
  let profData;
  if (compareCt) {
    profData = _.filter(data, (d) => d[filterBy] === filterVal || d.level === 'state');
  } else {
    profData = _filterByKey(data, filterBy, filterVal, true);
  }
  if (profData.length === 0) {
    return [];
  } else {
    const wide = _.map(meta, (m) => {
    const format = m.format || '0.0%';
    const val = fmt(format)(profData[m[variable]]);
    return {
      indicator: m.display,
      value: val
    };
  });
  return wide;
  }
  // const profData = _filterByKey(data, filterBy, filterVal, true);

};

const getGrpProfile = (data, filterBy, filterVal, meta, indicator, omit = null) => {
  const filtered = _.mapValues(data, (d) => _filterByKey(d, filterBy, filterVal, true));

  const nestedProf = _.chain(meta)
    .mapValues((m) => _filterByKey(m, 'indicator', indicator, true))
    .mapValues((m, age) => {
      const k = m.indicator;
      const ageData = filtered[age] || { [filterBy]: filterVal, [k]: undefined };
      const format = m.format || ',d';
      const val = fmt(format)(ageData[k]);

      return {
        indicator: age,
        value: val
      };
    })
    .toArray()
    .value();
  return nestedProf;
};

const filterForScatter = (data) => (
  _filterByKey(data, 'category', 'Total', false)
);

const filterForBar = (data, region, variable) => {
  let out;
  if (variable === 'community') {
    if (region === 'Connecticut') {
      out = _.filter(data, (d) => _.includes(['1_state', '2_region'], d.level));
    } else {
      out =  _.filter(data, (d) => _.includes([region, 'Connecticut'], d.region));
    }
    out = _.filter(out, { 'category': 'Total' });
  } else {
    out = _.filter(data, { 'name': region });
  }
  return out;
};

const fillMissing = (data, variable) => (
  _.map(data, (d) => {
    if (_.keys(d).indexOf(variable) === -1) {
      d[variable] = null;
    }
    return d;
  })
);

const getMapData = (data, indicator) => {
  let vals;
  if (data[0].level) {
    vals = _filterByKey(data, 'level', 'town', false);
  } else {
    vals = data;
  }
  return (
    _.chain(vals)
      .map((d) => ({
        name: d.name,
        value: d[indicator]
      }))
      .keyBy('name')
      .value()
  );
}

const filterTownLvl = (data) => (
  _.chain(data)
    .mapValues((v, k) => _.filter(v, (d) => d.bytown))
    .omitBy(_.isEmpty)
    .value()
);

/////////////// metadata
const getVariables = (data) => (
  _.chain(data)
    .flatMap(_.keys)
    .uniq()
    .pull('name', 'category', 'group', 'level', 'region')
    .sort()
    .reverse()
    .value()
);

const getSubVariables = (variables, v1) => (
  _.without(variables, v1)
);

const getComparables = (variables) => (
  _.drop(variables, 1).concat(_.take(variables, 1))
);

const getQMeta = (meta, indicator) => (
  _filterByKey(meta, 'indicator', indicator, true)
);

const getRegions = (data) => (
  _.chain(data)
    .filter((d) => _.includes(['1_state', '2_region'], d.level))
    .map('name')
    .uniq()
    // .filter((d) => d.search(/(Inner|Outer) Ring/) === -1)
    .filter((d) => !RegExp('(Inner|Outer) Ring').test(d))
    .value()
);

const getNestedGrps = (data) => (
  _.chain(data)
    .groupBy('category')
    .mapValues((d) => _.map(d, 'group'))
    .value()
);

const tblColumns = (row, omit) => (
  _.chain(row)
    .keys()
    .difference(omit)
    .value()
);

const objToArray = (obj, key, value) => {
  return _.chain(obj)
    .mapValues((v, k) => ({ [key]: k, [value]: v }))
    .values()
    .value();
};

const filterByString = (meta, string) => {
  const matchKeys = _.chain(meta)
    .keys()
    .map((d) => d.indexOf(string) >= 0 ? d : false)
    .compact()
    .value();
  return _.pick(meta, matchKeys);
};



/////////////// viz
const createScales = (data, pals, variable, rev) => {
  const n = _.size(pals);
  const groups = _.chain(data)
    .map(variable)
    .uniq()
    .value();
  let pal;
  if (rev) {
    pal = _.takeRight(pals[n], groups.length).reverse();
  } else {
    pal = _.take(pals[n], groups.length);
  }
  // let pal = rev ? _.takeRight(pals[n], groups.length) : _.take(pals[n], groups.length);
  const color = scaleOrdinal(groups, pal);
  const rad = scaleOrdinal(groups, [8, 7, 5, 3, 3, 3]);
  return { colorscale: color, sizescale: rad };
};

const getMaxes = (data) => {
  // const numberCols = _.pickBy(data[0], _.isNumber);
  const numberCols = _.chain(data[0])
    .pickBy(_.isNumber)
    .keys()
    .value();
  return _.chain(numberCols)
    .map((c) => ({
      q: c,
      max: _.chain(data).map(c).max().value()
    }))
    .keyBy('q')
    .mapValues('max')
    .value();
};

const makeChoroScale = (data, scheme, nBrks) => {
  const vals = _.chain(data)
    .mapValues('value')
    .values()
    .compact()
    .sort()
    .value();
  if (!vals.length) {
    return scaleThreshold().domain([0, 1]).range(['#ccc']);
  } else {
    const brks = ckmeans(vals, nBrks).map((d) => d[0]).slice(1);

    return scaleThreshold()
      .domain(brks)
      .range(scheme[nBrks]);
  }
};

const makeTooltip = (name, value, format) => (
  `${ name }: ${ fmt(format)(value) }`
);

/////////////////// geography
const getBounds = (geo) => {
  const b = topojson.bbox(geo);
  return [[ b[1], b[0] ], [ b[3], b[2] ]];
};

const makeGeoJson = (shp) => (
  topojson.feature(shp, shp.objects.town)
);


export{
	cleanIdxLabels,
	compileHeader,
	createScales,
	filterForScatter,
	getRegions,
	getVariables,
  cleanHdrLabels,
  cleanKeys,
  fillMissing,
  filterByString,
  filterForBar,
  filterTownLvl,
  fmt,
  getBounds,
  getComparables,
  getGrpProfile,
  getMapData,
  getMaxes,
  getNestedGrps,
  getProfile,
  getQMeta,
  getSubVariables,
  makeChoroScale,
  makeGeoJson,
  makeTooltip,
  objToArray,
  tblColumns,
  titleLabel,
  wrapTspan
};
