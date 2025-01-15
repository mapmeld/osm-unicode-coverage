# pip install osmium unicodeblock
# get pbfs from https://download.geofabrik.de/
import osmium
import unicodeblock.blocks

idx = 0
for o in osmium.FileProcessor('croatia-latest.osm.pbf'):
    idx += 1
    if idx % 4_000_000 == 0:
        print(idx)
    for k, v in o.tags:
        if k in ['name', 'alt_name']:
            for letter in v:
                if ord(letter) > 255:
                    block = unicodeblock.blocks.of(letter)
                    if block == 'GLAGOLITIC':
                        print(v)
                        print(o.id)
                        break
