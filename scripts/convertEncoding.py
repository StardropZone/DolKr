import os
import chardet

directory = 'KrTrans/'

for filename in os.listdir(directory):
    filepath = os.path.join(directory, filename)
    if os.path.isfile(filepath):
        with open(filepath, 'rb') as file:
            raw_data = file.read()
            result = chardet.detect(raw_data)
            encoding = result['encoding']
            if encoding and encoding.lower() != 'utf-8':
                print(f"Converting {filename} from {encoding} to utf-8")
                with open(filepath, 'w', encoding='utf-8') as output:
                    output.write(raw_data.decode(encoding))
