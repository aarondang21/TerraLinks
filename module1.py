import wikipedia

name = input("Name of location ")
latitude = input("Latitude of location ")
longitude = input("Longitude of location ")

#creates list of articles with matching coordinates
print("\n")
articles1 = wikipedia.geosearch(latitude, longitude, title=None, results=10, radius=10000)
print("List of articles with matching coordinates\n")
print(articles1)

#creates list of articles with matching names
print("\n")
print("List of articles with matching names\n")
articles2 = wikipedia.search(name, results=10, suggestion=False)
print(articles2)
print("\n")

#initialize lists to store page IDs of articles
pageid1 = []
pageid2 = []

for obj in articles1:
    pageid1.append(obj.wikipedia.WikipediaPage.parent_id) #try something else this doesn't work bc list contains strings not WikipediaPage objects

print(pageid1)

for obj in articles2:
    pageid1.append(obj.wikipedia.WikipediaPage.parent_id) #same here

print(pageid2)

#compare page IDs from both lists and return web address of articles contained in both lists