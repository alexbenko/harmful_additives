import json

def createDictionaryFile():
    output = {}
    with open('cancer.txt','r') as f:
      cancer = [line.rstrip('\n') for line in f]

    with open('csweetener.txt','r') as f:
      sweeteners = [line.rstrip('\n') for line in f]

    with open('color.txt','r') as f:
      colors = [line.rstrip('\n') for line in f]

    output['cancer']     = {}
    output['colors']     = {}
    output['sweeteners'] = {}

    for i in cancer:
      key_values = i.split(': ')
      output['cancer'][key_values[0].lower()] = key_values[1]

    for i in colors:
      key_values1 = i.split(': ')
      output['colors'][key_values1[0].lower()] = key_values1[1]

    for i in sweeteners:
      key_values2 = i.split(': ')
      output['sweeteners'][key_values2[0].lower()] = key_values2[1]

    with open('result.json', 'w') as fp:
      json.dump(output, fp)

    print(output)



createDictionaryFile()