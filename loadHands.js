var fs = require('fs');
var parse = require('xml-parser');
const readline = require('readline');

export const getDescription = (rank) => {
  var xml = fs.readFileSync('./filters/range' + rank.toString() + '.filter', 'utf8');
  var obj = parse(xml);
  return obj.root.children[0].attributes.Description;
}

export const getSuitedness = (description) => {
    if(description.search("!$ds!$rs;") != -1){
      return "rs"
    } else if(description.search("ds") != -1){
      return "ds"
    } else if(description.search("ss") != -1){
      return "ss"
    } else{
      return "unknown"
    }
}

export const getHands = (description) => {
  let hands = description.split(':')[1].split(";").map((string) => string.split('$')[0].trim());
  return hands;
}

export const loadHands = () => {
  return new Promise((resolve, reject) => {
    let rank = 1;
    let allHands = [];
    let errors = [];
    while (rank < 134) {
      try {
        let description = getDescription(rank);
        let suitedness = getSuitedness(description);
        let hands = getHands(description);
        hands.forEach(hand => {
          allHands.push({
            hand,
            suitedness,
            rank
          });
        })
        rank++;
      } catch (e) {
        console.log("Error in rank: "+r);
        errors.push(rank);
        rank++;
      }
    }
    resolve(allHands);
  })
}

console.log(getDescription(15));
console.log(getSuitedness(getDescription(15)));
console.log(getSuitedness(getDescription(15)));

