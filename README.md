# OSM Unicode Coverage

Using global OSM extracts from https://download.geofabrik.de/, find areas using each Unicode Block

Excludes Basic Latin, Latin-1 Supplement, and Punctuation. Includes Latin Extended

Lat/lng rounded to nearest two-digits to avoid over-density

## Uses

- Removing errors or vandalism (for example, "Čzech Republik🇨🇿" in New Zealand)
- Locating local hotspots for languages (Antarctic bases, shops catering toward local communities or foreign visitors)
- Highlighting use of less common scripts (for example, some Indian scripts are used only rarely on OSM names)
- Measuring use of dual scripts
- Measuring use of local script / Latin script in foreigner-mapped areas

## Examples

Latin Extended-B hotspot in Guyana

<img src="https://mapmeld.com/osm-unicode-coverage/img/latinextendedb.png?r=3"/>

Locating an Antarctic base browsing for Devanagari script

<img src="https://mapmeld.com/osm-unicode-coverage/img/antarctic_bases.png?r=2"/>

Unicode flag vandalism (found in New Zealand)

<img src="https://mapmeld.com/osm-unicode-coverage/img/czechvandal.png?r=2"/>

## License

Open source / CC-Zero
