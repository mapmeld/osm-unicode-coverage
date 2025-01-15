# pip install osmium unicodeblock
# get pbfs from https://download.geofabrik.de/
import osmium
import unicodeblock.blocks

knownBlocks = []
idx = 0
for o in osmium.FileProcessor('africa-latest.osm.pbf'):
    # if o.type_str() == 'n':
    idx += 1
    if idx % 4_000_000 == 0:
        print(idx)
    # restart script
    # if idx < 1728000000:
        # continue
    for letter in (o.tags.get('name', '') + o.tags.get('alt_name', '')):
        if ord(letter) > 255:
            block = unicodeblock.blocks.of(letter)
            if block not in knownBlocks:
                knownBlocks.append(block)
                print(block)
                print(o.tags.get('name', '') + '_' + o.tags.get('alt_name', ''))
print(knownBlocks)

# EMOTICONS, LETTERLIKE_SYMBOLS, MATHEMATICAL_ALPHANUMERIC_SYMBOLS , SPECIALS, ENCLOSED_ALPHANUMERIC_SUPPLEMENT, None, VARIATION_SELECTORS
# OGHAM, TAGBANWA, and BAMUM
