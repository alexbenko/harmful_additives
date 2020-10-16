import json

def createDictionaryFile():
    output = {}
    with open('misc.txt','r') as f:
      misc = [line.rstrip('\n') for line in f]

    with open('csweetener.txt','r') as f:
      sweeteners = [line.rstrip('\n') for line in f]

    with open('color.txt','r') as f:
      colors = [line.rstrip('\n') for line in f]

    output['misc']     = {}
    output['colors']     = {}
    output['sweeteners'] = {}

    for i in misc:
      key_values = i.split(': ')
      cleaned_key = "".join(key_values[0].lower().split())
      output['misc'][cleaned_key] = key_values[1]

    for i in colors:
      key_values_colors = i.split(': ')
      cleaned_key_colors = "".join(key_values_colors[0].lower().split())
      output['colors'][cleaned_key_colors] = key_values_colors[1]

    for i in sweeteners:
      key_values_sweeteners = i.split(': ')
      cleaned_key_sweeteners = "".join(key_values_sweeteners[0].lower().split())
      output['sweeteners'][cleaned_key_sweeteners] = key_values_sweeteners[1]

    with open('result.json', 'w') as fp:
      json.dump(output, fp,indent=2)

    print(output)



createDictionaryFile()