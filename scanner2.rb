# based on http://www.rohitmenon.com/index.php/how-to-parse-large-xml-files-in-ruby/
# sudo apt-get install libxml2 libxml2-dev libxslt1-dev
# gem install libxml-ruby unicode-blocks
require 'json'
require 'unicode/blocks'
require 'libxml'
include LibXML

class Parser
  include XML::SaxParser::Callbacks

  def initialize
    @lat = 0
    @lng = 0
    @output_areas = {}
  end

  def on_start_element(element, attributes)
    if element == 'way'
      @lat = nil
      @lng = nil
    end
    if attributes.has_key?('lat') && attributes.has_key?('lon')
      @lat = attributes['lat'].to_f.round(3).to_s
      @lng = attributes['lon'].to_f.round(3).to_s
    end
    if attributes.has_key?('k') && attributes['k'] === 'name' && !@lat.nil?
      blocks = Unicode::Blocks.blocks(attributes['v'])
      if blocks.length > 1 || blocks[0] != 'Basic Latin'
        print blocks
        # record this not-just-Basic Latin
        @output_areas[@lat] = {} unless @output_areas.has_key? @lat
        @output_areas[@lat][@lng] = [] unless @output_areas[@lat].has_key? @lng
        blocks.each do |block|
          if block != 'Basic Latin' && block != 'General Punctuation'
            @output_areas[@lat][@lng] << block unless @output_areas[@lat][@lng].include? block
          end
        end
      end
    end
  end

  def on_cdata_block(cdata)
  end

  def on_characters(chars)
  end

  def on_end_element(element)
  end

  def dump_json
    File.open('./antarctica.json', 'w') do |f|
      f.write(@output_areas.to_json)
    end
  end
end

parser = XML::SaxParser.file('./antarctica-latest.osm')
parser.callbacks = Parser.new
parser.parse
parser.callbacks.dump_json
