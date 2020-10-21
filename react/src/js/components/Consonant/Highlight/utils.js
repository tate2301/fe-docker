/**
 * Examine text for any matches.
 * If we find matches, add them to the returned array
 * as a "chunk" object ({start:number, end:number}).
 * @return {start:number, end:number}[]
 */
const findChunks = ({ searchString, text }) => {
    const chunks = [];
    const regex = new RegExp(searchString, 'gi');

    let match = regex.exec(text);

    while (match) {
        const start = match.index;
        const end = regex.lastIndex;
        // We do not return zero-length matches
        if (end > start) {
            chunks.push({ highlight: false, start, end });
        }

        // Prevent browsers like Firefox from getting stuck in an infinite loop
        // See http://www.regexguru.com/2008/04/watch-out-for-zero-length-matches/
        if (match.index === regex.lastIndex) {
            regex.lastIndex += 1;
        }

        match = regex.exec(text);
    }

    return chunks;
};

/**
   * Takes an array of {start:number, end:number} objects
   * and combines chunks that overlap into single chunks.
   * @return {start:number, end:number}[]
   */
const combineChunks = chunks => chunks
    .sort((first, second) => first.start - second.start)
    .reduce((processedChunks, nextChunk) => {
    // First chunk just goes straight in the array...
        if (processedChunks.length === 0) {
            return [nextChunk];
        }
        // ... subsequent chunks get checked to see if they overlap...
        const prevChunk = processedChunks.pop();
        if (nextChunk.start <= prevChunk.end) {
        // It may be the case that prevChunk completely surrounds nextChunk, so take the
        // largest of the end indeces.
            const endIndex = Math.max(prevChunk.end, nextChunk.end);
            processedChunks.push({
                highlight: false,
                start: prevChunk.start,
                end: endIndex,
            });
        } else {
            processedChunks.push(prevChunk, nextChunk);
        }
        return processedChunks;
    }, []);

/**
   * Given a set of chunks to highlight, create an additional set of chunks
   * to represent the bits of text between the highlighted text.
   * @param chunksToHighlight {start:number, end:number}[]
   * @param totalLength number
   * @return {start:number, end:number, highlight:boolean}[]
   */
const fillInChunks = ({ chunksToHighlight, totalLength }) => {
    const allChunks = [];
    const append = (start, end, highlight) => {
        if (end - start > 0) {
            allChunks.push({
                start,
                end,
                highlight,
            });
        }
    };

    if (chunksToHighlight.length === 0) {
        append(0, totalLength, false);
    } else {
        let lastIndex = 0;
        chunksToHighlight.forEach((chunk) => {
            append(lastIndex, chunk.start, false);
            append(chunk.start, chunk.end, true);
            lastIndex = chunk.end;
        });
        append(lastIndex, totalLength, false);
    }
    return allChunks;
};

/**
   * Creates an array of chunk objects representing both higlightable
   * and non highlightable pieces of text that match each search word.
   * @return Array of "chunks" (where a Chunk is { start:number, end:number, highlight:boolean })
   */
// eslint-disable-next-line import/prefer-default-export
export const findAll = ({ text = '', searchString = '' }) => {
    const chunks = findChunks({
        text,
        searchString,
    });

    const chunksToHighlight = combineChunks(chunks);

    return fillInChunks({
        chunksToHighlight,
        totalLength: text.length,
    });
};
