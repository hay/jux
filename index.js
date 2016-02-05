var yaml = require('js-yaml');
var marked = require('marked');

const BLOCK_SEPERATOR = '---';

function parse(text) {
    var block, lines;
    var blocks = [];
    var TAG_OPEN = false;
    var first = true;

    text.split('\n').forEach((line) => {
        if (line.trim() === BLOCK_SEPERATOR) {
            if (TAG_OPEN) {
                block.meta = yaml.safeLoad(lines.join('\n'));
                lines = [];
            } else {
                if (!first) {
                    block.content = marked(lines.join('\n'));
                    blocks.push(block);
                } else {
                    first = false;
                }

                lines = [];
                block = {};
            }

            TAG_OPEN = !TAG_OPEN;
        } else {
            lines.push(line);
        }
    });

    // Last block
    block.content = marked(lines.join('\n'));
    blocks.push(block);

    return blocks;
}

module.exports = {
    parse : parse
};