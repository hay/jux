var yaml = require('js-yaml');
var marked = require('marked');

const BLOCK_SEPERATOR = '---';

function parseText(text) {
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
            if (!first) {
                lines.push(line);
            } else {
                // Pass: ignore everything before the first ---
            }
        }
    });

    // Last block
    block.content = marked(lines.join('\n'));
    blocks.push(block);

    return blocks;
}

function parse(text) {
    var blocks = parseText(text);

    return {
        header : blocks.shift().meta,
        blocks : blocks
    };
}

module.exports = {
    parse : parse
};