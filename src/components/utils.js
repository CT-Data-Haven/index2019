import * as _ from 'lodash';
import { scaleOrdinal } from 'd3-scale';
import wordwrap from 'wordwrapjs';
import { format } from 'd3-format';

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
    .map((d) => cleanHdrLabels(d, first = first))
    .value()
);

const titleLabel = (lbl, n = 2) => (
  _.upperFirst(lbl.substring(n))
);

const wrapTspan = (txt) => (
  wordwrap.lines(txt, { width: 15 })
);

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

const getQMeta = (meta, question) => (
  _.find(meta, (q) => q.question === question)
);

const getProfile = (data, group, meta) => (
  _.chain(data)
    .find((d) => d.group === group)
    .omit(['category', 'group'])
    .toPairs()
    .map((d) => ({ question: d[0], display: getQMeta(meta, d[0]).display, value: d[1] }) )
    .orderBy('display')
    .value()
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


const filterForScatter = (data, region) => (
  _.filter(data, { 'category': 'Total' })
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



const compileHeader = (type) => {
  const headers = {
    scatter: '<%= lbls[0] %> vs. <%= lbls[1] %>',
    bar: '<%= lbls[0] %> by <%= dataBy %>, <%= region %>',
    table: 'Components of <%= lbls[0] %> by <%= dataBy %>, <%= region %>',
    profile: '<%= lbls[0] %>, <%= group %>'
  };
  return _.template(headers[type]);
};

const fmt = (fmtStr) => (
  (d) => (d === null || d === undefined ? 'N/A' : format(fmtStr)(d))
);

const tblColumns = (row, omit) => (
  _.chain(row)
    .keys()
    .difference(omit)
    .value()
);

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

// const maxes = _.chain(colNames)
//   .map((c) => ({
//     q: c,
//     max: _.chain(data).map(c).max().value()
//   }))
//   .keyBy('q')
//   .mapValues('max')
//   .value();

export{
  cleanHdrLabels,
	cleanIdxLabels,
  cleanKeys,
  titleLabel,
  wrapTspan,
  getQMeta,
  getNestedGrps,
  getProfile,
  getMaxes,
  // getQuestions,
	getRegions,
  getSubVariables,
	getVariables,
	filterForScatter,
  filterForBar,
	createScales,
	compileHeader,
  tblColumns,
  fmt
};
