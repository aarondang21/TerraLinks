# TerraLinks
To allow users to easily extract information from the OpenStreetMap GIS, this Google Chrome extension automatically finds relevant Wikipedia articles about a selected map feature in many different languages and places them in a pop-up window. Used as a proof-of-concept for improving NATO's existing GIS software.

# Program Details
Our extension lays dormant in the background at all times except for when a geological node is accessed via OpenStreetMap (OSM). It determines whether a node is selected by querying the front browser tab and checking if it is an OSM URL. Once this node is accessed, the browser extension runs a script that queries the Overpass API and grabs name and location data such as coordinates and location type. The script then queries GeoNet Names server to see if this name has any analogues in other languages. It then runs these names through the Wikipedia API, and determines that they are a match based on cross-checking coordinate and location data. If the algorithm determines that the data matches, the extension updates its popup window with Wikipedia links corresponding to all matching articles for that specific location. English articles are given list priority. If there are no matching names for a particular node or the links found did not pass validation, the window displays no links.

The matching algorithm is simple but effective; it is as strong as the data provided to it. Based on the bounding box of the location from OpenStreetMap, it determines whether the coordinates from GeoNet Names Server and Wikidata are within a reasonable radius. This radius is dynamic; a statue will have a much smaller radius than larger geographical features like rivers. Nonetheless, coordinate data across datatbases tends to vary, so we allow all locations a minimum coordinate discrepancy of 0.5 degrees longitude and latitude. 

The algorithm could be further refined by paying attention to location tags provided by OSM, but these tags do not perfectly match those provided by Wikipedia, and it is yet to be seen if Wikipedia's location data can be easily accessed. There is certainly room for improvement, but our system is accurate ~95% of the time.

Due to the nature of Chrome popup extensions, the popup window cannot be dynamically updated as the background script runs.

# Chrome specifics
The program runs almost exclusively out of the background file. We did not use a content script as all relevant data was contained within the browser and not the DOM tree. 

# Supported languages
Currently, our algorithm only parses the Wikipedia database for English, French, German, Spanish, Arabic, and Italian articles. We can update the application in the future to allow users to specify which languages they would like their articles to appear in. This application has the potential to support all languages relatively easily.

# Reliance on Database quality
By and large, most errors with our algorithm occur as a result of bad documentation across databases. Here are some examples:

Valhalla Train Station in Valhalla, NY is documented as simply "Valhalla" in OpenStreetMap. Our algorithm would interpret this as Valhalla, NY, as the train station's coordinates are very close to the town's coordinates. If the OSM name was more specific, our algorithm would have no issue locating the train station.

The Arabic Wikipedia article for Brazil does not contain coordinate data. Our algorithm thus assumes the article is not referring to a location and skips it while searching for matches. It ends up matching with the article for a Brazilian province instead, which is close enough in name and within the bounding box of Brazil.

There are many more examples, but they all boil down to the same point: our program is only as accurate as the databases. A simple rule of thumb: if the database information is detailed and specific, our algorithm will always be correct.

# Offline compatibility
This browser extension functions as a proof-of-concept, and thus uses crowdsourced geological data and information from databases like OpenStreetMap, Wikipedia and GeoNet Names server. It can certainly be repurposed to query databases that are entirely offline, and can run independent of the Chrome Browser with just a few tweaks.
