import json
import fileinput

def createDictionaryFile():
    output = []
    index = 0
    with open('misc.txt','r') as f:
      misc = [line.rstrip('\n') for line in f]

    with open('csweetener.txt','r') as f:
      sweeteners = [line.rstrip('\n') for line in f]

    with open('color.txt','r') as f:
      colors = [line.rstrip('\n') for line in f]

    for i in misc:
      key_values = i.split(': ')
      cleaned_name = "".join(key_values[0].lower().split())

      output.append({
        "name": cleaned_name,
        "why": key_values[1],
        "category": "misc"
      })

      index += 1

    for i in colors:
      key_values_colors = i.split(': ')
      cleaned_name = "".join(key_values_colors[0].lower().split())

      output.append({
        "name": cleaned_name,
        "why": key_values_colors[1],
        "category": "colors"
      })

      index += 1

    for i in sweeteners:
      key_values_sweeteners = i.split(': ')
      cleaned_name = "".join(key_values_sweeteners[0].lower().split())

      output.append({
        "name": cleaned_name,
        "why": key_values_sweeteners[1],
        "category": "sweeteners"
      })

      index += 1


    with open('result.json', 'w') as fp:
      json.dump(output, fp,indent=2)

    print('Successfully Generated Typescript Export File ! 🥳')



createDictionaryFile()