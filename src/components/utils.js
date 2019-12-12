import * as _ from 'lodash';
import { scaleOrdinal } from 'd3-scale';
import wordwrap from 'wordwrapjs';
import { format } from 'd3-format';

const cleanHdrLabels = (lbl) => (
  // lbl.split('_').map(_.capitalize).join(' ')
  // _.upperFirst(lbl.replace('_', ' '))
  _.chain(lbl)
    .replace(/_/g, ' ')
    .upperFirst()
    .value()
);

const cleanIdxLabels = (lbl) => (
  lbl.split('_').map(_.capitalize).join(' ') + ' Index'
);

const titleLabel = (lbl, n = 2) => (
  _.upperFirst(lbl.substring(n))
);

const wrapTspan = (txt) => {
  const txtarray = wordwrap.lines(txt, { width: 15 });
  // return (
  //   <text>
  //     txtarray.map((d, j) => <tspan key={ `tspan-${ i }-${ j }` }>{ d }</tspan>)
  //   </text>
  // );
  return txtarray;
};

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

const getRegions = (data) => {
  let regs = _.chain(data)
    // .filter({ level: '2_region' })
    .filter((d) => _.includes(['1_state', '2_region'], d.level))
    .map('name')
    .uniq()
    // .filter((d) => d.search(/(Inner|Outer) Ring/) === -1)
    .filter((d) => !RegExp('(Inner|Outer) Ring').test(d))
    .value();
  return regs;
};

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
    scatter: '<%= lbl1 %> vs. <%= lbl2 %>',
    bar: '<%= lbl1 %> by <%= dataBy %>, <%= region %>',
    table: 'Components of <%= lbl1 %> by <%= dataBy %>, <%= region %>'
  };
  return _.template(headers[type]);
};

const fmt = (fmtStr) => (
  format(fmtStr)
);

const tblColumns = (row, omit, meta) => {
  // const omit = ['']
  const keys = _.chain(row)
    .keys()
    .difference(omit)
    .value();
  const cols = _.map(keys, (d, i) => ({
    dataField: d,
    text: cleanHdrLabels(d),
    sort: true,
    formatter: (meta[d] !== undefined ? format(meta[d]) : null),
    classes: (meta[d] !== undefined ? 'text-right' : 'text-left')
  }));
  // console.log(keys.map((d) => meta[d] !== undefined ? format(meta[d]) : null));
  return cols;
};


export{
  cleanHdrLabels,
	cleanIdxLabels,
  titleLabel,
  wrapTspan,
	getVariables,
  getSubVariables,
	getRegions,
	filterForScatter,
  filterForBar,
	createScales,
	compileHeader,
  tblColumns
};
