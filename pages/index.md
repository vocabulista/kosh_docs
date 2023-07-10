# Kosh Suite - An API Framework for Lexical Data


The Kosh Suite is an API-centric, open-source framework designed to efficiently manage and access lexical data.

![kosh_overview](/kosh_overview.jpg)

### Backend
The framework's backbone, [kosh](https://github.com/cceh/kosh), is designed with the capability to provide API access to any XML-encoded lexical dataset, independently of the underlying data model. 

### Frontend
In conjunction with the backend, the frontend, [kosh_client](https://github.com/cceh/kosh_client), brings you a user-friendly interface, built using React. This web application simplifies the process of searching within the diverse and extensive datasets indexed by Kosh.

### Why *Kosh*?

The name "Kosh" originates from the Hindi word for dictionary or lexicon, कोश (*koś* or *kosh*), which itself derives from Sanskrit कोश (*kośa*) with the same meaning.


## Features

- Kosh processes lexical data in XML format.
- Two APIs, GraphQL and REST, provide access to the data stored in Elasticsearch.
- Kosh can be deployed using Docker or natively on Unix-like systems.

## How to Implement Kosh

Kosh enables you to design APIs customized for your XML-encoded lexical resources.

Each component of Kosh, the backend and frontend, is independent and requires its own setup and deployment process. 

### Backend Deployment

For the deployment of Kosh's backend component, you are advised to follow the instructions detailed in our specific guide. Access the [Backend Deployment Guide](deployment/backend.md).

### Frontend Deployment

For deploying the frontend component, we have also prepared a standalone guide. You can find comprehensive directions in our [Frontend Deployment Guide](deployment/frontend.md).

## References

Francisco Mondaca, Philip Schildkamp, Felix Rau and Luke Günther. 2023. 
“The Kosh Suite: A Framework for Searching and Retrieving Lexical Data Using APIs.” 
_In Electronic Lexicography in the 21st Century. Proceedings of the eLex 2023 Conference_, Brno, Czechia. 
Brno: Lexical Computing CZ, s.r.o., 236-247. [PDF](https://elex.link/elex2023/wp-content/uploads/62.pdf)

Francisco Mondaca, Philip Schildkamp, and Felix Rau. 2019. 
“Introducing Kosh, a Framework for Creating and Maintaining APIs for Lexical Data.” 
_In Electronic Lexicography in the 21st Century. Proceedings of the eLex 2019 Conference_, Sintra, Portugal. 
Brno: Lexical Computing CZ, s.r.o., 907–921. [PDF](https://elex.link/elex2019/wp-content/uploads/2019/09/eLex_2019_51.pdf)

Francisco Mondaca and Jan Bigalke. 2019. "Introducing an Open, Dynamic and Efficient Access for TEI-encoded Dictionaries on the Internet". 
Presentation of a Kosh-based workflow for editing dictionaries and publish them via APIs. TEI Conference Graz 2019.
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3451535.svg)](https://doi.org/10.5281/zenodo.3451535)

Francisco Mondaca, Felix Rau, Claes Neuefeind, Börge Kiss, Daniel Kölligan, Uta Reinöhl, Patrick Sahle. 2019. 
"C-SALT APIs – Connecting and Exposing Heterogeneous Language Resources". 
Presentation at the Digital Humanities Conference 2019, Utrecht, The Netherlands.  
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3265782.svg)](https://doi.org/10.5281/zenodo.3265782)



## Contact 
[info-kosh@uni-koeln.de](mailto:info-kosh@uni-koeln.de)
