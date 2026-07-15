# Projeto: Clima

Este projeto vai pegar a cidade e baseado nisso, consultar o clima daquela região, exibindo as principais informações de clima, temperatura, humidade e etc.

### Aspectos Técnicos

O projeti vai ser feito em Vite + Vanilla + typescript

### Informações das APIs que serão usadas no projeto

Ele vai usar a API OpenMeteo, com os seguintes endpoints:

#### Para pegar a latitude, longitude e timezono, baseado no nome da ciade:
https://geocoding-api.open-meteo.com/v1/search?name={NOME_DA_CIDADE}&count=1&language=pt&format=json

{NOME_DA_CIDADE} = Nome da cidade que o usuario digitou

Exemplo de resposta:

{
  "results": [
    {
      "id": 3448439,
      "name": "São Paulo",
      "latitude": -23.5475,
      "longitude": -46.63611,
      "elevation": 769.0,
      "feature_code": "PPLA",
      "country_code": "BR",
      "admin1_id": 3448433,
      "timezone": "America/Sao_Paulo",
      "population": 12400232,
      "postcodes": [
        "82010-340",
        "22640-101"
      ],
      "country_id": 3469034,
      "country": "Brasil",
      "admin1": "São Paulo"
    }
  ],
  "generationtime_ms": 0.55229664
}

Informações que PRECISAMOS:
- name
- latitude
- longitude
- country_code
- timezone

#### Para pegar as informações de clima:
https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&hourly=temperature_2m&current=precipitation_probability,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,precipitation,weather_code&timezone={TIMEZONE}

{LATITUDE} = Latitude
{LONGITUDE} = Longitude
{TIMEZONE} = Timezone

Exemplo de resposta:

{
  "latitude": -23.514938,
  "longitude": -46.610504,
  "generationtime_ms": 0.16629695892333984,
  "utc_offset_seconds": -10800,
  "timezone": "America/Sao_Paulo",
  "timezone_abbreviation": "GMT-3",
  "elevation": 745.0,
  "current_units": {
    "time": "iso8601",
    "interval": "seconds",
    "precipitation_probability": "%",
    "temperature_2m": "°C",
    "relative_humidity_2m": "%",
    "apparent_temperature": "°C",
    "is_day": "",
    "wind_speed_10m": "km/h",
    "wind_direction_10m": "°",
    "precipitation": "mm",
    "weather_code": "wmo code"
  },
  "current": {
    "time": "2026-07-14T21:30",
    "interval": 900,
    "precipitation_probability": 0,
    "temperature_2m": 11.8,
    "relative_humidity_2m": 94,
    "apparent_temperature": 10.7,
    "is_day": 0,
    "wind_speed_10m": 9.2,
    "wind_direction_10m": 101,
    "precipitation": 0.00,
    "weather_code": 3
  },

Informações que PRECISAMOS:
Na resposata eu tenho 2 itens:
- current_units team as unidade de medidas das prorpiedades
- current tem os valores das propriedades

Propriedades obrigatórias:
- temperature_2m
- relative_humidity_2m
- apparent_temperature
- is_day
- wind_speed_10m
- wind_direction_10m
- precipitation_probability

#### Informações importantes:
Teremos um arquivo com as funções do OpenMeteo, para que o projeto não faça requisição direta a API mas sim use as funções desse arquivo.

Fluxo de pesquisa para receber o nome da cidade e pegar as informações de clima:
- O usuario digita o nome da cidade
- O projetoo pea o nome e usa o OpenMeteo para pegar a latitude, longitude e timezone dessa cidade.
- Ao pegar  latitude, longitude e timezone, o projeto usa essas infomrações para fazer a requisição e pegar as infomrações do clima dessa localização.
- Caso não ache as infomrações da cidade, se comportar como se não tivesse achado nada.
- Caso ache as informações da cidade mas não as de clima, se comportar como se não ivesse achado nada. 

A busca envolve as 2 requisições (buscar latitude/longitude/timezone + buscar clima), mas para o usuário é uma só, com loading.

As funções do OpenMeteo devem verificar se os parâmetros vieram, caso contrário, age como se não tivesse vindo.

### Aspectos visuais (design e UX)

Tem que ter Empty State.

Teremos uma área SUPERIOR centralizado que tem apenas o comppo de busca da cidade

O projeto terá uma sidebar na esquerda com as seguintes informações:
- Temperatura
- Nome da cidade, Código do pais
- Dia atual
- Se é dia/noite (baseado no is_day)
- Weather Code

Na área prinicpal:
- Humidade relativa
- Temperatura aparente
- Probabilidade de precipitação
- Valocidade/Direção do vento

Design geral:
- O projeto terá um fundo cinza escuro
- A parte superior não terá beckgroud, mas tanto sidebar quanto a área principal ficarão dentro de uma dive com borda bem arendondada, fundo branco, centralizada  largura máxima de 800px.


Informações de interpretação sobre o Weather Code:
WMO Weather interpretation codes (WW)
Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail





