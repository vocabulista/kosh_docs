
# Deploying Kosh's Backend

## Input: Data module

A Kosh data module consists of: 
1.  [Lexical data in XML](#data_xml)
2.  [Config file in JSON](#config_json)
3. ['.kosh' file](#kosh_file)

### Lexical data in XML 
You can add to Kosh **any valid XML** file. The following entry belongs to the the Basque dictionary Hiztegi Batua.
This dictionary has been compiled by the Academy of the Basque Language, Euzkaltzaindia. 
You can also access it at [Kosh Data](implementations/kosh_data.md)

```xml
 <entry id="13">
    <form>
      <orth>abadetasun</orth>
    </form>
    <sense n="1">
      <gramGrp>
        <pos>
          <q>iz.</q>
        </pos>
      </gramGrp>
      <def>monasterioko buruaren kargua eta egitekoa</def>
    </sense>
    <sense n="2">
      <gramGrp>
        <pos>
          <q>iz.</q>
        </pos>
      </gramGrp>
      <def>apaizgoa</def>
      <usg type="geo">
        <q>Bizk.</q>
      </usg>
    </sense>
  </entry>
``` 

### JSON Configuration File

Kosh leverages XPath 1.0 notation to specify information about XML nodes and their subnodes in a JSON configuration file.

**Specifying XML Nodes and Subnodes**

To define the XML nodes and their subnodes to be indexed, you need to create a JSON configuration file. In this file, you use the XPath 1.0 notation to specify the desired nodes and subnodes. By using XPath expressions, you can precisely identify the XML elements for indexing.

**Indexing Arrays of Elements**

Elasticsearch inherently supports indexing arrays of elements. When deploying Kosh, it is important to inform both Kosh and Elasticsearch about array indexing. To do so, you must modify the `fields` property in your JSON configuration file by enclosing the respective value in square brackets. For example, if the field you want to index is named `sense_def`, you should specify it as `[sense_def]` within the `fields` property.

**String Indexing Options**

Kosh provides two options for indexing strings, depending on your requirements:

1. Saving Strings as They Are: If you want to index strings without any preprocessing, preserving their original form, you should set the `"type"` property to `"keyword"`. This ensures that Elasticsearch stores the strings as exact values without applying any analysis.

2. Preprocessing Strings: If you wish to analyze strings before indexing them, allowing Elasticsearch to process and tokenize them, you should set the `"type"` property to `"text"`. By doing so, Elasticsearch will apply its default analysis process to the strings, making them searchable based on the generated tokens.

**Automatic Entry IDs**

If your XML dictionary entries do not have unique identifiers (IDs), Kosh can automatically generate them for you. This ensures that each entry in the Elasticsearch index has a unique identifier for easy retrieval and referencing.

**Indexing Process and XML Tags**

By default, Kosh indexes the entire XML entry. However, it's important to note that during this process, the XML tags themselves are not analyzed. This means that you cannot directly search for XML tags within the indexed data. The indexing process focuses on the content within the tags, making it searchable based on the specified indexing options.


Configuration file ([hiztegibatua_mapping.json](https://github.com/cceh/kosh_data/blob/master/hiztegibatua/hiztegibatua_mapping.json)) for the [hiztegibatua](https://github.com/cceh/kosh_data/blob/master/hiztegibatua/hiztegibatua.xml) dictionary.


```json
{
  "mappings": {
    "_meta": {
      "_xpaths": {
        "id": "./@id",
        "root": "//entry",
        "fields": {
          "lemma": "./form/orth",
          "[sense_def]": "./sense/def",
          "[sense_pos]": "./sense/gramGrp/pos/q",
          "[dicteg]": "./sense/dicteg/q"
        }
      }
    },
    "properties": {
      "lemma": {
        "type": "keyword"
      },
      "sense_def": {
        "type": "text"
      },
      "sense_pos": {
        "type": "text"
      },
      "dicteg": {
        "type": "text"
      }
    }
  }
}

```


### '.kosh' file

To facilitate Kosh's interaction with your data, you're required to create a '.kosh' file in each data module. This file will inform Kosh about:

- The designated index name for your dataset.
- The location of your XML data.
- The location of your configuration file.

For instance, the '.kosh' file for  [hiztegibatua](https://github.com/cceh/kosh_data/blob/master/hiztegibatua/hiztegibatua.xml) would look like this:

```
[hiztegibatua]
files: ["hiztegibatua.xml"]
schema: hiztegibatua_mapping.json
```

In cases where your dictionary is split across multiple files, the '.kosh' file should list all files, as illustrated below:

```
[de_alcedo]
files: ["alcedo-1.tei", "alcedo-2.tei", "alcedo-3.tei", "alcedo-4.tei", "alcedo-5.tei"]
schema: de_alcedo_mapping.json
```

#### Adding Custom Metadata

Kosh allows you to add custom metadata to your data modules. This metadata will be indexed along with your data, allowing you to search for it. To add custom metadata, inside the '.kosh' file in your data module and add the metadata as follows:

```
[hoenig]
files: ["hoenig.tei"]
schema: hoenig_mapping.json
title: "Wörterbuch der Kölner Mundart"
authors: ["Fritz Hönig"]
source_languages: ["ksh"]
target_languages: ["deu"]

```

Kosh is flexible and adapts to your specific needs. Therefore, you can append as many metadata fields as necessary for your project.

To insert multiple values into a particular metadata field, simply separate each value with a comma and enclose the list in square brackets. For example:

```
source_languages: ["afr", "deu"]
```

If you want to add a single value, you can do so without brackets:

```
year: "1922"
```


## Kosh Deployment

Kosh can be implemented natively on Unix-like systems or through Docker. However, we strongly recommend deployment using Docker for the most efficient setup and management.

Keep in mind: When deployed natively on Linux systems, Kosh introduces a beneficial feature of data synchronization. With this feature, any changes made to a file within a data module trigger Kosh to automatically update the index. It's important to be aware, though, that this feature is not currently available on macOS platforms.


### With Docker

Procedure:

1.  `git clone https://github.com/cceh/kosh
`

2.  `cd kosh`

3.  In `docker-compose.override.yml`, you need to specify the path to your data modules, i.e. replace`../kosh_data/hoenig`:    
   
    ``` dockerfile
        
    version: '2.3'
    
    services:
      elastic:
        ## Uncomment the next line when the host network should be used.
        # network_mode: host
    
        ## Uncomment the next line when deploying in production.
        # restart: always
    
      kosh:
        ## Uncomment the next line when the host network should be used.
        # network_mode: host
    
        ## uncomment the next line when deploying in production
        # restart: always
    
        ## volumes:
        ##   - PATH_TO_KOSH_INI_FILE:/etc/kosh.ini:ro
        ##   - PATH_TO_XML_LEXICAL_DATA_WITH_KOSH_FILES:/var/lib/kosh:ro
        volumes:
          - ./kosh.ini:/etc/kosh.ini:ro
          - ../kosh_data/hoenig:/var/lib/kosh:ro
    
        command: ['--config_file', '/etc/kosh.ini']
    ```


4. `sudo docker-compose up -d`


To check the logs:

`sudo docker-compose logs`

To stop and redeploy:

`sudo docker-compose down`

### On Unix-like Systems

Prerequisites:

- Python version 3 or above
- Elasticsearch version 7 or above

Procedure:

1. Clone the repository
```bash
$ git clone https://github.com/cceh/kosh
```
2. Navigate into the repository:
```bash
$ cd kosh
```
3. Build Kosh using the make command:
```bash
make
```

4. Run Kosh with appropriate command based on your operating system:

    on Linux: 
    ```bash
    $ kosh --log_level DEBUG --data_root path_to_your_data_dir --data_host localhost
    ```
   on OSX:  
   ```bash
    $ kosh --log_level DEBUG --data_root path_to_your_data_dir --data_host localhost --data_sync off
    ```



## Sample datasets: [Kosh Data](/implementations/kosh_data.md)

In the [Kosh Data](/implementations/kosh_data.md) repository, you'll discover a variety of datasets designed for deployment with Kosh. Each dataset contains the necessary files that Kosh requires for operation:

1. Lexical data encoded in XML
2. A JSON configuration file
3. A '.kosh' file 

You are encouraged to review these datasets as examples, they serve as a useful guide when setting up and configuring your own Kosh data modules.